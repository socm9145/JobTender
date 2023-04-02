import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const getIsLogin = () => {
        return localStorage.getItem("isLogin");
    }
    const location = useLocation();

    if (!getIsLogin()) {
        return <Navigate to={{ pathname: '/login', state: { from: location } }} replace />
    }

    return children;
}

export default PrivateRoute;