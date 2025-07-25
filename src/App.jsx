import React, { useState, useEffect } from 'react';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './views/home';
import Catalog from './views/catalog';
import About from './views/about';
import RecipeRecommendation from './components/RecipeRecommendation';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    points: 1250,
    profilePicture: null
  });
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const checkExistingSession = () => {
      const savedSession = localStorage.getItem('userSession');
      if (savedSession) {
        try {
          const sessionData = JSON.parse(savedSession);
          setIsLoggedIn(true);
          setUserData(sessionData.userData);
        } catch (error) {
          console.error('Error parsing saved session:', error);
          localStorage.removeItem('userSession');
        }
      }
    };

    checkExistingSession();

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentView(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const simulatedUserData = {
        name: 'John Doe',
        points: 1250,
        profilePicture: null,
        email: 'john@example.com'
      };

      setIsLoggedIn(true);
      setUserData(simulatedUserData);

      localStorage.setItem('userSession', JSON.stringify({
        isLoggedIn: true,
        userData: simulatedUserData,
        timestamp: Date.now()
      }));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const handleSignUp = async (userData) => {
    try {
      console.log('Sign up with:', userData);
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({
      name: '',
      points: 0,
      profilePicture: null
    });
    
    localStorage.removeItem('userSession');
  };

  const updateUserData = (newData) => {
    const updatedData = { ...userData, ...newData };
    setUserData(updatedData);
    
    if (isLoggedIn) {
      localStorage.setItem('userSession', JSON.stringify({
        isLoggedIn: true,
        userData: updatedData,
        timestamp: Date.now()
      }));
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'catalog':
        return <Catalog />;
      case 'about':
        return <About />;
      case 'recipe':
        return <RecipeRecommendation />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE3C2]">
      <Navbar 
        isLoggedIn={isLoggedIn}
        userData={userData}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onLogout={handleLogout}
        onUpdateUserData={updateUserData}
      />
      {renderCurrentView()}
      <Footer />
    </div>
  );
}

export default App;
