import createApiClient from "./apiClient"

class UserServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/users`)

    getAllUsers() {
        return this.api.get(`/all-users`)

    }
    getOneUser(id: string) {
        return this.api.get(`/${id}`)
    }

    editUser(id: string, editData: any) {
        return this.api.put(`/${id}/edit`, editData)
    }


    deleteUser(id: string) {
        return this.api.delete(`/${id}/delete`)
    }
}

const userServices = new UserServices()

export default userServices
