import { Navigate } from "react-router-dom";
import { getToken } from "./Auth";

const WithAuth = (Component) => {

    const AuthRoute = () => {
        const isAuth = getToken() ? true : false;
        return isAuth ? <Component /> : <Navigate to="/login" />;
    };

    return AuthRoute;
};

export default WithAuth;