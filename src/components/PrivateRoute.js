import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ beLoggedIn, children }) => {
    const { currentUser } = useAuth()

    if (beLoggedIn) {
        return currentUser ? children : <Navigate to='/login' />
    } else if (!beLoggedIn) {
        return currentUser ? <Navigate to='/' /> : children
    }
}

export default PrivateRoute