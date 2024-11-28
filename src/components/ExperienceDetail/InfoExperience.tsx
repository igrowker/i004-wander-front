import iconLocation from "../../assets/icons/icon-location.svg";
import iconCategory from "../../assets/icons/icon-category.svg";
import iconDate from "../../assets/icons/icon-date.svg";
import iconPrice from "../../assets/icons/icon-price.svg";

import { useState } from "react";
function InfoExperience({description, capacity} : {description: string, capacity: number}) {
  return (
    <section className="p-5">
      <div className="">
        <h1 className="pb-3 text-xl font-bold">Descripción</h1>
        <ExpandableText 
          text={`${description}`}
          limit={150} 
        />
      </div>
      <div className="w-full h-[1px] bg-gray-300 my-5"></div>
      <div>
        <h1 className="pb-5 text-xl font-bold">Informacion</h1>
        <div>
          <div className="flex justify-between gap-3">
            <InfoCard icon={iconCategory} first="Categoria" second="Naturaleza" />          
            <InfoCard icon={iconLocation} first="Espana" second="Madrid" />
          </div>
          <div className="flex justify-between gap-3 my-3">
            <InfoCard icon={iconDate} first="Fecha" second="18/11/2024" />
            <InfoCard icon={iconPrice} first="Cupos" second={capacity.toString()} />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-300 mt-10"></div>

      </div>
    </section>
  );
}

export default InfoExperience;

const InfoCard = ({ icon, first, second } : { icon: string, first: string, second: string }) => {
  return (
    <div className="flex items-center w-1/2 gap-4 px-3 py-2 border-[1.5px] border-gray-300 rounded-2xl ">
      <img src={icon} alt="iconEmail" className="w-6 h-6" />
      <div className="text-sm leading-tight">
        <h2>{first}</h2>
        <p className="text-gray-400">{second}</p>
      </div>
    </div>
  );
};

const ExpandableText = ({ text, limit }: { text: string; limit: number }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col text-sm">
      <p>
        {expanded ? text : `${text.substring(0, limit)}...`}
        
      </p>
      <button
          onClick={toggleExpand}
          className="pt-1 ml-2 underline"
        >
          {expanded ? "Leer menos" : "Leer más"}
        </button>
    </div>
  );
};