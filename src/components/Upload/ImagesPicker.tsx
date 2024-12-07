import { useState } from "react"
import imagePlaceholder from "../../assets/img/image-placeholder.svg"

interface ImagePickerProps {
    maxImages: number
    onImagesChange: (images: string[]) => void
}

const ImagePicker: React.FC<ImagePickerProps> = ({
    maxImages = 1,
    onImagesChange,
}) => {

    const [images, setImages] = useState<string[]>([])

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        const file = e.target.files[0]
        const fileUrl = URL.createObjectURL(file)

        const selectedImages = [...images, fileUrl]
        setImages(selectedImages)
        onImagesChange(selectedImages)
    }

    const handleRemoveImage = (imageUrl: string) => {
        const updatedImages = images.filter((img) => img !== imageUrl)
        setImages(updatedImages)
        onImagesChange(updatedImages)
    }

    return (
        <div>
            <img src={imagePlaceholder} />
            <div className="height-100 flex flex-row">
                {images.map((imgUri, i) => (
                    <div key={i} className="mr-4">
                        <img
                            src={imgUri}
                            alt={`Preview ${i + 1}`}
                            className=""
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(imgUri)}
                            className=""
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            {images.length < maxImages && (
                <div className="add-image-container">
                    <label className="add-image-label">
                        Añade imagen
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAddImage}
                            className="hidden"
                        />
                    </label>
                </div>
            )}
        </div>
    )
}

export default ImagePicker
