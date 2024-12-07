import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes'
import Register from '../components/Register/Register'
import UserProfile from '../components/UserProfile/UserProfile'
import Login from '../components/LoginForm/LoginForm'
import ConfirmRegister from '../components/ConfirmRegister/ConfirmRegister'
import PaymentMethod from '../components/PaymentMethod/PaymentMethod'
import PaymentDetails from '../components/PaymentDetails/PaymentDetails'
import ForgotPasswordVerifyCode from '../components/ForgotPasswordVerifyCode/ForgotPasswordVerifyCode'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword'
import Book from '../components/Book/Book'
import { ReservationProviderWrapper } from '../contexts/reservation.context'
import ExperienceDetail from '../components/ExperienceDetail/ExperienceDetail'
import AddExperience from "../components/AddExperience/AddExperience";
import Home from "../components/Home/homePage";
import Filters from '../components/Filters/Filters'
import ConfirmationView from '../components/ConfirmationView/ConfirmationView'
import { ProtectedPublicRoute } from './ProtectedPublicRoutes'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'

const AppRoutes = () => {

    const { pathname } = useLocation();

    // Resetea la posicion del scroll al inicio de cada ruta
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/filters" element={<Filters />} />
            <Route path="/add-experience" element={<AddExperience />} />


            <Route element={<ProtectedPublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/confirm-register" element={<ConfirmRegister />} />
                <Route path="/forgot-password-verify-code" element={<ForgotPasswordVerifyCode />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Rutas privadas sin contexto de reserva */}
            <Route element={<PrivateRoute />}>
                <Route path="/user-profile" element={<UserProfile />} />
                {/* <Route path="/add-experience" element={<AddExperience />} /> */}
            </Route>

            {/* Rutas que necesitan contexto de reserva */}
            <Route element={<ReservationProviderWrapper />}>
                {/* Ruta NO privada */}
                <Route path="/experience/:id" element={<ExperienceDetail />} />

                {/* Rutas PRIVADAS */}
                <Route element={<PrivateRoute />}>
                    <Route path="/booking" element={<Book />} />
                    <Route path="/payment-method" element={<PaymentMethod />} />
                    <Route path="/payment-details" element={<PaymentDetails />} />
                    <Route path="/confirmation-view" element={<ConfirmationView />} />
                </Route>
            </Route>

            <Route path="*" element={<h1>404</h1>} />

        </Routes>
    )
}


export default AppRoutes
