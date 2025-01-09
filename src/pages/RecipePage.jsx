import React, { useState } from "react";
import DishCard from "../components/DishCard";
import home from '../assets/home-inactive.png';
import profile from '../assets/user-inactive.png';
import favorites from '../assets/fave-inactive.png';
import exit from '../assets/exit.png';
import { useNavigate } from "react-router-dom";
import { dishCategories } from "../components/dishCategories";

const RecipePage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const navigate = useNavigate();


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Update search query
  };

  const filteredDishCategories = dishCategories.map((category) => ({
    ...category,
    dishes: category.dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery) // Filter dishes based on the search query
    ),
  }));

  const toggleView = (view) => {
    if (view === 'generate') navigate('/GeneratePage');
    else if (view === 'recipes') navigate('/RecipePage');
  };

  const handleScroll = (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      e.currentTarget.scrollLeft += e.deltaY * 0.4; // Adjust the multiplier for speed
    }
  };

  const handleExit = () => {
    navigate('/'); // Navigate to the get started page when "Exit" is clicked
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-[100px] bg-[#fbf8e9] shadow-lg p-4 rounded-r-[30px] flex flex-col justify-between" style={{ height: "calc(100vh - 40px)", marginTop: "20px" }}>
        <div className="mb-8 flex justify-center">
          <img src="logo1.png" alt="Logo" className="w-18 h-18" />
        </div>
        <div className="flex flex-col justify-center flex-grow space-y-20 items-center nav-icon">
          <img src={home} alt="Home" className="w-8 h-8" />
          <img src={profile} alt="Profile" className="w-8 h-8" />
          <img src={favorites} alt="Favorites" className="w-8 h-8" />
        </div>
        <button className="mt-auto text-red-500 hover:text-red-700 mx-auto flex justify-center" onClick={handleExit}>
          <img src={exit} alt="Exit" className="w-8 h-8" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top bar */}
        <div className="flex justify-center items-center mb-6 text-[18px]">
          <div className="flex bg-gray-10">
            <button className="py-2 px-4 w-[300px] text-sm font-medium text-[#433f3a] bg-gray-100 hover:bg-[#e0e0e0] transition duration-200 border border-[#433f3a] rounded-l-[30px]" onClick={() => toggleView('generate')}>
              Generate
            </button>
            <button className="py-2 px-4 w-[300px] text-sm font-medium text-white bg-[#433f3a] border border-[#433f3a] rounded-r-[30px]" onClick={() => toggleView('recipes')}>
              Recipes
            </button>
          </div>
        </div>

        {/* Recipes Search Bar */}
        <div className="flex items-center justify-between mt-2 mb-2">
          <i className="fas fa-search search-icon text-[#433f3a]"></i>
          <input
            type="search"
            id="search"
            name="search"
            className="text-[20px] w-[535px] h-[40px] mt-1 px-4 py-2 bg-transparent border-[2px] border-[#433f3a] rounded-[30px] pl-10 focus:outline-none focus:ring-1 focus:ring-[#433f3a]"
            value={searchQuery} // Bind the value to the search query state
            onChange={handleSearchChange} // Update the state when typing
          />
        </div>

        {/* Dish Categories */}
        <div className="overflow-y-auto dishes-scroll" style={{ maxHeight: "550px" }}>
          {filteredDishCategories.map((category, index) => (
            category.dishes.length > 0 && (
              <div key={index}>
                <div className="flex text-[#433f3a] text-[27px] font-semibold mt-6 mb-5 text-center">
                  {category.title}
                </div>
                <div className="flex w-max space-x-6 ml-3">
                  {category.dishes.map((dish, idx) => (
                    <DishCard key={idx} name={dish.name} ingredient={dish.ingredient} image={dish.image} />
                  ))}
                </div>
              </div>
            )
          ))}
          {filteredDishCategories.every(category => category.dishes.length === 0) && (
            <div className="text-center text-gray-500 mt-4 text-lg">
              No dishes found
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[470px] bg-[#fbf8e9] shadow-lg p-4 rounded-l-[30px] flex flex-col" style={{ height: "calc(100vh - 40px)", marginTop: "20px" }}>
        <div className="flex text-[#433f3a] text-[20px] mt-2 mb-2 ml-3">
          <div className="font-semibold">Recently viewed</div>
        </div>
        <div className="ml-3 h-[500px] overflow-y-auto">
          <div className="text-[16px] italic text-gray-500 opacity-70 ml-1 mt-2">
            Check out some recipes!
          </div>
        </div>

        <div className="mt-5 ml-3 text-[20px] font-semibold text-[#433f3a]">Favorites</div>

        <div className="mt-3 ml-3 h-[330px] overflow-x-auto favorites-scroll"
          onWheel={handleScroll}>

          <div className="flex w-max space-x-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-44 h-[175px] p-3 bg-transparent rounded-md shadow-sm border-2 border-[#433f3a]">
                <div className="h-[93px] w-full bg-gray-300 rounded"></div>
                <div className="mt-4">
                  <p className="text-base font-bold text-gray-800">Dish name</p>
                  <p className="text-xs text-gray-500">Main ingredient</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="ml-3 mt-5 w-[420px] h-[36px] bg-[#5b9940] text-white text-[16px] py-2 rounded-lg hover:bg-[#4a8a37] transition duration-200">
          View all
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
