import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../components/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import GoogleAuthentication from '../components/GoogleAuthentication';

const CreateAccPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

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

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setNameError('');
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setNameError('');
  };

  const handleLoginRedirect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/LogIn');
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName.trim() === '' || lastName.trim() === '') {
      setNameError('First Name and Last Name are required.');
      return;
    }

    if (emailError || passwordError) {
      return; // Prevent form submission if there are errors
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        });
      }
      console.log('Created Account!');
      toast.success('Successfully Created Account!', {
        position: 'top-center',
      });
    } catch (error) {
      console.log(error.message);
      toast.error('Email is already used.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <form onSubmit={handleSubmit}>
            <div className="absolute top-[150px] left-1 ml-[90px] text-[#545454]">
              <div className="text-[30px] mt-5 font-bold">
                Create new account
              </div>
              <div className="text-[20px] mt-[2px]">
                Already have an account?{' '}
                <span
                  onClick={handleLoginRedirect}
                  className="text-green-600 hover:underline cursor-pointer"
                >
                  Log in
                </span>
              </div>

              <div className="mt-[15px] flex space-x-3">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="text-[18px] w-[260px] h-[38px] mt-1 px-4 py-2 bg-transparent border-[2px] border-[#545454] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#545454]"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className="text-[18px] w-[260px] h-[38px] mt-1 px-4 py-2 bg-transparent border-[2px] border-[#545454] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#545454]"
                  placeholder="Last Name"
                  required
                />
              </div>
              {nameError && (
                <div className="text-red-500 text-[14px] mt-2">
                  {nameError}
                </div>
              )}

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
                  Create account
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <div className="flex-grow border-t border-gray-500"></div>
                <span className="mx-4 text-gray-500 text-[18px]">or</span>
                <div className="flex-grow border-t border-gray-500"></div>
              </div>

              <GoogleAuthentication/>

            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateAccPage;
