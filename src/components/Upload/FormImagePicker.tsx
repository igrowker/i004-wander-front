import { useState } from 'react'
import ImageInputList from './ImageInputList'

interface FormImagePickerProps {
    name?: string
    placeholderImg: string
    maxImages?: number
    onHeroImageChange: (uri: string) => void
    imageFiles: (File | null)[]
    setImageFiles: (files: (File | null)[]) => void
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({ placeholderImg, maxImages, onHeroImageChange, imageFiles, setImageFiles }) => {

    const [displayedImages, setDisplayedImages] = useState<(string | null)[]>(Array(maxImages).fill(null))

    const orderImages = (images: (string | null)[]) => {
        const nonNullImages = images.filter(image => image !== null)
        const nullImages = images.filter(image => image === null)
        return [...nonNullImages, ...nullImages]
    }

    const handleAdd = (uri: string | null, file: File | null, index: number) => {
        const newImages = [...displayedImages]
        const newFiles = [...imageFiles]
        newImages[index] = uri
        newFiles[index] = file
        setDisplayedImages(orderImages(newImages))
        setImageFiles(newFiles)
    }

    const handleRemove = (index: number) => {
        const newImages = [...displayedImages]
        const newFiles = [...imageFiles]
        newImages[index] = null
        newFiles[index] = null
        setDisplayedImages(orderImages(newImages))
        setImageFiles(newFiles)
    }

    return (
        <>
            <ImageInputList
                imageUris={displayedImages}
                onAddImage={handleAdd}
                onRemoveImage={handleRemove}
                placeholderImg={placeholderImg}
                onHeroImageChange={onHeroImageChange}
            />

        </>
    )
}

export default FormImagePicker