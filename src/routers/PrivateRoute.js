import { Navigate } from "react-router"

const PrivateRoute = ({children, isAuthenticated}) => {
    return isAuthenticated ? children : <Navigate to="/auth/login" />
}

export default PrivateRoute
