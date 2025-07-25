import React, { useState, useEffect } from 'react';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './views/home';
import { supabase } from './supaBaseClient';
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
      } else {
        setIsLoggedIn(false);
        setUserData({
          name: '',
          points: 0,
          profilePicture: null
        });
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
        return { success: false, error: error.message };
      }

      console.log('Login successful:', data);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
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
        return { success: false, error: error.message };
      }

      console.log('Sign up successful:', data);
      return { success: true, message: 'Please check your email for verification link' };
    } catch (error) {
      console.error('Sign up error:', error);
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
