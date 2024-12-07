import { Navigate } from "react-router-dom";

// PrivateRoute component untuk memeriksa apakah token ada di localStorage
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Jika tidak ada token, arahkan ke halaman signin
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // Jika token ada, lanjutkan untuk merender komponen anak (Dashboard)
  return children;
};

export default PrivateRoute;
