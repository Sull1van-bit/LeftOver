import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '../../supabaseClient';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const Catalog = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
    address: 'Getting your location...',
    isLoading: true,
    error: null
  });
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [customAddress, setCustomAddress] = useState('');
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [selectedMapLocation, setSelectedMapLocation] = useState(null);
  const [surpriseBoxes, setSurpriseBoxes] = useState([]);
  const searchRef = useRef(null);
  const bannerRef = useRef(null);

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        console.log('📍 Map clicked at:', lat, lng);
        setSelectedMapLocation({ lat, lng });
        
        try {
          const address = await reverseGeocode(lat, lng);
          setSelectedMapLocation({ lat, lng, address });
        } catch (error) {
          setSelectedMapLocation({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
        }
      },
    });
    return null;
  };

  const banners = [
    {
      id: 1,
      title: "Best Deal This Week",
      subtitle: "Up to 50% off on rescued food items",
      image: "/public/images/FoodWaste.jpg",
      color: "from-green-400 to-green-600"
    },
    {
      id: 2,
      title: "Fresh Produce Alert",
      subtitle: "Farm fresh vegetables at discounted prices",
      image: "/public/images/nearby.jpg",
      color: "from-orange-400 to-orange-600"
    },
    {
      id: 3,
      title: "Bakery Special",
      subtitle: "Day-old bread and pastries - 70% off",
      image: "/public/images/logo.jpg",
      color: "from-blue-400 to-blue-600"
    }
  ];

  const getLocationFromIP = async () => {
    try {
      console.log('🌐 Trying IP-based location detection...');
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.latitude && data.longitude) {
        console.log('✅ IP location obtained:', data);
        const address = `${data.city}, ${data.region}, ${data.country_name}`;
        setUserLocation({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          address: address,
          isLoading: false,
          error: null
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ IP geolocation failed:', error);
      return false;
    }
  };

  const getCurrentLocation = () => {
    console.log('🔍 Starting location detection...');
    setUserLocation(prev => ({ ...prev, isLoading: true, error: null }));
    
    if (!navigator.geolocation) {
      console.error('❌ Geolocation is not supported by this browser');
      setUserLocation(prev => ({
        ...prev,
        isLoading: false,
        error: "Geolocation is not supported by this browser.",
        address: "Location not available"
      }));
      return;
    }

    const isSecureContext = window.isSecureContext || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    console.log('🔒 Secure context:', isSecureContext);
    console.log('🌐 Current URL:', window.location.href);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('✅ Location obtained:', position.coords);
        const { latitude, longitude } = position.coords;
        try {
          const address = await reverseGeocode(latitude, longitude);
          console.log('🏠 Address resolved:', address);
          setUserLocation({
            latitude,
            longitude,
            address,
            isLoading: false,
            error: null
          });
        } catch (error) {
          console.error('❌ Reverse geocoding failed:', error);
          setUserLocation({
            latitude,
            longitude,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            isLoading: false,
            error: null
          });
        }
      },
      (error) => {
        console.error('❌ Geolocation error:', error);
        let errorMessage = "Unable to get your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            console.log('🚫 User denied location permission');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            console.log('📍 Location information unavailable');
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            console.log('⏰ Location request timeout');
            break;
        }
        
        console.log('🔄 Attempting IP-based location fallback...');
        getLocationFromIP().then(success => {
          if (!success) {
            setUserLocation(prev => ({
              ...prev,
              isLoading: false,
              error: errorMessage,
              address: "Location not available"
            }));
          }
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        const address = data.display_name.split(',').slice(0, 3).join(', ');
        return address;
      }
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        return {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          address: display_name.split(',').slice(0, 3).join(', ')
        };
      }
      throw new Error('Address not found');
    } catch (error) {
      console.error('Geocoding failed:', error);
      throw error;
    }
  };

  const handleMapLocationSelect = () => {
    if (selectedMapLocation) {
      setUserLocation({
        latitude: selectedMapLocation.lat,
        longitude: selectedMapLocation.lng,
        address: selectedMapLocation.address || `${selectedMapLocation.lat.toFixed(4)}, ${selectedMapLocation.lng.toFixed(4)}`,
        isLoading: false,
        error: null
      });
      setShowMapPicker(false);
      setShowLocationPicker(false);
      setSelectedMapLocation(null);
    }
  };

  const openMapPicker = () => {
    const centerLat = userLocation.latitude || -6.2088;
    const centerLng = userLocation.longitude || 106.8456;
    setMapCenter([centerLat, centerLng]);
    setSelectedMapLocation(null);
    setShowMapPicker(true);
  };

  const handleCustomAddress = async () => {
    if (!customAddress.trim()) return;
    
    setUserLocation(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await geocodeAddress(customAddress);
      setUserLocation({
        ...result,
        isLoading: false,
        error: null
      });
      setShowLocationPicker(false);
      setCustomAddress('');
    } catch (error) {
      setUserLocation(prev => ({
        ...prev,
        isLoading: false,
        error: "Address not found. Please try a different address."
      }));
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  const nearbyProducts = [
    {
      id: 1,
      name: "Fresh Vegetables Bundle",
      description: "Mixed seasonal vegetables",
      originalPrice: "₹200",
      discountPrice: "₹120",
      discount: "40% off",
      store: "Green Grocers",
      latitude: userLocation.latitude ? userLocation.latitude + 0.005 : 0,
      longitude: userLocation.longitude ? userLocation.longitude + 0.005 : 0,
      image: "/public/images/FoodWaste.jpg"
    },
    {
      id: 2,
      name: "Bakery Mix Pack",
      description: "Assorted bread and pastries",
      originalPrice: "₹150",
      discountPrice: "₹75",
      discount: "50% off",
      store: "City Bakery",
      latitude: userLocation.latitude ? userLocation.latitude + 0.008 : 0,
      longitude: userLocation.longitude ? userLocation.longitude + 0.003 : 0,
      image: "/public/images/nearby.jpg"
    },
    {
      id: 3,
      name: "Fruit Surprise Box",
      description: "Seasonal fruits variety pack",
      originalPrice: "₹300",
      discountPrice: "₹180",
      discount: "40% off",
      store: "Fresh Mart",
      latitude: userLocation.latitude ? userLocation.latitude + 0.003 : 0,
      longitude: userLocation.longitude ? userLocation.longitude + 0.007 : 0,
      image: "/public/images/logo.jpg"
    }
  ];

  // Fetch surprise boxes from Supabase (like KatalogManager)
  const fetchSurpriseBoxes = async () => {
    const { data, error } = await supabase.from('katalog').select('*');
    if (error) {
      console.error('Error fetching surprise boxes:', error.message);
    } else {
      setSurpriseBoxes(data);
    }
  };

  const justRescuedItems = [
    {
      id: 7,
      name: "Restaurant Surplus",
      description: "High-quality prepared ingredients",
      originalPrice: "₹350",
      discountPrice: "₹175",
      discount: "50% off",
      store: "Fine Dine Restaurant",
      badge: "Just Rescued",
      timeLeft: "2 hours left",
      latitude: userLocation.latitude ? userLocation.latitude + 0.007 : 0,
      longitude: userLocation.longitude ? userLocation.longitude + 0.004 : 0,
      image: "/public/images/FoodWaste.jpg"
    },
    {
      id: 8,
      name: "Organic Produce",
      description: "Slightly imperfect organic vegetables",
      originalPrice: "₹280",
      discountPrice: "₹140",
      discount: "50% off",
      store: "Organic Valley",
      badge: "Just Rescued",
      timeLeft: "4 hours left",
      latitude: userLocation.latitude ? userLocation.latitude + 0.009 : 0,
      longitude: userLocation.longitude ? userLocation.longitude + 0.001 : 0,
      image: "/public/images/nearby.jpg"
    },
    {
      id: 9,
      name: "Dairy Products",
      description: "Fresh dairy nearing expiry",
      originalPrice: "₹200",
      discountPrice: "₹100",
      discount: "50% off",
      store: "Local Dairy",
      badge: "Just Rescued",
      timeLeft: "1 hour left",
      latitude: userLocation.latitude ? userLocation.latitude + 0.002 : 0,
      longitude: userLocation.longitude ? userLocation.longitude + 0.008 : 0,
      image: "/public/images/logo.jpg"
    }
  ];

  useEffect(() => {
    getCurrentLocation();
    fetchSurpriseBoxes(); // Fetch data like KatalogManager
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (searchRef.current && bannerRef.current) {
        const bannerBottom = bannerRef.current.offsetTop + bannerRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        
        setIsSearchSticky(scrollPosition >= bannerBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ProductCard = ({ product, showBadge = false }) => {
    const distance = userLocation.latitude && userLocation.longitude && product.latitude && product.longitude
      ? calculateDistance(userLocation.latitude, userLocation.longitude, product.latitude, product.longitude)
      : null;

    const formatDistance = (dist) => {
      if (dist === null) return '';
      if (dist < 1) return `${Math.round(dist * 1000)}m`;
      return `${dist.toFixed(1)}km`;
    };

    return (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl product-card-hover transition-all duration-300 overflow-hidden group">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {showBadge && product.badge && (
            <div className={`absolute top-3 right-3 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white ${
              product.badge === 'Surprise Box' ? 'bg-purple-500' : 'bg-red-500'
            }`}>
              {product.badge}
            </div>
          )}
          {product.timeLeft && (
            <div className="absolute bottom-3 left-3 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
              ⏰ {product.timeLeft}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 text-sm sm:text-base">{product.name}</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg font-bold text-green-600">
                {product.discountPrice}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {product.originalPrice}
              </span>
            </div>
            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
              {product.discount}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3">
            <span className="line-clamp-1">📍 {product.store}</span>
            {distance !== null && (
              <span className="whitespace-nowrap ml-2">{formatDistance(distance)}</span>
            )}
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm">
            Explore More
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#EFE3C2]">
      <div ref={bannerRef} className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div 
              key={banner.id}
              className={`min-w-full h-full bg-gradient-to-r ${banner.color} flex items-center justify-center relative`}
            >
              <div className="text-center text-white z-10 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">{banner.title}</h2>
                <p className="text-sm sm:text-lg md:text-xl opacity-90">{banner.subtitle}</p>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentBannerIndex 
                  ? 'bg-white scale-110' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={() => setCurrentBannerIndex(currentBannerIndex === 0 ? banners.length - 1 : currentBannerIndex - 1)}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1 sm:p-2 rounded-full transition-all duration-200"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => setCurrentBannerIndex(currentBannerIndex === banners.length - 1 ? 0 : currentBannerIndex + 1)}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1 sm:p-2 rounded-full transition-all duration-200"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div 
        ref={searchRef}
        className={`${
          isSearchSticky 
            ? 'fixed top-0 left-0 right-0 z-50 bg-[#EFE3C2] shadow-lg' 
            : 'relative'
        } transition-all duration-300`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for food items, stores, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 sm:py-4 px-4 sm:px-6 pr-12 sm:pr-16 rounded-full border-2 border-gray-200 focus:border-green-500 focus:outline-none text-gray-700 shadow-md text-sm sm:text-base"
            />
            <button className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 rounded-full transition-colors duration-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="absolute right-12 sm:right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2 hidden sm:block">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`max-w-6xl mx-auto px-4 ${isSearchSticky ? 'pt-16 sm:pt-20' : 'pt-4 sm:pt-6'}`}>
        
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl">📍</span>
              <div className="flex flex-col">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Near Your Current Location</h2>
                <div className="flex items-center space-x-2 mt-1">
                  {userLocation.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                      <span className="text-sm text-gray-600">Getting location...</span>
                    </div>
                  ) : userLocation.error ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-red-600">{userLocation.error}</span>
                      <button 
                        onClick={getCurrentLocation}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-1"
                      >
                        Try Again
                      </button>
                      <button 
                        onClick={() => setShowLocationPicker(true)}
                        className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        Set Location
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 line-clamp-1 max-w-xs">{userLocation.address}</span>
                      <button 
                        onClick={() => setShowLocationPicker(true)}
                        className="text-xs bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded flex items-center space-x-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Change</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 text-sm sm:text-base">
              See More →
            </button>
          </div>

          {showLocationPicker && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Choose Your Location</h3>
                
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      getCurrentLocation();
                      setShowLocationPicker(false);
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Use Current Location</span>
                  </button>

                  <button
                    onClick={openMapPicker}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span>Pick from Map</span>
                  </button>
                  
                  <div className="text-center text-gray-500 text-sm">Or type address</div>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter your address or city..."
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      className="w-full py-3 px-4 border-2 border-gray-200 focus:border-green-500 focus:outline-none rounded-lg text-gray-700"
                      onKeyPress={(e) => e.key === 'Enter' && handleCustomAddress()}
                    />
                    <button
                      onClick={handleCustomAddress}
                      disabled={!customAddress.trim()}
                      className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                    >
                      Set This Location
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setShowLocationPicker(false);
                    setCustomAddress('');
                  }}
                  className="mt-4 w-full text-gray-500 hover:text-gray-700 py-2 font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {showMapPicker && (
            <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-4xl h-[80vh] transform transition-all duration-300 scale-100 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Choose Location on Map</h3>
                  <button
                    onClick={() => {
                      setShowMapPicker(false);
                      setSelectedMapLocation(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1 mb-4 rounded-lg overflow-hidden">
                  <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    className="rounded-lg"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler />
                    {selectedMapLocation && (
                      <Marker position={[selectedMapLocation.lat, selectedMapLocation.lng]} />
                    )}
                  </MapContainer>
                </div>

                {selectedMapLocation && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-600 mb-1">Selected location:</p>
                    <p className="font-medium text-gray-800">
                      {selectedMapLocation.address || `${selectedMapLocation.lat.toFixed(4)}, ${selectedMapLocation.lng.toFixed(4)}`}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowMapPicker(false);
                      setSelectedMapLocation(null);
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleMapLocationSelect}
                    disabled={!selectedMapLocation}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Confirm Location
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  Click anywhere on the map to select your location
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {nearbyProducts
              .map(product => ({
                ...product,
                calculatedDistance: userLocation.latitude && userLocation.longitude && product.latitude && product.longitude
                  ? calculateDistance(userLocation.latitude, userLocation.longitude, product.latitude, product.longitude)
                  : Infinity
              }))
              .sort((a, b) => a.calculatedDistance - b.calculatedDistance)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Surprise Box</h2>
            <button className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 text-sm sm:text-base">
              See More →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {surpriseBoxes.map((item) => {
              // Transform katalog data to product format
              const product = {
                id: item.id,
                name: item.title,
                description: item.desc,
                originalPrice: `₹${(item.price * 1.5).toFixed(0)}`,
                discountPrice: `₹${item.price}`,
                discount: "33% off",
                store: "Local Store",
                badge: "Surprise Box",
                latitude: userLocation.latitude ? userLocation.latitude + 0.010 : 0,
                longitude: userLocation.longitude ? userLocation.longitude + 0.002 : 0,
                image: item.image || "/public/images/FoodWaste.jpg"
              };

              const calculatedDistance = userLocation.latitude && userLocation.longitude && product.latitude && product.longitude
                ? calculateDistance(userLocation.latitude, userLocation.longitude, product.latitude, product.longitude)
                : Infinity;

              return (
                <ProductCard 
                  key={item.id} 
                  product={{ ...product, calculatedDistance }} 
                  showBadge={true} 
                />
              );
            })}
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Just Rescued!</h2>
            <button className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 text-sm sm:text-base">
              See More →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {justRescuedItems
              .map(product => ({
                ...product,
                calculatedDistance: userLocation.latitude && userLocation.longitude && product.latitude && product.longitude
                  ? calculateDistance(userLocation.latitude, userLocation.longitude, product.latitude, product.longitude)
                  : Infinity
              }))
              .sort((a, b) => a.calculatedDistance - b.calculatedDistance)
              .map((product) => (
                <ProductCard key={product.id} product={product} showBadge={true} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
