import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookieHelper";

const ProtectedRoute = (WrappedComponent) => {
  const ComponentWithProtection = (props) => {
    const isAuthenticated = !!getCookie("access_token");

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithProtection.displayName = `Protected(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithProtection;
};

export default ProtectedRoute;