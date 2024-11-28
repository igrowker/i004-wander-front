import exampleImage from "../../assets/exampleImage.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function ImageCardExperience({title, rating} : {title: string, rating: number}) {
  const photos = [exampleImage, exampleImage, exampleImage];

  const getRating = (rating: number) => {
    switch (rating) {
      case 1:
        return { stars: "★☆☆☆☆", text: "Muy malo" };
      case 2:
        return { stars: "★★☆☆☆", text: "Malo" };
      case 3:
        return { stars: "★★★☆☆", text: "Aceptable" };
      case 4:
        return { stars: "★★★★☆", text: "Bueno" };
      case 5:
        return { stars: "★★★★★", text: "Excelente" };
    }
  };


  return (
    <div className="relative z-10">
      <Swiper
        spaceBetween={2}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        className="mySwiper"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full max-h-[300px] object-cover"
              src={photo}
              alt="Event Image"
              width={400}
              height={280}
            />
            <div className="absolute bottom-0 flex flex-col justify-end w-full h-full pt-3 pb-6 pl-6 bg-black/20">
              <h1 className="text-2xl font-bold text-white">
                {title}
              </h1>
              <p className="text-sm text-white"><span>{getRating(rating)?.stars}</span> 10 Reviews </p>
            </div>
          </SwiperSlide>
        ))}
        
      </Swiper>
      {/* <img
          src={exampleImage}
          alt="example image"
          className="w-full max-h-[300px] object-cover"
        /> */}
    </div>
  );
}

export default ImageCardExperience;
