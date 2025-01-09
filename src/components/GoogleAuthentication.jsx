import React, { useState } from 'react';
import googleicon from '../assets/google-icon.png';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const GoogleAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();

    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        // Save user data to Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "", // You can modify this if you'd like to capture last name
        });

        toast.success("User logged in successfully!", {
          position: "top-center",
        });

        navigate("/Welcome"); // Redirect to profile page after login
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      toast.error("Failed to sign up with Google", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          className={`w-full flex items-center justify-center border-[1px] border-[#545454] text-gray-600 py-2 rounded-lg transition duration-200 ${
            loading ? "bg-gray-300 cursor-not-allowed" : "hover:bg-[#bdbdbd]"
          }`}
          disabled={loading}
        >
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              <img src={googleicon} alt="Google Icon" className="h-5 w-5 mr-2" />
              Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GoogleAuthentication;
