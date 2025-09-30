import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeFonts } from './utils/fontManager'

initializeFonts();

createRoot(document.getElementById("root")!).render(<App />);