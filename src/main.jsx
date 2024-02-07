import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./contexts/Auth.jsx";
import Router from "./utils/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </>
);
