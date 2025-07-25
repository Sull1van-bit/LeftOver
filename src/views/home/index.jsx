
import React, { useState } from 'react';
import KatalogManager from '../../components/KatalogManager';

const Home = () => {
  const featuredProducts = [
    { id: 1, name: 'Warung Surplus', price: 275000, image: '../../../public/images/warung.png', description: 'Assorted leftover dishes from local warungs in Jakarta. Perfect for catering small events.' },
    { id: 2, name: 'Roti Bundle', price: 125000, image: '../../../public/images/Bread.jpg', description: 'Day-old pastries, bread and kue from top bakeries in Bandung. Great for coffee shops.' },
    { id: 3, name: 'Pasar Fresh Box', price: 200000, image: '../../../public/images/basket-full-vegetables.jpg', description: 'Assorted vegetables and fruits from Pasar Baru that are still fresh but didn\'t meet retail standards.' },
    { id: 4, name: 'Dairy Products', price: 175000, image: '../../../public/images/Cheese.png', description: 'Collection of near-expiry dairy products from Indonesian suppliers including milk, cheese, and yogurt.' },
  ];

  const categories = [
    { id: 1, name: 'Just Rescued', info: 'Recently saved', image: '/images/map.png' },
    { id: 2, name: 'Surprise Box', info: 'Mystery bag of great food at a low price', image: '/images/open-box.png  ' },
    { id: 3, name: 'Pick and Choose', info: 'See and select the exact items you get ', image: '/images/shopping.png' },
  ];

  const [showKatalog, setShowKatalog] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        <div className="w-full h-96 bg-[#123524] rounded-lg overflow-hidden mb-8">
          <img
            src="/images/FoodWaste.jpg"
            alt="Food Waste Hero Banner"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-shadow-lg">Reduce Food Waste in Indonesia</h1>
            <p className="text-xl text-white mb-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Help save 23 million tons of food wasted annually in Indonesia</p>
            <button className="bg-[#85A947] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#123524] hover:text-white transition shadow-md cursor-pointer">
              Join the Movement
            </button>
          </div>
        </div>
      </div>

      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#123524] mb-3 tracking-tight">
            Explore <span className="text-[#3E7B27] bg-[#3E7B27]/10 px-3 py-1 rounded-lg">LeftOver</span>
          </h2>
          <p className="text-gray-600 text-lg font-light">Discover food categories and make an impact</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100/50">
          <div className="grid grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center cursor-pointer group">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-4 overflow-hidden group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 border-2 border-transparent group-hover:border-[#85A947]/20">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-[#3E7B27] to-[#85A947] text-white w-full h-full flex items-center justify-center rounded-xl">
                      <span className="text-2xl font-bold">{category.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#85A947]/0 to-[#85A947]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>
                <h3 className="text-sm font-semibold text-center text-gray-800 group-hover:text-[#3E7B27] transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.info}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#123524] mb-2 tracking-tight">
            Today's Available <span className="text-[#3E7B27] font-extrabold">LeftOver</span>
          </h2>
          <button className="cursor-pointer text-green-600 hover:text-green-700 font-medium transition-colors duration-200 text-sm sm:text-base">
            See More →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-[#123524] text-white text-xs px-2 py-1 rounded">
                  Limited
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Rp {product.price} <span className="text-xs text-red-600 line-through">Rp {product.price * 1.6}</span></span>
                  <button className="bg-[#85A947] text-white px-3 py-1 rounded hover:bg-opacity-90 transition">
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#123524]">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between p-6 md:p-8 lg:p-12 min-h-[320px]">
            
            {/* Text Content - Order 1 on all screens */}
            <div className="text-center lg:text-left lg:flex-1 order-1 mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight tracking-tight">
                Join Our <span className="text-[#85A947] relative">
                  LeftOver
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#85A947]/40 rounded-full"></div>
                </span> Program
              </h2>

              <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed font-light max-w-lg">
                Over <span className="font-semibold text-[#85A947] bg-[#85A947]/10 px-2 py-1 rounded-md">300+ businesses</span> in Indonesia already saving costs
              </p>

              {/* Buttons - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button className="cursor-pointer group bg-[#85A947] hover:bg-[#6d8a39] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                  Sign Up Now
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="cursor-pointer group border-2 border-white/40 hover:border-white hover:bg-white/5 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Learn More
                </button>
              </div>
            </div>

            {/* Statistics Grid - Order 2 on mobile, stays right on desktop */}
            <div className="w-full lg:flex-1 lg:ml-8 flex justify-center order-2 mb-6 lg:mb-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-2xl w-full">
                {/* Cost Savings - Enhanced Money Icon */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 lg:p-5 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 group shadow-lg hover:shadow-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 bg-[#85A947]/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#85A947]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white mb-1">40%</div>
                  <div className="text-xs text-white/80 font-medium">Cost Savings</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 lg:p-5 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 group shadow-lg hover:shadow-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 bg-[#85A947]/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[#85A947]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white mb-1">300+</div>
                  <div className="text-xs text-white/80 font-medium">Partners</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 lg:p-5 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 group shadow-lg hover:shadow-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 bg-[#85A947]/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[#85A947]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white mb-1">95%</div>
                  <div className="text-xs text-white/80 font-medium">Satisfaction</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 lg:p-5 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 group shadow-lg hover:shadow-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 bg-[#85A947]/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[#85A947]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white mb-1">24/7</div>
                  <div className="text-xs text-white/80 font-medium">Support</div>
                </div>
              </div>
            </div>

            {/* Buttons - Only shown on mobile, Order 3 */}
            <div className="w-full flex justify-center order-3 lg:hidden">
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="cursor-pointer group bg-[#85A947] hover:bg-[#6d8a39] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                  Sign Up Now
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="cursor-pointer group border-2 border-white/40 hover:border-white hover:bg-white/5 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#123524] mb-2 tracking-tight">
            More From <span className="text-[#3E7B27] font-extrabold">LeftOver</span>
          </h2>
          <button className="cursor-pointer text-green-600 hover:text-green-700 font-medium transition-colors duration-200 text-sm sm:text-base">
            See More →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).reverse().map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-[#3E7B27] text-white text-xs px-2 py-1 rounded">
                  Pick up today
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Rp {product.price} <span className="text-xs text-red-600 line-through">Rp {product.price * 1.6}</span></span>
                  <button className="bg-[#85A947] text-white px-3 py-1 rounded hover:bg-opacity-90 transition">
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div >
  );
};

export default Home;
