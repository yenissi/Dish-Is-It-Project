import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home-inactive.png';
import profile from '../assets/user-inactive.png';
import favorites from '../assets/fave-inactive.png';
import exit from '../assets/exit.png';

const GeneratePage = () => {
  const [ingredientCount, setIngredientCount] = useState(3);
  const [ingredients, setIngredients] = useState(['', '', '']);
  const navigate = useNavigate(); // Initialize navigate

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
    setIngredientCount(ingredientCount + 1);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    setIngredientCount(ingredientCount - 1);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = ingredients.map((ingredient, i) => (i === index ? value : ingredient));
    setIngredients(newIngredients);
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

  const toggleView = (view) => {
    console.log(`${view} view selected`);
    if (view === 'generate') navigate('/GeneratePage');
    else if (view === 'recipes') navigate('/RecipePage');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div
        className="w-[100px] bg-[#fbf8e9] shadow-lg p-4 rounded-r-[30px] flex flex-col justify-between"
        style={{ height: "calc(100vh - 40px)", marginTop: "20px" }}
      >
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src="logo1.png" alt="Logo" className="w-18 h-18" />
        </div>
        {/* Navigation Icons */}
        <div className="flex flex-col justify-center flex-grow space-y-20 items-center nav-icon">
          <img src={home} alt="Home" className="w-8 h-8" />
          <img src={profile} alt="Profile" className="w-8 h-8" />
          <img src={favorites} alt="Favorites" className="w-8 h-8" />
        </div>
        {/* Exit Button */}
        <button className="mt-auto text-red-500 hover:text-red-700 mx-auto flex justify-center"
        onClick={handleExit}>
          <img src={exit} alt="Exit" className="w-8 h-8" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top bar */}
        <div className="flex justify-center items-center mb-6 text-[18px]">
          {/* Toggle buttons */}
          <div className="flex bg-gray-10">
            <button
              id="toggle-generate"
              className="py-2 px-4 w-[300px] text-sm font-medium text-white bg-[#433f3a] border border-[#433f3a] rounded-l-[30px] focus:outline-none"
              onClick={() => toggleView('generate')}
            >
              Generate
            </button>
            <button
              id="toggle-recipes"
              className="py-2 px-4 w-[300px] text-sm font-medium text-[#433f3a] bg-gray-100 hover:bg-[#e0e0e0] transition duration-200 border border-[#433f3a] rounded-r-[30px] focus:outline-none"
              onClick={() => toggleView('recipes')}
            >
              Recipes
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="flex mt-[3px] text-[#433f3a] text-[30px] font-semibold mb-2 text-center">
          Generate your recipes!
        </div>
        <div className="flex items-center justify-between mt-2 mb-2">
          <div className="text-[#e99c27] text-2xl font-semibold text-[20px]">
            Enter your ingredients here
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            id="add-ingredient-btn"
            className="mt-4 bg-transparent text-[#433f3a] hover:underline font-medium"
            onClick={addIngredient}
          >
            + Add ingredient
          </button>
          <button className="bg-[#5b9940] text-[16px] text-white px-4 py-1 rounded-full hover:bg-blue-600 shadow-md">
            + New Recipe
          </button>
        </div>
        <div className="flex space-x-4">
          <div id="ingredients-container" className="h-[415px] w-[550px] overflow-y-auto ingredients-scroll rounded-lg bg-transparent mt-3"
          onWheel={handleScroll}>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder={`Ingredient ${index + 1}`}
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                <button
                  className="ml-2 text-red-500 hover:text-red-700 font-semibold"
                  onClick={() => removeIngredient(index)}
                >
                  &#x2715;
                </button>
              </div>
            ))}
          </div>
          <div id="recipe-outcome-container" className="h-[420px] w-1/2 overflow-y-auto rounded-lg bg-transparent border-[#222121] border-[1px] mt-4"></div>
        </div>
        <div className="flex justify">
          <button className="w-[410px] bg-[#5b9940] text-white text-lg font-semibold py-2 rounded-lg hover:bg-[#4a8a37] transition duration-200" style={{ alignSelf: 'flex-end' }}>
            Generate Recipes
          </button>
          <button
            className="relative bg-[#ffffff] w-[40px] h-[42px] ml-3 text-white text-[16px] py-2 rounded-lg hover:bg-[#4a8a37] transition duration-200"
            onClick={() => {
              setIngredients(['', '', '']);
              setIngredientCount(3);
            }}
          >
            <span
              className="absolute inset-0 w-[20px] h-[20px] bg-[url('restart.png')] bg-contain bg-no-repeat bg-center m-auto"
            ></span>
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className="w-[470px] bg-[#fbf8e9] shadow-lg p-4 rounded-l-[30px] flex flex-col"
        style={{ height: "calc(100vh - 40px)", marginTop: "20px" }}
      >
        {/* Updated Section */}
        <div className="flex text-[#433f3a] text-[20px] mt-2 mb-2 ml-3">
          <div className="font-semibold">Recents |</div>
          <div className="ml-2">Generated Recipes</div>
        </div>

        {/* Text section below the header */}
        <div className="ml-3 h-[500px] overflow-y-auto">
          <div className="text-[16px] italic text-gray-500 opacity-70 ml-3 mt-2">
            You haven't generated recipes yet.
          </div>
        </div>

        <div className="mt-5 ml-3 text-[20px] font-semibold text-[#433f3a]">
          Recommendations
        </div>

        <div
          className="mt-3 ml-3 h-[330px] overflow-x-auto favorites-scroll"
          onWheel={handleScroll}
        >
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

export default GeneratePage;
