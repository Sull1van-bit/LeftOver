import React, { useState, useRef, useEffect } from 'react';

const RecipeRecommendation = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not supported');
      }
      
      const constraints = {
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          facingMode: { ideal: 'environment' }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      setShowCamera(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(error => {
              setError('Failed to start camera video. Please refresh and try again.');
            });
          };

          videoRef.current.onerror = (error) => {
            setError('Camera video error occurred.');
          };
        }
      }, 100);
      
      setError('');
    } catch (err) {
      let errorMessage = 'Unable to access camera. ';
      
      if (err.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera access in your browser.';
      } else if (err.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (err.name === 'NotReadableError') {
        errorMessage += 'Camera is being used by another application.';
      } else if (err.message === 'getUserMedia not supported') {
        errorMessage += 'Your browser does not support camera access.';
      } else {
        errorMessage += `Please check camera permissions. (Error: ${err.message})`;
      }
      
      setError(errorMessage);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth || video.clientWidth;
      canvas.height = video.videoHeight || video.clientHeight;
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          setCapturedImage(blob);
          stopCamera();
        } else {
          setError('Failed to capture photo. Please try again.');
        }
      }, 'image/jpeg', 0.8);
    } else {
      setError('Video not ready. Please wait and try again.');
    }
  };

  const imageToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const getRecipeRecommendations = async (inputType = 'text', imageData = null) => {
    if (!GEMINI_API_KEY) {
      setError('API key not found. Please setup VITE_GEMINI_API_KEY environment variable');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      let prompt;
      let requestBody;

      if (inputType === 'text') {
        prompt = `Provide 3-5 recipe recommendations based on these ingredients: ${ingredients}. 
        
        Format response in JSON with structure:
        {
          "recipes": [
            {
              "name": "recipe name",
              "description": "brief description",
              "ingredients": ["ingredient1", "ingredient2", "etc"],
              "instructions": ["step1", "step2", "etc"],
              "cookingTime": "cooking time",
              "difficulty": "easy/medium/hard",
              "servings": serving count
            }
          ]
        }
        
        Ensure recipes match available ingredients and are easy to follow.`;

        requestBody = {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        };
      } else {
        prompt = `Analyze this image and identify visible food ingredients. Then provide 3-5 recipe recommendations using those ingredients.
        
        Format response in JSON with structure:
        {
          "detectedIngredients": ["ingredient1", "ingredient2", "etc"],
          "recipes": [
            {
              "name": "recipe name",
              "description": "brief description",
              "ingredients": ["ingredient1", "ingredient2", "etc"],
              "instructions": ["step1", "step2", "etc"],
              "cookingTime": "cooking time",
              "difficulty": "easy/medium/hard",
              "servings": serving count
            }
          ]
        }`;

        requestBody = {
          contents: [{
            parts: [
              {
                text: prompt
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageData
                }
              }
            ]
          }]
        };
      }

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const recipeData = JSON.parse(jsonMatch[0]);
        setRecipes(recipeData.recipes || []);
        
        if (recipeData.detectedIngredients) {
          setIngredients(recipeData.detectedIngredients.join(', '));
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      setError('Failed to get recipe recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setError('Please enter available ingredients');
      return;
    }
    getRecipeRecommendations('text');
  };

  const handleImageAnalysis = async () => {
    if (!capturedImage) return;
    
    try {
      const base64Image = await imageToBase64(capturedImage);
      await getRecipeRecommendations('image', base64Image);
    } catch (error) {
      setError('Failed to analyze image. Please try again.');
    }
  };

  const clearResults = () => {
    setRecipes([]);
    setIngredients('');
    setCapturedImage(null);
    setError('');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#3E7B27] rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold text-[#3E7B27] mb-4">
            AI Recipe Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your ingredients into delicious recipes with the power of AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#3E7B27] rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Text Input
              </h3>
            </div>
            <form onSubmit={handleTextSubmit}>
              <div className="relative">
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Enter your available ingredients...&#10;Example: chicken, onion, tomato, rice, garlic"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 resize-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                  rows="5"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {ingredients.length}/500
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-[#3E7B27] hover:bg-[#2d5a1d] disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Finding Recipes...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Find Recipes
                  </div>
                )}
              </button>
            </form>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#3E7B27] rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Camera Input
              </h3>
            </div>
            
            {!showCamera && !capturedImage && (
              <div className="text-center py-8">
                <div className="w-40 h-40 mx-auto mb-6 bg-[#85A947]/20 rounded-2xl flex items-center justify-center shadow-inner">
                  <svg className="w-16 h-16 text-[#3E7B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Snap a photo of your ingredients<br />for instant AI analysis
                </p>
                <button
                  onClick={startCamera}
                  className="w-full bg-[#3E7B27] hover:bg-[#2d5a1d] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Open Camera
                </button>
              </div>
            )}

            {showCamera && (
              <div className="space-y-6">
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-80 object-cover"
                    onLoadedMetadata={() => {}}
                    onError={(e) => {
                      setError('Failed to load camera video.');
                    }}
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={captureImage}
                    className="flex-1 bg-[#3E7B27] hover:bg-[#2d5a1d] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Capture Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {capturedImage && (
              <div className="space-y-6">
                <div className="relative group">
                  <img
                    src={URL.createObjectURL(capturedImage)}
                    alt="Captured ingredients"
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-[#3E7B27] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Photo Captured
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleImageAnalysis}
                    disabled={loading}
                    className="flex-1 bg-[#3E7B27] hover:bg-[#2d5a1d] disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Analyze Image
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setCapturedImage(null)}
                    disabled={loading}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
                  >
                    Retake
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-400 rounded-xl shadow-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <div className="relative inline-block">
              <div className="w-20 h-20 border-4 border-[#85A947]/30 border-t-[#3E7B27] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#3E7B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-800">Cooking up something special...</h3>
            <p className="mt-2 text-gray-600">Our AI chef is analyzing your ingredients</p>
          </div>
        )}

        {recipes.length > 0 && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/30">
              <div>
                <h2 className="text-3xl font-bold text-[#3E7B27]">
                  Your Recipe Collection
                </h2>
                <p className="text-gray-600 mt-1">
                  {recipes.length} delicious recipe{recipes.length > 1 ? 's' : ''} crafted just for you
                </p>
              </div>
              <button
                onClick={clearResults}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            </div>

            <div className="grid gap-8">
              {recipes.map((recipe, index) => (
                <div key={index} className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{recipe.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                        recipe.difficulty === 'easy' ? 'bg-[#3E7B27] text-white' :
                        recipe.difficulty === 'medium' ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {recipe.difficulty?.toUpperCase()}
                      </span>
                      <span className="px-4 py-2 bg-[#3E7B27] text-white rounded-full text-sm font-bold shadow-lg">
                        {recipe.cookingTime}
                      </span>
                      <span className="px-4 py-2 bg-[#85A947] text-white rounded-full text-sm font-bold shadow-lg">
                        {recipe.servings} servings
                      </span>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-[#85A947]/20 backdrop-blur-sm p-6 rounded-xl border border-[#85A947]/30">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-[#3E7B27] rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v11c0 1.1.9 2 2 2h2m0-18h2a2 2 0 012 2v11c0 1.1-.9 2-2 2h-2m0-18v18" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-800 text-lg">Ingredients</h4>
                      </div>
                      <ul className="space-y-3">
                        {recipe.ingredients?.map((ingredient, idx) => (
                          <li key={idx} className="text-gray-700 flex items-center text-sm">
                            <div className="w-2 h-2 bg-[#3E7B27] rounded-full mr-3 flex-shrink-0"></div>
                            <span className="font-medium">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#85A947]/20 backdrop-blur-sm p-6 rounded-xl border border-[#85A947]/30">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-[#3E7B27] rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-800 text-lg">Instructions</h4>
                      </div>
                      <ol className="space-y-4">
                        {recipe.instructions?.map((instruction, idx) => (
                          <li key={idx} className="text-gray-700 flex text-sm">
                            <div className="bg-[#3E7B27] text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold mr-4 mt-0.5 flex-shrink-0">
                              {idx + 1}
                            </div>
                            <span className="leading-relaxed">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default RecipeRecommendation;