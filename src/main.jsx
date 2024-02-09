import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./contexts/Auth.jsx";
import Router from "./utils/Router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProvider from "./contexts/Admin.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <AdminProvider>
        <Router />
      </AdminProvider>
    </AuthProvider>
    <ToastContainer />
  </>
);
