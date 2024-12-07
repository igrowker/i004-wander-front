import axios from 'axios'
import createApiClient from './apiClient'

class UploadServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/upload`)

    async getPresignedUrl(fileName: string) {
        const response = await this.api.post('/presigned-url', { fileName })
        return response.data
    }

    //service notifyBackend is commented because it may no longer be needed in this app, if uploadImages is being called directly inside the "handleSubmit" function of each form that requires an image - Cris R.

    // async notifyBackend(s3Urls: string[], token: string) {
    //     const response = await this.api.post('/image',
    //         { s3Urls },
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         }
    //     )
    //     return response.data
    // }

    async uploadImages(imageFiles: File[], token: string) {

        const presignedUrls = await Promise.all(
            imageFiles.map(imgFile =>
                this.getPresignedUrl(imgFile.name)
            )
        )

        await Promise.all(
            presignedUrls.map(({ presignedUrl }, i) =>
                axios.put(presignedUrl, imageFiles[i], {
                    headers: {
                        'Content-Type': imageFiles[i].type,
                        Authorization: `Bearer ${token}`
                    }
                })
            )
        )

        const s3Urls = presignedUrls.map(({ s3Url }) => s3Url)

        // await this.notifyBackend(s3Urls, token)

        return { s3Urls }
    }

    async deleteImages(keys: string[], token: string) {
        await Promise.all(
            keys.map(key =>
                this.api.delete('/image', {
                    data: { key },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
        )
    }
}

const uploadServices = new UploadServices()

export default uploadServices