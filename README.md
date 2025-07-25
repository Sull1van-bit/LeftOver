# GarudaHacks 2025 - AI Recipe Recommendation App

Aplikasi web modern yang menggunakan AI untuk memberikan rekomendasi resep berdasarkan bahan-bahan yang tersedia. Dibangun dengan React + Vite dan mengintegrasikan Google Gemini 2.0 Flash API.

## Fitur Utama

-  **Rekomendasi Resep AI**: Dapatkan saran resep berdasarkan bahan yang Anda miliki
-  **Input Teks**: Masukkan bahan-bahan secara manual
-  **Input Kamera**: Foto bahan-bahan untuk analisis otomatis
-  **UI Modern**: Interface yang responsive dan user-friendly
-  **Sistem Login**: Autentikasi pengguna dengan profil
-  **Mobile Responsive**: Optimized untuk semua perangkat

##  Teknologi yang Digunakan

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.0 Flash API
- **Camera**: WebRTC MediaDevices API
- **Icons**: Heroicons

##  Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau yarn
- Google AI Studio account untuk Gemini API key

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
   
   Edit file `.env` dan tambahkan API key Anda:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Dapatkan Gemini API Key**
   - Kunjungi [Google AI Studio](https://aistudio.google.com/)
   - Buat akun atau login
   - Generate API key baru
   - Copy API key ke file `.env`

5. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```

6. **Buka browser**
   Aplikasi akan berjalan di `http://localhost:5173`

##  Cara Menggunakan

### Rekomendasi Resep dengan Input Teks
1. Navigasi ke halaman "Recipe AI"
2. Masukkan bahan-bahan yang tersedia di textarea (pisahkan dengan koma)
3. Klik "Cari Resep"
4. AI akan memberikan rekomendasi resep berdasarkan bahan tersebut

### Rekomendasi Resep dengan Kamera
1. Navigasi ke halaman "Recipe AI"
2. Klik "Buka Kamera"
3. Arahkan kamera ke bahan-bahan makanan
4. Klik "Ambil Foto"
5. Klik "Analisis Gambar"
6. AI akan mengidentifikasi bahan dan memberikan rekomendasi resep

##  Struktur Project

```
src/
├── components/
│   ├── navbar.jsx              # Navigation bar dengan login system
│   ├── footer.jsx              # Footer component
│   └── RecipeRecommendation.jsx # Komponen utama untuk fitur AI recipe
├── views/
│   ├── home/
│   │   └── index.jsx           # Halaman home
│   └── catalog/
│       └── index.jsx           # Halaman catalog
├── assets/
└── App.jsx                     # Main app component
```

##  API Configuration

Aplikasi menggunakan Google Gemini 2.0 Flash API dengan endpoint:
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent
```

Format request mencakup:
- Text input untuk bahan-bahan
- Image input (base64) untuk analisis foto
- Structured JSON response dengan resep yang diformat

##  Features Detail

### Input Methods
- **Text Input**: Textarea untuk input manual bahan-bahan
- **Camera Input**: WebRTC camera access untuk foto real-time
- **Image Analysis**: AI vision untuk identifikasi bahan dari foto

### Recipe Display
- Nama resep dan deskripsi
- Daftar bahan-bahan dengan bullet points
- Langkah-langkah memasak bernomor
- Info tingkat kesulitan, waktu masak, dan jumlah porsi
- Responsive card layout

### User Experience
- Loading states dengan spinner
- Error handling dan pesan informatif
- Responsive design untuk mobile dan desktop
- Smooth transitions dan animations

##  License

This project is licensed under the MIT License.

##  Support

Jika Anda mengalami masalah atau memiliki pertanyaan, silakan buat issue di repository ini.

## Our team
**cuman bisa html :**
1. Victor Chandra
2. Rafael Romelo Gibran
3. Hansen Japri
4. Naufal Rabbani
---

**GarudaHacks 2025** - Transforming Food Waste into Delicious Possibilities!
