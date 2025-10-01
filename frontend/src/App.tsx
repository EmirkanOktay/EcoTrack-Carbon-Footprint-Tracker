import "./Css/Global.css"
import AppRoutes from "./routes/AppRouter"
import { ToastContainer } from 'react-toastify';
import { toastConfig } from "./config/toastConfig";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

function App() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <AppRoutes />
      <ToastContainer {...toastConfig} />
    </div>
  )
}

export default App;
