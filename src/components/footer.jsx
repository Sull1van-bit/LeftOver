import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#85A947] text-white py-4 mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <span className="text-sm">&copy; {new Date().getFullYear()} Cuman Bisa HTML. All rights reserved.</span>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-gray-200 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-200 transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
