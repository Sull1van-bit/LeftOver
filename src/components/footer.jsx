import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#85A947] to-[#6B8B3A] text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-10 w-16 h-16 bg-white rounded-full blur-sm"></div>
        <div className="absolute bottom-6 right-20 w-12 h-12 bg-white rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full blur-sm"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-3">
              <img
                src="/images/Logo.png"
                alt="LeftOver Logo"
                className="h-12 w-auto filter brightness-0 invert hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              Transforming food waste into delicious possibilities.
              Join us in creating a sustainable future, one recipe at a time.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <a href="#recipe" className="text-gray-200 hover:text-white hover:scale-105 transition-all duration-300 text-sm">
                Recipe Finder
              </a>
              <a href="#catalog" className="text-gray-200 hover:text-white hover:scale-105 transition-all duration-300 text-sm">
                Catalog
              </a>
              <a href="#about" className="text-gray-200 hover:text-white hover:scale-105 transition-all duration-300 text-sm">
                About Us
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.53 3H21L14.19 10.19L22.07 21H15.66L10.87 14.41L5.5 21H2.43L9.63 13.36L2 3H8.59L13.01 9.03L17.53 3ZM16.34 19H18.13L7.81 5H6.01L16.34 19Z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.25 11.25h-3v-5.5c0-1.32-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91v5.59h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-200 text-sm">LeftOver@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-white/20 my-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-sm text-gray-200">
              &copy; {new Date().getFullYear()} LeftOver. All rights reserved.
            </span>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-200 hover:text-white hover:underline transition-all duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-200 hover:text-white hover:underline transition-all duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-200 hover:text-white hover:underline transition-all duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </footer>
  );
};

export default Footer;
