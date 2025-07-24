
import React from 'react';

const Home = () => {
  const featuredProducts = [
    { id: 1, name: 'Warung Surplus', price: 275000, image: 'https://placehold.co/300x300/3E7B27/EFE3C2?text=Warung+Surplus', description: 'Assorted leftover dishes from local warungs in Jakarta. Perfect for catering small events.' },
    { id: 2, name: 'Roti Bundle', price: 125000, image: 'https://placehold.co/300x300/3E7B27/EFE3C2?text=Roti+Bundle', description: 'Day-old pastries, bread and kue from top bakeries in Bandung. Great for coffee shops.' },
    { id: 3, name: 'Pasar Fresh Box', price: 200000, image: 'https://placehold.co/300x300/3E7B27/EFE3C2?text=Pasar+Box', description: 'Assorted vegetables and fruits from Pasar Baru that are still fresh but didn\'t meet retail standards.' },
    { id: 4, name: 'Dairy Products', price: 175000, image: 'https://placehold.co/300x300/3E7B27/EFE3C2?text=Dairy+Products', description: 'Collection of near-expiry dairy products from Indonesian suppliers including milk, cheese, and yogurt.' },
  ];

  const categories = [
    { id: 1, name: 'Nearby', image: '/images/nearby.jpg' },
    { id: 2, name: 'Our Top Picks', image: '' },
    { id: 3, name: 'Just Rescued!', image: 'https://placehold.co/400x200/3E7B27/EFE3C2?text=Pasar+Grocers' },
  ];

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

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-[#123524]">Explore<span className="text-[#3E7B27] px-2 rounded-md">LeftOver</span></h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center cursor-pointer group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-2 overflow-hidden group-hover:shadow-md transition">
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-[#3E7B27] text-white w-full h-full flex items-center justify-center">
                      <span className="text-lg">{category.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xs text-center text-gray-700 group-hover:text-[#3E7B27] transition">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#123524]">Today's Available <span className="text-[#3E7B27] font-extrabold">LeftOver</span></h2>
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

      <section className="mb-12">
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src="https://placehold.co/1200x200/3E7B27/EFE3C2?text=Special+Offer" 
            alt="Special offer" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#123524] bg-opacity-70 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Join Our <span className="text-[#85A947]">LeftOver</span> Program</h2>
            <p className="text-xl mb-4">Over 300 businesses in Jakarta already saving costs</p>
            <button className="bg-[#3E7B27] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#123524] hover:text-white transition cursor-pointer">
              Sign Up Now
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#123524]">Just Added - Fresh <span className="text-[#3E7B27] font-extrabold">LeftOver</span></h2>
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
    </div>
  );
};

export default Home;
