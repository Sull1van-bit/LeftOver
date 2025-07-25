
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
            className="w-full h-full object-cover"
          />
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
          <h2 className="text-2xl font-bold text-[#123524]">Today's Available <span className="font-extrabold"><img src="/images/Logo.png" alt="LeftOver" className="inline-block h-12 w-auto" /></span></h2>
          <a href="#" className="text-[#3E7B27] hover:underline">View all</a>
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
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#123524] via-[#2d5a3d] to-[#3E7B27]"></div>
          <div className="relative flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 lg:p-16 min-h-[350px]">
            <div className="text-center lg:text-left lg:flex-1 mb-8 lg:mb-0">
              <div className="inline-flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                <span className="text-2xl mr-2">🤝</span>
                <span className="text-white text-sm font-medium tracking-wide">Business Partnership</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight tracking-tight">
                Join Our <span className="text-[#85A947]">LeftOver</span> Program
              </h2>
              <p className="text-xl md:text-2xl text-white/95 mb-6 leading-relaxed font-light">
                Over <span className="font-semibold text-[#85A947]">300+ businesses</span> in Jakarta already saving costs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group bg-white text-[#123524] px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                  Sign Up Now
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
                  Learn More
                </button>
              </div>
            </div>
            <div className="lg:flex-1 lg:ml-12 flex justify-center">
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="text-2xl font-bold text-white">40%</div>
                  <div className="text-sm text-white/80 font-light">Cost Savings</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-3xl mb-2">🌱</div>
                  <div className="text-2xl font-bold text-white">300+</div>
                  <div className="text-sm text-white/80 font-light">Partners</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-sm text-white/80 font-light">Satisfaction</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-white/80 font-light">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#123524]">Just Added - Fresh <span className="font-extrabold"><img src="/images/Logo.png" alt="LeftOver" className="inline-block h-12 w-auto" /></span></h2>
          <a href="#" className="text-[#3E7B27] hover:underline">View all</a>
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
