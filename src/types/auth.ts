import { User } from "./user"
import { Dispatch, SetStateAction } from "react"

export type AuthenticateUserType = (callback: () => void) => void

export type StoreTokenType = (token: string) => void

export interface AuthContextInterface {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    authenticateUser: AuthenticateUserType
    storeToken: StoreTokenType
    logout: () => void
    isLoading: boolean
}

export interface ValidationSchema {
    [key: string]: string
}

export interface NewUserData {
    name: string,
    email: string,
    password: string,
    phone: string
    // REVISAR LA POSIBILIDAD DE USAR EL type CREADO
    role: "tourist" | "provider",
}