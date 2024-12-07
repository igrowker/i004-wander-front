interface ImageInputProps {
    imageUri?: string | null
    onAddImage: (uri: string | null, file: File | null, index: number) => void
    onRemoveImage: (index: number) => void
    placeholderImg: string
    onHeroImageChange: (uri: string) => void
    index: number
}

const ImageInput: React.FC<ImageInputProps> = ({ imageUri, onAddImage, onRemoveImage, placeholderImg, onHeroImageChange, index }) => {

    const selectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const fileUrl = URL.createObjectURL(file)
            onAddImage(fileUrl, file, index)
            onHeroImageChange(fileUrl)
        }
    }

    const handleClick = () => {
        if (!imageUri) {
            document.getElementById(`imageInput-${index}`)?.click()
        }
        else {
            onHeroImageChange(imageUri)
        }
    }

    return (
        <div
            onClick={handleClick}
            className="relative w-24 h-24 border border-gray-300 flex items-center justify-center"
        >
            {!imageUri
                ? (
                    <div>
                        <img src={placeholderImg} alt='haz clic para subir tu foto' />

                    </div>
                )
                : (
                    <div className="relative w-full h-full">
                        <img src={imageUri} alt="Selected" className="w-full h-full object-cover" />
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onRemoveImage(index)
                            }}
                            className="absolute top-0 right-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            <input
                type="file"
                accept="image/*"
                id={`imageInput-${index}`}
                className="hidden"
                onChange={selectImage}
            />


        </div>
    )
}

export default ImageInput