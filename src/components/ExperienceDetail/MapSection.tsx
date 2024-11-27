import exampleMap from "../../assets/img/exampleMap.png";

function MapSection() {
  return (
    <>
      <div className="px-5">
        <h1 className="text-xl font-bold ">Localizacion</h1>
        <p className="py-1 mb-4 text-sm text-gray-400">Ver en el mapa</p>
        <img
          src={exampleMap}
          alt="example map"
          className="w-full max-h-[300px] object-cover"
        />
        <p className="py-2 text-sm text-gray-400">Street name</p>
        <div className="w-full h-[1px] bg-gray-300 my-5"></div>
      </div>
      
    </>
  );
}

export default MapSection;
