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
        element: <Dashboard />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: <Link />,
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
