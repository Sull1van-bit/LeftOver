import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] via-white to-[#F5F5DC]">
      
      <div className="relative bg-gradient-to-r from-[#85A947] to-[#6B8E23] py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl px-10 py-16 shadow-2xl border border-white border-opacity-30">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#85A947] to-[#6B8E23] rounded-full mb-8 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#123524] mb-6 tracking-tight">
              About Us
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#85A947] to-[#6B8E23] mx-auto rounded-full mb-8"></div>
            <p className="text-xl md:text-2xl text-[#123524] font-medium leading-relaxed max-w-3xl mx-auto">
              Transforming Food Waste into Delicious Possibilities
            </p>
          </div>
        </div>
        <div className="absolute top-20 left-20 w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-white bg-opacity-20 rounded-full"></div>
      </div>

      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#123524] mb-6 leading-tight">
              Did you know that <span className="text-red-600">⅓ of food</span> is wasted in Indonesia?
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-3xl p-10 md:p-16 shadow-2xl border border-red-100 mb-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="flex items-baseline mb-6">
                  <div className="text-7xl md:text-8xl font-bold text-red-600 mr-4">21M</div>
                  <div className="text-2xl font-semibold text-red-700">tons/year</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Food Wasted Annually</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  While this massive amount of food fills landfills and harms our environment, millions of families still struggle to put food on their tables.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-red-100">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                    Food waste generates harmful methane emissions, contributing to climate change
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-[#123524] mb-8">The Triple Impact Crisis</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl px-8 py-6 shadow-lg border-2 border-red-100 hover:border-red-200 transition-colors duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <span className="font-bold text-[#123524] text-lg">Food Waste Crisis</span>
              </div>
              <div className="bg-white rounded-2xl px-8 py-6 shadow-lg border-2 border-green-100 hover:border-green-200 transition-colors duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <span className="font-bold text-[#123524] text-lg">Environmental Impact</span>
              </div>
              <div className="bg-white rounded-2xl px-8 py-6 shadow-lg border-2 border-yellow-100 hover:border-yellow-200 transition-colors duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <span className="font-bold text-[#123524] text-lg">Economic Loss</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#85A947] bg-opacity-10 rounded-full mb-6">
              <svg className="w-8 h-8 text-[#ffffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#123524] mb-6">Our Solution Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We tackle food waste through a comprehensive three-step strategy that connects all stakeholders in the food ecosystem.
            </p>
            
            <div className="hidden md:flex flex-row items-center justify-center gap-8 mb-16">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="font-bold text-xl">01</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-bold text-[#123524] text-lg">Connect</h4>
                  <p className="text-sm text-gray-600">Partner with suppliers</p>
                </div>
              </div>
              
              <div>
                <svg className="w-12 h-8 text-[#85A947]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="font-bold text-xl">02</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-bold text-[#123524] text-lg">Platform</h4>
                  <p className="text-sm text-gray-600">Digital marketplace</p>
                </div>
              </div>
              
              <div>
                <svg className="w-12 h-8 text-[#85A947]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="font-bold text-xl">03</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-bold text-[#123524] text-lg">Deliver</h4>
                  <p className="text-sm text-gray-600">Fast & reliable</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-green-100">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#123524] mb-4">Strategic Partnerships</h3>
                <p className="text-gray-600 leading-relaxed">
                  We build strong relationships with farmers, producers, and distributors to identify and rescue surplus food before it becomes waste.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-blue-100">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#123524] mb-4">Smart Digital Platform</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our intuitive mobile app and web platform make it seamless to discover, purchase, and track rescued food items at significant discounts.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-purple-100">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#123524] mb-4">Rapid Logistics Network</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our optimized delivery system ensures rescued food reaches customers quickly while maintaining freshness and quality standards.
                </p>
              </div>
            </div>
          </div>

          <div className="md:hidden space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="font-bold text-xl">01</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="mt-4 text-center sm:text-left">
                  <h4 className="font-bold text-[#123524] text-lg">Connect</h4>
                  <p className="text-sm text-gray-600">Partner with suppliers</p>
                </div>
              </div>
              
              <div className="flex-1 group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100">
                <div className="text-center sm:text-left">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#123524] mb-3">Strategic Partnerships</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We build strong relationships with farmers, producers, and distributors to identify and rescue surplus food before it becomes waste.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="font-bold text-xl">02</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                </div>
                <div className="mt-4 text-center sm:text-left">
                  <h4 className="font-bold text-[#123524] text-lg">Platform</h4>
                  <p className="text-sm text-gray-600">Digital marketplace</p>
                </div>
              </div>
              
              <div className="flex-1 group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100">
                <div className="text-center sm:text-left">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#123524] mb-3">Smart Digital Platform</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our intuitive mobile app and web platform make it seamless to discover, purchase, and track rescued food items at significant discounts.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="font-bold text-xl">03</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                </div>
                <div className="mt-4 text-center sm:text-left">
                  <h4 className="font-bold text-[#123524] text-lg">Deliver</h4>
                  <p className="text-sm text-gray-600">Fast & reliable</p>
                </div>
              </div>
              
              <div className="flex-1 group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-100">
                <div className="text-center sm:text-left">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#123524] mb-3">Rapid Logistics Network</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our optimized delivery system ensures rescued food reaches customers quickly while maintaining freshness and quality standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 bg-gradient-to-br from-white via-[#EFE3C2] to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#85A947] bg-opacity-10 rounded-full mb-6">
              <svg className="w-8 h-8 text-[#ffffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#123524] mb-6">Our Impact So Far</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Through innovation and community collaboration, we're creating measurable change in Indonesia's fight against food waste.
            </p>
            
            <div className="cursor-default flex flex-wrap justify-center gap-4 mb-16">
              <div className="bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-bold">Food Rescue Platform</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-bold">Community Network</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-bold">Impact Tracking</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cursor-default grid md:grid-cols-3 gap-8 mb-16">
            <div className="group text-center bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100">
              <div className="w-20 h-20 bg-gradient-to-r from-[#85A947] to-[#6B8E23] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-[#85A947] mb-3">500K+</div>
              <div className="text-2xl font-bold text-[#123524] mb-3">Tons Rescued</div>
              <p className="text-gray-600 leading-relaxed">Food saved from landfills and transformed into valuable resources for communities</p>
            </div>
            
            <div className="group text-center bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-3">10K+</div>
              <div className="text-2xl font-bold text-[#123524] mb-3">Families Served</div>
              <p className="text-gray-600 leading-relaxed">Households accessing affordable, quality food through our rescue network daily</p>
            </div>
            
            <div className="group text-center bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-100">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-purple-600 mb-3">75%</div>
              <div className="text-2xl font-bold text-[#123524] mb-3">Cost Savings</div>
              <p className="text-gray-600 leading-relaxed">Average savings families achieve on quality food through our rescue marketplace</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 bg-gradient-to-br from-[#123524] via-[#85A947] to-[#6B8E23] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-12 md:p-16 border border-white border-opacity-20 shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-8">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#123524]">Join the Movement</h2>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed opacity-95 max-w-3xl mx-auto text-[#123524]">
              This is more than just a marketplace—it's a revolution against food waste. 
              <span className="font-semibold"> Be part of the change</span> that transforms Indonesia's food ecosystem.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              <div className="group">
                <button href="#catalog" className="cursor-pointer w-full bg-white text-[#123524] py-6 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-[#EFE3C2] border-2 border-transparent hover:border-[#85A947]">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#85A947] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold mb-1">Start Shopping</span>
                    <span className="text-sm opacity-75">Discover rescued food treasures</span>
                  </div>
                </button>
              </div>
              
              <div className="group">
                <button href="#home" className="cursor-pointer w-full bg-gradient-to-r from-[#85A947] to-[#6B8E23] text-white py-6 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:from-[#6B8E23] hover:to-[#85A947] border-2 border-white border-opacity-30">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-[#85A947]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold mb-1">Become a Partner</span>
                    <span className="text-sm opacity-75">Turn surplus into opportunity</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="border-t border-white border-opacity-20 pt-8">
              <p className="text-lg md:text-xl text-[#123524] opacity-95 leading-relaxed">
                Together, we can create a future where 
                <span className="font-bold mx-2">zero food goes to waste</span>
                and
                <span className="font-bold mx-2">every family has full plates</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
