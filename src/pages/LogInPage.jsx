import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Loading from '../components/Loading'; // Import your Loading component
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebase';
import { toast } from 'react-toastify';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add state for loading
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Simple email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(emailValue)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    // Password validation regex: at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_]{8,}$/;

    if (!passwordRegex.test(passwordValue)) {
      setPasswordError('Password must be at least 8 characters long. Include numbers and special characters.');
    } else {
      setPasswordError('');
    }
  };

  const handleSignUpRedirect = () => {
    setLoading(true); // Set loading to true when navigating
    setTimeout(() => {
      navigate('/CreateAccount');
      setLoading(false); // Set loading to false after the delay
    }, 200); // Adjust the delay as needed (1000ms = 1 second)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged In Successfully');
      window.location.href = '/Welcome';
      toast.success('Successfully Logged In', {
        position: 'top-center',
      });
    } catch (error) {
      console.log('Account does not exist');
      toast.error('Account does not exist', {
        position: 'top-center',
      });
    }
  };

  return (
    <div>
      {loading ? (
        <Loading /> // Show loading component while loading
      ) : (
        <>
          <Navbar />
          <form onSubmit={handleSubmit}>
            <div className="absolute top-[150px] left-1 ml-[90px] text-[#545454]">
              <div className="text-[30px] mt-5 font-bold">Log In</div>
              <div className="text-[20px] mt-[2px]">
                No account yet?{' '}
                <span
                  onClick={handleSignUpRedirect}
                  className="text-green-600 hover:underline cursor-pointer"
                >
                  Sign Up
                </span>
              </div>

              <div className="mt-[15px]">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`text-[18px] w-[532px] h-[38px] px-4 py-2 bg-transparent border-[2px] ${emailError ? 'border-red-500' : 'border-[#545454]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#545454]`}
                  placeholder="Email"
                  required
                />
                {emailError && (
                  <div className="text-red-500 text-[14px] mt-2">
                    {emailError}
                  </div>
                )}
              </div>

              <div className="text-[20px] mt-[15px] relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-[532px] h-[38px] px-4 py-2 bg-transparent border-[2px] border-[#545454] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#545454] pr-12"
                  placeholder="Password"
                  required
                />

                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  onClick={togglePassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              {passwordError && (
                <div className="text-red-500 text-[14px] mt-2">{passwordError}</div>
              )}
            
              <div className="mt-[20px]">
                <button
                  type="submit"
                  disabled={!!emailError || !!passwordError} // Disable if email or password is invalid
                  className={`w-full bg-[#545454] text-white py-2 rounded-lg ${emailError || passwordError ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#7a736a]'} transition duration-200`}
                >
                  Log In
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LogInPage;
