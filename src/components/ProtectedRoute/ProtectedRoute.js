import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn }) => {
  if (!loggedIn) {
    return <Navigate replace to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;