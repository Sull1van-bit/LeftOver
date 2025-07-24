import React, { useState, useRef, useEffect } from 'react';

const Navbar = ({ 
  isLoggedIn, 
  userData, 
  onLogin, 
  onSignUp, 
  onLogout, 
  onUpdateUserData 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = async () => {
    const result = await onLogin({ email: 'demo@example.com', password: 'password' });
    if (result?.success) {
      setIsUserMenuOpen(false);
    }
  };

  const handleSignUp = async () => {
    const result = await onSignUp({ 
      name: 'New User', 
      email: 'newuser@example.com', 
      password: 'password' 
    });
    if (result?.success) {
      setIsUserMenuOpen(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    setIsUserMenuOpen(false);
  };

  const handleProfilePictureChange = () => {
    const newProfilePicture = 'https://via.placeholder.com/150';
    onUpdateUserData({ profilePicture: newProfilePicture });
  };

  return (
    <nav className="bg-gradient-to-r from-[#85A947] to-[#9BB85C] sticky top-0 z-50 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img src='/images/logo.jpg' alt="Logo" className="h-8 w-auto" />
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <a href="#home" className="text-white hover:bg-white/15 px-4 py-2 rounded-lg transition-all duration-200 font-medium">
              Home
            </a>
            <a href="#about" className="text-white hover:bg-white/15 px-4 py-2 rounded-lg transition-all duration-200 font-medium">
              About
            </a>
            <a href="#services" className="text-white hover:bg-white/15 px-4 py-2 rounded-lg transition-all duration-200 font-medium">
              Services
            </a>
            <a href="#contact" className="text-white hover:bg-white/15 px-4 py-2 rounded-lg transition-all duration-200 font-medium">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 border-2 border-white/30 hover:border-white/50"
                aria-label="User menu"
              >
                {isLoggedIn && userData.profilePicture ? (
                  <img 
                    src={userData.profilePicture} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  {!isLoggedIn ? (
                    <div className="p-4">
                      <div className="space-y-2">
                        <button
                          onClick={handleLogin}
                          className="w-full bg-[#85A947] hover:bg-[#75993E] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                          Login
                        </button>
                        <button
                          onClick={handleSignUp}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="px-4 py-3 bg-gradient-to-r from-[#85A947] to-[#9BB85C] text-white">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            {userData.profilePicture ? (
                              <img 
                                src={userData.profilePicture} 
                                alt="Profile" 
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{userData.name}</p>
                            <p className="text-xs opacity-90">{userData.points} Points</p>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <button 
                          onClick={handleProfilePictureChange}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
                        >
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm">Change Profile Picture</span>
                        </button>
                        
                        <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="text-sm">Points: {userData.points}</span>
                        </button>

                        <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm">Settings</span>
                        </button>

                        <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm">FAQ</span>
                        </button>

                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-150"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="text-sm">Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/20 focus:outline-none transition-all duration-200"
                aria-label="Toggle menu"
              >
                <svg className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#85A947] to-[#9BB85C] px-2 pt-2 pb-3 space-y-1 shadow-xl border-t border-white/20">
          <a href="#home" className="block text-white px-4 py-3 rounded-lg hover:bg-white/15 transition-all duration-200 font-medium">
            Home
          </a>
          <a href="#about" className="block text-white px-4 py-3 rounded-lg hover:bg-white/15 transition-all duration-200 font-medium">
            About
          </a>
          <a href="#services" className="block text-white px-4 py-3 rounded-lg hover:bg-white/15 transition-all duration-200 font-medium">
            Services
          </a>
          <a href="#contact" className="block text-white px-4 py-3 rounded-lg hover:bg-white/15 transition-all duration-200 font-medium">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
