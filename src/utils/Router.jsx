import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Authentication/Login";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";

export default function Router() {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>{!user ? <Navigate to="/auth/login" /> : <Dashboard />}</>,
    },
    {
      path: "/auth/login",
      element: <>{user ? <Navigate to="/" /> : <Login />}</>,
    },
    // {
    //   path: "/auth/register",
    //   element: (
    //     <Layout>
    //       <RegisterUser />
    //     </Layout>
    //   ),
    // },
    // {
    //   path: "/auth/recovery",
    //   element: (
    //     <Layout>
    //       <RecoveryUser />
    //     </Layout>
    //   ),
    // },
    // {
    //   path: "/checkout",
    //   element: (
    //     <Layout>
    //       <Checkout />
    //     </Layout>
    //   ),
    // },
    {
      path: "*",
      element: <>404 Not Found</>,
    },
  ]);

  return (
    <RouterProvider router={router}>{/* <SpeedInsights /> */}</RouterProvider>
  );
}
