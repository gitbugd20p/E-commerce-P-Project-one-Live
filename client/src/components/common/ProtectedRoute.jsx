import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const ProtectedRoute = ({ admin = false }) => {
  const { isAuth, user } = useAuthStore();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (admin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
