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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
            AI Recipe Recommendations
        </h2>
        <p className="text-gray-600" style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>
          Get recipe suggestions based on your available ingredients
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Text Input
          </h3>
          <form onSubmit={handleTextSubmit}>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter available ingredients, separated by commas&#10;Example: chicken, onion, tomato, rice"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows="4"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Finding Recipes...' : 'Find Recipes'}
            </button>
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Camera Input
          </h3>
          
          {!showCamera && !capturedImage && (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Take a photo of your ingredients for AI analysis
              </p>
              <button
                onClick={startCamera}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Open Camera
              </button>
            </div>
          )}

          {showCamera && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                  onLoadedMetadata={() => {}}
                  onError={(e) => {
                    setError('Failed to load camera video.');
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-white border-dashed rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">Point at food ingredients</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={captureImage}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Capture Photo
                </button>
                <button
                  onClick={stopCamera}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {capturedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={URL.createObjectURL(capturedImage)}
                  alt="Captured ingredients"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  ✓ Photo Captured
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleImageAnalysis}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Retake
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Finding the best recipes for you...</p>
        </div>
      )}

      {recipes.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800">
              Recipe Recommendations ({recipes.length})
            </h3>
            <button
              onClick={clearResults}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Clear Results
            </button>
          </div>

          <div className="grid gap-6">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-gray-800">{recipe.name}</h4>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      recipe.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {recipe.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {recipe.cookingTime}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {recipe.servings} servings
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{recipe.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Ingredients:</h5>
                    <ul className="space-y-1">
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Instructions:</h5>
                    <ol className="space-y-2">
                      {recipe.instructions.map((instruction, idx) => (
                        <li key={idx} className="text-gray-600 flex">
                          <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                            {idx + 1}
                          </span>
                          {instruction}
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
  );
};

export default RecipeRecommendation;