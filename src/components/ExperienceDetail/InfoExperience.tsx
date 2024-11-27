import iconEmail from "../../assets/icons/icon-email.svg";

function InfoExperience() {
  return (
    <section className="p-5">
      <div className="">
        <h1 className="pb-3 text-xl font-bold">Descripción</h1>
        <p className="text-sm ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo doloribus
          in ipsa cum amet. Architecto ex recusandae quasi repellendus minima
          ipsa non facilis dolore cum? Nobis eligendi mollitia maxime molestias
          exercitationem facilis officiis, ab quisquam incidunt omnis at rem
          quam iste beatae eos non doloremque et a excepturi quasi dolore!
        </p>
      </div>
      <div className="w-full h-[1px] bg-gray-300 my-5"></div>
      <div>
        <h1 className="pb-3 text-xl font-bold">Informacion</h1>
        <div>
          <div className="flex justify-between gap-3">
            <InfoCard icon={iconEmail} first="Bus" second="Ida y vuelta" />
            <InfoCard icon={iconEmail} first="Bus" second="Ida y vuelta" />
          </div>
          <div className="flex justify-between gap-3 my-3">
            <InfoCard icon={iconEmail} first="Bus" second="Ida y vuelta" />
            <InfoCard icon={iconEmail} first="Bus" second="Ida y vuelta" />
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
      <img src={icon} alt="iconEmail" className="w-5 h-5" />
      <div className="text-sm leading-tight">
        <h2>{first}</h2>
        <p className="text-gray-400">{second}</p>
      </div>
    </div>
  );
};
