import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const createApiClient = (baseURL: string): AxiosInstance => {

    const apiClient = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {

        const storedToken = localStorage.getItem('authToken')

        if (storedToken) {
            config.headers.Authorization = `Bearer ${storedToken}`
        }
        return config
    })

    apiClient.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401) {

                localStorage.removeItem('authToken')
                window.location.href = '/login?message=session_expired'

            } else {
                console.error("Unexpected error occurred", error.response?.status)
            }
            return Promise.reject(error)
        }
    )

    return apiClient
}

export default createApiClient
