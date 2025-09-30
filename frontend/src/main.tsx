import { createRoot } from 'react-dom/client'
import './Css/App.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
