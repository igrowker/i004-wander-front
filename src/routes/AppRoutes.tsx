import { Routes, Route } from 'react-router-dom'
// import PrivateRoute from './PrivateRoutes'
import Register from '../components/Register/Register'
import UserProfile from '../components/UserProfile/UserProfile'

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile" element={<UserProfile />} />

            {/* <Route element={<PrivateRoute />}>
                <Route path="/UserProfile" element={<UserProfile />} />

            </Route> */}

            <Route path="*" element={<h1>404</h1>} />

        </Routes>
    )
}


export default AppRoutes