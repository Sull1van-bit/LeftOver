# GarudaHacks 2025 - LeftOver

A web-based application that helps users and restaurant owners use food wisely and effectively.

## Key Features

- **Ecommerce**: A marketplace within the app
- **AI Recipe Recommendations**: Get recipe suggestions based on the ingredients you have on hand
- **Text Input**: Enter ingredients manually
- **Camera Input**: Photograph ingredients for automatic analysis
- **Modern UI**: Responsive and user-friendly interface
- **Login System**: User authentication with profiles
- **Mobile Responsive**: Optimized for all devices
  

##  Technology we use

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.0 Flash API
- **Camera**: WebRTC MediaDevices API
- **Icons**: Heroicons

##  Prerequisites

- Node.js (v16 or new version)
- npm or yarn
- Google AI Studio account for Gemini API key

## 🛠️ Setup dan Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd GarudaHacks2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit file `.env` and add your API key :
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   
4. **Get Gemini API Key**
- Visit Google AI Studio (https://aistudio.google.com/)
- Create an account or log in
- Generate a new API key
- Copy the API key to the `.env` file

5. **Run the application**
```bash
npm run dev
```

6. **Open browser**
The application will run at `http://localhost:5173`
## How to Use

### Recipe Recommendations with Text Input
1. Navigate to the "Recipe AI" page
2. Enter the available ingredients in the text area (separate them with commas)
3. Click "Search Recipes"
4. The AI will provide recipe recommendations based on those ingredients.

### Recipe Recommendations with Camera
1. Navigate to the "Recipe AI" page
2. Click "Open Camera"
3. Point the camera at the ingredients.
4. Click "Take Photo"
5. Click "Analyze Image"
6. The AI will identify the ingredients and provide recipe recommendations.

## Project Structure

```
src/
├── components/
│   ├── navbar.jsx              # Navigation bar 
│   ├── footer.jsx              # Footer component
│   └── RecipeRecommendation.jsx #  AI recipe
├── views/
│   ├── home/
│   │   └── index.jsx           # Home Page
│   └── catalog/
│       └── index.jsx           # Catalog Page
├── assets/
└── App.jsx                     # Main app component
```

##  API Configuration

The application uses the Google Gemini 2.0 Flash API with the endpoint:


https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent


The request format includes:
- Text input for ingredients
- Image input (base64) for photo analysis
- Structured JSON response with formatted recipe

## Features Detail

### Input Methods
- **Text Input**: Textarea for manual input of ingredients
- **Camera Input**: WebRTC camera access for real-time photos
- **Image Analysis**: AI vision for ingredient identification from photos

### Recipe Display
- Recipe name and description
- List of ingredients with bullet points
- Numbered cooking steps
- Difficulty level, cooking time, and servings
- Responsive card layout

### User Experience
- Loading states with spinner
- Error handling and informative messages
- Responsive design for mobile and Desktop
- Smooth transitions and animations

## Support

If you encounter any issues or have questions, please create an issue in this repository.


## Our team
**cuman bisa html :**
1. Victor Chandra
2. Rafael Romelo Gibran
3. Hansen Japri
4. Naufal Rabbani
---

**GarudaHacks 2025** - Transforming Food Waste into Delicious Possibilities!
