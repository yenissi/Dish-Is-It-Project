import React from 'react'
import GetStartedPage from './components/GetStartedPage'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import CreateAccPage from './pages/CreateAccPage'
import LogInPage from './pages/LogInPage'
import { ToastContainer } from 'react-toastify'
import Welcome from './components/Welcome'
import RecipePage from './pages/RecipePage'
import GoogleAuthentication from './components/GoogleAuthentication'
import GeneratePage from './pages/GeneratePage'

const App = () => {
  return (
    <div className="relative w-screen h-screen bg-cover bg-center" style={{backgroundImage: "url('/HomePageBG.png')"}}> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStartedPage />}/>
          <Route path="/CreateAccount" element={<CreateAccPage />} />
          <Route path="/LogIn" element={<LogInPage />} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/RecipePage" element={<RecipePage />} />
          <Route path="/GeneratePage" element={<GeneratePage />} />
          <Route path="/GoogleAuthentication" element={<GoogleAuthentication />} />

        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  )
}

export default App
