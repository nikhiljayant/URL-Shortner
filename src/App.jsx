// Dependency
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// CSS
import "./App.css";
// Components
import AppLayout from "./Components/Layouts/AppLayout";
import LandingPage from "./Components/Pages/LandingPage";
import Dashboard from "./Components/Pages/Dashboard";
import Auth from "./Components/Pages/Auth";
import Link from "./Components/Pages/Link";
import RedirectLink from "./Components/Pages/RedirectLink";
// Context
import Context from "./Context";
import ProtectedRoute from "./Components/Partials/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <ProtectedRoute>
            <Link />
          </ProtectedRoute>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <Context>
      <RouterProvider router={router} />
    </Context>
  );
}

export default App;
