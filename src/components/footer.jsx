import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#85A947] to-[#6B8B3A] text-white py-12 mt-16 relative overflow-hidden">
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
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300">
                <span className="text-sm font-bold">t</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300">
                <span className="text-sm font-bold">in</span>
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
