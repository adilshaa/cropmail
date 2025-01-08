import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ element: Component }) => {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to="/home/sent" replace />;
  }

  return <Component />;
};

export default PublicRoute;
