import React from "react";

const DishCard = ({ name, ingredient, image, onClick }) => (
  <div onClick={onClick} className="w-50 h-[210px] p-4 bg-transparent rounded-md shadow-sm border-2 border-[#433f3a] transform hover:scale-110 hover:shadow-lg transition-all duration-220 ease-in-out cursor-pointer">
    <div className="h-[110px] w-full rounded">
      <img src={image} className="h-full w-full object-cover rounded" alt={name} />
    </div>
    <div className="mt-3">
      <p className="text-lg font-bold text-gray-800">{name}</p>
      <p className="text-s text-gray-500">{ingredient}</p>
    </div>
  </div>
);

export default DishCard;
