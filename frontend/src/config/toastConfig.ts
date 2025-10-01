import type { ToastOptions } from "react-toastify";

export const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    style: {
        background: "#e6f4ea",
        color: "#2f6f4e",
        fontFamily: "Inter, sans-serif",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }
};
