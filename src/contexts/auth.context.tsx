import { createContext, useEffect, useState, ReactNode } from "react"
import authServices from "../services/auth.services"
import { AuthContextInterface } from "../types/auth"
import { User } from "../types/user"


const defaultState: AuthContextInterface = {
    user: null,
    setUser: () => { },
    authenticateUser: () => { },
    storeToken: () => { },
    logout: () => { },
    isLoading: false,
}

const AuthContext = createContext<AuthContextInterface>(defaultState)

type AuthProviderProps = {
    children: ReactNode
}

const AuthProviderWrapper = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authenticateUser()
    }, [])

    const storeToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }

    const removeToken = () => {
        localStorage.removeItem('authToken')
    }

    const logout = async () => {
        const token = localStorage.getItem('authToken')
        if (token) {
            try {
                await authServices.logout(token)
            } catch (error) {
                console.error("Error during logout:", error)
            }
        }
        setIsLoading(false)
        setUser(null)
        removeToken()
    }

    const authenticateUser = async (onSuccess = () => { }) => {
        const token = localStorage.getItem("authToken")

        if (token) {
            try {
                const { data }: { data: User } = await authServices.verify(token)
                setUser(data)
                setIsLoading(false)
                onSuccess()
            } catch (err) {
                console.error("Authentication error:", err)
                logout()
            }
        } else {
            logout()
        }
    }

    return (
        <AuthContext.Provider
            value={
                { user, setUser, authenticateUser, storeToken, logout, isLoading }
            }>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }