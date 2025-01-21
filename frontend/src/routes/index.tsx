import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { adminRoutes } from "../app/admin/routes/routes";
import { authRoutes } from "../app/auth/routes/routes";

const Root = () => {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [...adminRoutes, ...authRoutes],
  },
]);
