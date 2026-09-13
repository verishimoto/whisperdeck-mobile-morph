import { Navigate } from "react-router-dom";

// /login is kept only as a redirect to the real authentication page.
export default function Login() {
  return <Navigate to="/auth" replace />;
}
