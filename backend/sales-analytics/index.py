"""
Business: API для получения аналитики продаж магазина
Args: event - dict with httpMethod, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with analytics data
"""

import json
from typing import Dict, Any, List
from datetime import datetime, timedelta


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        period = params.get('period', 'month')
        
        # Generate analytics data based on period
        analytics_data = generate_analytics(period)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(analytics_data, ensure_ascii=False)
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }


def generate_analytics(period: str) -> Dict[str, Any]:
    """Generate sales analytics data for specified period"""
    
    if period == 'week':
        labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
        revenue = [12000, 19000, 15000, 22000, 18000, 25000, 28000]
        orders = [8, 12, 10, 15, 11, 18, 20]
    elif period == 'month':
        labels = ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4']
        revenue = [85000, 92000, 78000, 105000]
        orders = [54, 62, 48, 70]
    else:  # year
        labels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 
                 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
        revenue = [320000, 350000, 380000, 420000, 450000, 480000,
                  520000, 490000, 510000, 540000, 580000, 620000]
        orders = [210, 230, 250, 280, 290, 310, 340, 320, 330, 350, 380, 410]
    
    total_revenue = sum(revenue)
    total_orders = sum(orders)
    avg_order_value = round(total_revenue / total_orders) if total_orders > 0 else 0
    
    top_products = [
        {
            'name': 'Шар фольгированный "Сердце"',
            'sales': 234,
            'revenue': 35100
        },
        {
            'name': 'Набор "День рождения"',
            'sales': 189,
            'revenue': 168210
        },
        {
            'name': 'Цифра 5 большая',
            'sales': 156,
            'revenue': 101400
        },
        {
            'name': 'Букет из шаров "Радуга"',
            'sales': 134,
            'revenue': 120600
        },
        {
            'name': 'Шар с гелием обычный',
            'sales': 112,
            'revenue': 16800
        }
    ]
    
    recent_orders = [
        {
            'id': '#2847',
            'customer': 'Анна Петрова',
            'amount': 1250,
            'status': 'completed',
            'date': '30.09.2024'
        },
        {
            'id': '#2846',
            'customer': 'Иван Сидоров',
            'amount': 890,
            'status': 'processing',
            'date': '30.09.2024'
        },
        {
            'id': '#2845',
            'customer': 'Мария Иванова',
            'amount': 2340,
            'status': 'completed',
            'date': '29.09.2024'
        },
        {
            'id': '#2844',
            'customer': 'Петр Козлов',
            'amount': 650,
            'status': 'completed',
            'date': '29.09.2024'
        },
        {
            'id': '#2843',
            'customer': 'Ольга Смирнова',
            'amount': 1780,
            'status': 'cancelled',
            'date': '28.09.2024'
        }
    ]
    
    return {
        'period': period,
        'charts': {
            'labels': labels,
            'revenue': revenue,
            'orders': orders
        },
        'stats': {
            'totalRevenue': total_revenue,
            'totalOrders': total_orders,
            'avgOrderValue': avg_order_value,
            'conversion': 3.2,
            'revenueGrowth': 12.5,
            'ordersGrowth': 8.3,
            'avgOrderGrowth': 4.1,
            'conversionGrowth': -1.2
        },
        'topProducts': top_products,
        'recentOrders': recent_orders
    }