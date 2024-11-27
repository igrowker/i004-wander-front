import ImageCardExperience from "./ImageCardExperience";
import InfoExperience from "./InfoExperience";
import MapSection from "./MapSection";
import ReviewSection from "./ReviewSection";

function ExperienceDetail() {
  return (
    <div className="mb-28">

      {/* Seccion de imagenes (Posible slider u otra forma de mostrar las imagenes) */}
      <ImageCardExperience />
      
      {/* Informacion detallada de la experiencia */}
      <InfoExperience/>

      {/* Mapa de la experiencia */}
      <MapSection/>

      {/* Seccion de reseñas de la experiencia */}
      <ReviewSection/>
      
      <div className="fixed bottom-0 flex items-center justify-between w-full gap-12 p-5 px-5 bg-white container-shadow">
        <h1 className="text-primary">
          <span className="font-bold">$600</span>/Persona
        </h1>
        <button className="w-full py-2 text-white rounded-full bg-primary">
          Reservar
        </button>
      </div>
    </div>
  );
}

export default ExperienceDetail;
