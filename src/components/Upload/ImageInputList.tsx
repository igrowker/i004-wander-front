import ImageInput from './ImageInput'

interface ImageInputListProps {
    imageUris: (string | null)[]
    onAddImage: (uri: string | null, file: File | null, index: number) => void
    onRemoveImage: (index: number) => void
    placeholderImg: string
    onHeroImageChange: (uri: string) => void
}

const ImageInputList: React.FC<ImageInputListProps> = ({ imageUris, onAddImage, onRemoveImage, placeholderImg, onHeroImageChange }) => {
    return (
        <div className="h-24 flex justify-between whitespace-nowrap w-[540px]">
            <div className="flex gap-4">
                {imageUris.map((uri, i) => (
                    <div key={i} className="">
                        <ImageInput
                            imageUri={uri}
                            onAddImage={onAddImage}
                            onRemoveImage={onRemoveImage}
                            placeholderImg={placeholderImg}
                            onHeroImageChange={onHeroImageChange}
                            index={i}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageInputList