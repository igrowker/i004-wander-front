export type Role = 'ADMIN' | 'TOURIST' | 'PROVIDER'

export interface User {
    _id: string
    avatar: string
    bio: string
    email: string
    location: string,
    name: string
    phone: string
    role: Role
    [key: string]: any
}

export interface UserProfile {
    avatar: string
    name: string
}

export interface UserBio {
    bio: string
}

export interface UserDetails {
    email: string
    location: string,
    phone: string,
    role: Role
}