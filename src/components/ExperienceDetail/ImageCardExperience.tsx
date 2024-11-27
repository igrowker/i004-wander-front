import exampleImage from "../../assets/exampleImage.png";

function ImageCardExperience() {
  return (
    <div className="relative z-10">
        <img
          src={exampleImage}
          alt="example image"
          className="w-full max-h-[300px] object-cover"
        />
        <div className="absolute bottom-0 pb-6 pl-6">
          <h1 className="text-2xl font-bold text-white">
            Cocktail en la playa
          </h1>
          <p className="text-sm text-white">10 Reviews </p>
        </div>
      </div>
  )
}

export default ImageCardExperience;