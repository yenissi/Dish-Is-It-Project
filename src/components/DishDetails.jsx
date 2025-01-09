// DishDetailPage Component
import React from "react";
import { useParams } from "react-router-dom";
import { dishCategories } from "../components/dishCategories";

const DishDetails = () => {
  const { id } = useParams();
  const dish = dishCategories.flatMap(category => category.dishes).find(dish => dish.id === parseInt(id));

  if (!dish) {
    return <div>Dish not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{dish.name}</h1>
      <img src={dish.image} alt={dish.name} className="w-full h-auto mb-4" />
      <p className="text-lg mb-4">Ingredient: {dish.ingredient}</p>
      <p className="text-lg">Description: {dish.description}</p>
    </div>
  );
};

export default DishDetails;
