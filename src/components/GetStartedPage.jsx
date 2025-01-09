import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const GetStartedPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/CreateAccount');
    }, 200); // Adjust the time delay as needed (2000ms = 2 seconds)
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar/>

          <div className="absolute top-[200px] left-1 ml-[85px] text-[#545454]">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
              From what you have
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl italic mt-6">
              to what you crave
            </div>
            <div className="text-[24px] mt-9">
              Make the most of your pantry! Just add your available<br/>
              ingredients, and get tasty recipes customized for you.
            </div>

            <div className="mt-[45px]">
              <button
                className="px-20 py-3 bg-[#545454] text-white text-[18px] rounded-full shadow-lg hover:bg-[#7a736a] transition duration-300 font-sans"
                onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GetStartedPage;
