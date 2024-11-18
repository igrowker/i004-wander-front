// import { useContext } from "react"
import { Outlet } from 'react-router-dom'
// import { Navigate, Outlet } from 'react-router-dom'
// import { AuthContext } from "../contexts/auth.context"

const PrivateRoute = () => {

    // const { user } = useContext(AuthContext)


    // if (!user) {
    //     return <Navigate to="/login" />
    // }

    return <Outlet />
}


export default PrivateRoute