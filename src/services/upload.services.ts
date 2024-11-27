import axios from 'axios'
import createApiClient from './apiClient'

class UploadServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/upload`)

    async getPresignedUrl(fileName: string) {
        const response = await this.api.post('/presigned-url', { fileName })
        return response.data
    }

    async notifyBackend(s3Url: string) {
        const response = await this.api.post('/image', { s3Url })
        return response.data
    }

    async uploadImage(imageForm: File) {
        const { presignedUrl, s3Url } = await this.getPresignedUrl(imageForm.name)

        await axios.put(presignedUrl, imageForm, {
            headers: {
                'Content-Type': imageForm.type
            }
        })

        await this.notifyBackend(s3Url)

        return { presignedUrl, s3Url }
    }
}

const uploadServices = new UploadServices()

export default uploadServices