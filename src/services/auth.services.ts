import { NewUserData } from '../types/auth'
import createApiClient from './apiClient'

class AuthServices {
    private api = createApiClient(`${import.meta.env.VITE_API_URL}/auth`);

    // Método para login con un token
    login = async (token: string) => {
        try {
            // Realiza la solicitud POST con el token
            const response = await this.api.post('/login', { token }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response; // Devuelve la respuesta
        } catch (error) {
            // Maneja cualquier error en la solicitud
            throw new Error("Error al intentar iniciar sesión: " + error);
        }
    };

    // Método de verificación
    verify(token: string) {
        return this.api.get('/verify', { headers: { Authorization: `Bearer ${token}` } });
    }

    // Método registro
    register(newUserData: NewUserData) {
        return this.api.post(
            "/register",
            JSON.stringify(newUserData),
            { headers: { "Content-Type": "application/json" } })
    }

    // Método para logout
    logout(token: string) {
        return this.api.post('/logout', null, { headers: { Authorization: `Bearer ${token}` } });
    }
}

const authServices = new AuthServices()

export default authServices