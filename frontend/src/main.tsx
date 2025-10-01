import { createRoot } from 'react-dom/client'
import './Css/App.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from './stores/Store.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
