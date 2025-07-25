import React, { useState, useEffect } from 'react';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './views/home';
import { supabase } from './supabaseClient';
import Catalog from './views/catalog';
import About from './views/about';
import RecipeRecommendation from './components/RecipeRecommendation';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    points: 0,
    profilePicture: null
  });
  const [currentView, setCurrentView] = useState('home');
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");


  const showNotificationPopup = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000); 
  };

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUserData({
          name: session.user.user_metadata?.display_name || session.user.email,
          points: session.user.user_metadata?.points || 0,
          profilePicture: null,
          email: session.user.email
        });
      }
    };

    checkExistingSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsLoggedIn(true);
        setUserData({
          name: session.user.user_metadata?.display_name || session.user.email,
          points: session.user.user_metadata?.points || 0,
          profilePicture: null,
          email: session.user.email
        });
        
      
        if (event === 'SIGNED_IN') {
          setTimeout(() => {
            showNotificationPopup(`Welcome back, ${session.user.user_metadata?.display_name || 'User'}!`, "success");
          }, 100);
        }
      } else {
        setIsLoggedIn(false);
        setUserData({
          name: '',
          points: 0,
          profilePicture: null
        });
        
        // Show logout notification
        if (event === 'SIGNED_OUT') {
          setTimeout(() => {
            showNotificationPopup('You have been logged out successfully!', "info");
          }, 100);
        }
      }
    });

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentView(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        console.error('Login error:', error.message);
        showNotificationPopup(`Login failed: ${error.message}`, "error");
        return { success: false, error: error.message };
      }

      console.log('Login successful:', data);
      // Success notification will be shown by onAuthStateChange
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      showNotificationPopup('Login failed. Please try again.', "error");
      return { success: false, error: error.message };
    }
  };

  const handleSignUp = async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            display_name: userData.name,
            points: 0,
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error.message);
        showNotificationPopup(`Sign up failed: ${error.message}`, "error");
        return { success: false, error: error.message };
      }

      console.log('Sign up successful:', data);
      showNotificationPopup('Sign up successful! Please check your email for verification.', "success");
      return { success: true, message: 'Please check your email for verification link' };
    } catch (error) {
      console.error('Sign up error:', error);
      showNotificationPopup('Sign up failed. Please try again.', "error");
      return { success: false, error: error.message };
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    }
    // State will be updated automatically by onAuthStateChange
  };

  const updateUserData = (newData) => {
    const updatedData = { ...userData, ...newData };
    setUserData(updatedData);
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
      
    
      {showNotification && (
        <div className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-500 ease-out ${
          showNotification ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          notificationType === 'success' ? 'bg-green-500 text-white' :
          notificationType === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center justify-center">
            <span className="font-medium">{notificationMessage}</span>
          </div>
        </div>
      )}
    </div>
  );


}

export default App;
