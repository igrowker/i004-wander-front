import ReviewCard from "./ReviewCard";

function ReviewSection() {
  return (
    
    <div className="px-5">
      <h1 className="text-xl font-bold">Reseñas</h1>
      <p className="text-gray-400">4.5 (100 Reseñas) </p>

      <div className="flex flex-col gap-5 mt-4">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
      <button className="p-3 font-bold border-[1.5px] px-8 py-3 mt-4 border-black rounded-xl">Ver otras reseñas</button>
    </div>
  );
}

export default ReviewSection;
