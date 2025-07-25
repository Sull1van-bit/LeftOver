import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] via-white to-[#F5F5DC]">

      <div className="relative bg-gradient-to-r from-[#85A947] to-[#6B8E23] py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl px-8 py-12 shadow-2xl border-4 border-white border-opacity-50">
            <h1 className="text-5xl md:text-6xl font-bold text-[#123524] mb-6 tracking-tight">
              About Us
            </h1>
            <div className="w-32 h-2 bg-gradient-to-r from-[#85A947] to-[#6B8E23] mx-auto rounded-full mb-6"></div>
            <p className="text-xl md:text-2xl text-[#123524] font-medium leading-relaxed">
              Transforming Food Waste into Community Wealth
            </p>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white bg-opacity-20 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#123524] mb-4">
              Do you know that ⅓ foods wasted in Indonesia
            </h2>
            <div className="w-24 h-1 bg-[#85A947] mx-auto rounded-full"></div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-xl border-l-8 border-red-400 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl md:text-7xl font-bold text-red-500 mb-4">21M</div>
                <div className="text-2xl font-semibold text-red-600 mb-4">tons of food wasted yearly</div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  While this food fills landfills and harms our environment, many families still wonder where their next meal will come from.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl mb-4">🗑️</div>
                  <p className="text-lg font-semibold text-gray-800">Food waste creates harmful methane emissions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#123524] mb-6">Problem Title</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-full px-8 py-4 shadow-lg border-2 border-[#85A947] border-opacity-30">
                <span className="font-semibold text-[#123524]">Food Waste Crisis</span>
              </div>
              <div className="bg-white rounded-full px-8 py-4 shadow-lg border-2 border-[#85A947] border-opacity-30">
                <span className="font-semibold text-[#123524]">Environmental Impact</span>
              </div>
              <div className="bg-white rounded-full px-8 py-4 shadow-lg border-2 border-[#85A947] border-opacity-30">
                <span className="font-semibold text-[#123524]">Economic Loss</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#123524] mb-6">How we faced it?</h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="relative">
                <div className="bg-[#85A947] text-white rounded-full px-8 py-4 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <span className="font-bold text-lg">Step 1</span>
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <svg className="w-8 h-8 text-[#123524]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                  </svg>
                </div>
              </div>
              
              <div className="bg-[#85A947] text-white rounded-full px-8 py-4 shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="font-bold text-lg">Step 2</span>
              </div>
              
              <div className="relative">
                <div className="bg-[#85A947] text-white rounded-full px-8 py-4 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <span className="font-bold text-lg">Step 3</span>
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <svg className="w-8 h-8 text-[#123524]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#85A947] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-[#123524] mb-4">Partner with Suppliers</h3>
                <p className="text-gray-600 leading-relaxed">
                  We connect directly with farmers, producers, and distributors to rescue food that would otherwise be wasted.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#85A947] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold text-[#123524] mb-4">Digital Platform</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our user-friendly app makes it easy to discover and purchase rescued food items at discounted prices.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#85A947] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-bold text-[#123524] mb-4">Efficient Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fast and reliable delivery system ensures rescued food reaches your table while still fresh and delicious.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#123524] mb-6">What we've made so far</h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white rounded-full px-8 py-4 shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="font-bold text-lg">Food Rescue Platform</span>
              </div>
              <div className="bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white rounded-full px-8 py-4 shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="font-bold text-lg">Community Network</span>
              </div>
              <div className="bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white rounded-full px-8 py-4 shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="font-bold text-lg">Impact Tracking</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-4xl md:text-5xl font-bold text-[#85A947] mb-2">500K+</div>
              <div className="text-xl font-semibold text-[#123524] mb-2">Tons Rescued</div>
              <p className="text-gray-600">Food saved from waste</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-4xl md:text-5xl font-bold text-[#85A947] mb-2">10K+</div>
              <div className="text-xl font-semibold text-[#123524] mb-2">Happy Families</div>
              <p className="text-gray-600">Families served daily</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-4xl md:text-5xl font-bold text-[#85A947] mb-2">75%</div>
              <div className="text-xl font-semibold text-[#123524] mb-2">Cost Savings</div>
              <p className="text-gray-600">Average savings for users</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 bg-gradient-to-r from-[#123524] to-[#85A947] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-12 border border-white border-opacity-30">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Join Us</h2>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed opacity-90">
              This is more than just a grocery store; it's a movement. Join us in turning the tide on food waste in Indonesia.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="group">
                <button className="w-full bg-white text-[#123524] py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group-hover:bg-[#EFE3C2]">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">🛒</span>
                    <span>Ready to Treasure Hunt?</span>
                    <span className="text-sm opacity-75 mt-1">Go Catalog Button</span>
                  </div>
                </button>
              </div>
              
              <div className="group">
                <button className="w-full bg-[#85A947] text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-[#6B8E23] border-2 border-white border-opacity-30">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">🏪</span>
                    <span>Have Surplus Food?</span>
                    <span className="text-sm opacity-75 mt-1">Register as Seller Partner</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-lg opacity-90 leading-relaxed">
                Together, we can create a future of <span className="font-bold text-[#EFE3C2]">zero waste</span> and <span className="font-bold text-[#EFE3C2]">full plates</span>.
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-10 left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default About;
