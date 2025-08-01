import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { accessToken, loading } = useAuth();

    if (loading) return <div>Загрузка...</div>;
    return accessToken ? children : <Navigate to="/auth/login" replace />;

};

export default PrivateRoute;