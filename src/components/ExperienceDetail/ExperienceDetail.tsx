
import { useEffect, useState } from "react";

import ImageCardExperience from "./ImageCardExperience";
import InfoExperience from "./InfoExperience";
import MapSection from "./MapSection";
import ReviewSection from "./ReviewSection";

import { Experience } from "../../types/experience";
import { getExperienceById } from "../../services/experience.services";

function ExperienceDetail() {

  const [experience, setExperience] = useState<Experience>({} as Experience);

  useEffect(() => {
    
    // Obtener el ID de los params
    const experienceId = window.location.pathname.split("/")[2];
    
    // Obtener la informacion de la experiencia por ID
    getExperienceById(experienceId)
      .then((data) => {
        setExperience(data); 
        console.log("Experience: ", data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  return (
    <div className="mb-28">

      {/* Seccion de imagenes (Posible slider u otra forma de mostrar las imagenes) */}
      <ImageCardExperience title={experience?.title} rating={experience?.rating} />
      
      {/* Informacion detallada de la experiencia */}
      <InfoExperience description={experience?.description} capacity={experience?.capacity}/>

      {/* Mapa de la experiencia */}
      <MapSection/>

      {/* Seccion de reseñas de la experiencia */}
      <ReviewSection/>
      
      <div className="fixed bottom-0 flex items-center justify-between w-full gap-12 p-5 px-5 bg-white container-shadow">
        <h1 className="text-primary">
          <span className="font-bold">€{experience?.price}</span>/Persona
        </h1>
        <button className="w-full py-2 text-white rounded-full bg-primary">
          Reservar
        </button>
      </div>
    </div>
  );
}

export default ExperienceDetail;
