import "./Css/Global.css"
import AppRoutes from "./routes/AppRouter"
import { ToastContainer } from 'react-toastify';
import { toastConfig } from "./config/toastConfig";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div >
      <AppRoutes />
      <ToastContainer {...toastConfig} />
    </div>
  )
}

export default App
