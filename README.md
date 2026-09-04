

# 🌤️ Weather Dashboard

A sleek, modern weather application built with **Next.js** and **React **. Features real-time weather data, interactive maps, forecast carousels, and bonus mini-games — all wrapped in a premium glass morphism UI.

**[Live Demo](https://weather-elyasfgi.vercel.app/)** · **[Source Code](https://github.com/Elyasforghani/Weather)**

---
## 📸 Screenshots
<img width="1584" height="900" alt="Image" src="https://github.com/user-attachments/assets/80555cff-db20-4193-a358-52b51f455144" />
<img width="1892" height="905" alt="Image" src="https://github.com/user-attachments/assets/343847f6-b141-4077-937c-c0dc02b97fe2" />

<img width="1889" height="903" alt="Image" src="https://github.com/user-attachments/assets/5023bb52-e518-4ee9-85b9-ddcbeded5ba9" />

<img width="1580" height="749" alt="Image" src="https://github.com/user-attachments/assets/6c3b315e-e1cf-4be8-91df-a4ee591c9a7a" />

## ✨ Features

- **Real-time Weather Data** — Current conditions, temperature, humidity, wind speed, and more
- **City Search** — Instantly find weather for any city worldwide
- **Interactive Map** — Leaflet-based weather map with dynamic temperature pins
- **Forecast Carousel** — Swiper.js forecast carousel for upcoming days/hours
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Dark Glass Morphism UI** — Modern backdrop-blur aesthetic with muted palette
- **Mobile Navigation Drawer** — Touch-friendly drawer for navigation
- **Bonus: Snake Game** — Interactive mini-game embedded in the dashboard
- **Fast Performance** — Built with Next.js App Router for optimal speed
- **SSR Ready** — Server-side rendering for better SEO and performance

---

## 🚀 Tech Stack

| Layer       | Technology                                    |
| ----------- | --------------------------------------------- |
| Framework   | [Next.js ](https://nextjs.org/) (App Router) |
| React       | [React ](https://react.dev/)                |
| Styling     | [Tailwind CSS](https://tailwindcss.com/)      |
| Maps        | [Leaflet](https://leafletjs.com/)             |
| Icons       | Lucide React / Weather Icons                  |
| Deployment  | [Vercel](https://vercel.com/)                 |

---

## 🏗️ Project Structure

```
weather/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   │   ├── Map.jsx       # Leaflet weather map
│   │   ├── Forecast.jsx  # Swiper carousel
│   │   ├── SearchBar.jsx # City search input
│   │   ├── NavDrawer.jsx # Mobile navigation
│   │   └── SnakeGame.jsx # Mini-game
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── styles/           # Global & component styles
├── public/               # Static assets
├── package.json
├── tailwind.config.js
└── next.config.js
```

---

## 🎨 Design System

**Aesthetic:** Dark glass morphism with premium SaaS feel  
**Primary Palette:** 
- Backdrop: Near-monochrome with subtle blur effects
- Accents: Cool tones (sky blue, frosty white)
- Cards: Semi-transparent backgrounds with border highlights

**Typography:** Clean, minimal — prioritizing clarity and hierarchy

---

## 🔧 Getting Started

### Prerequisites
- Node.js 18+ (recommended 20.x)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Elyasforghani/Weather.git
cd Weather

# Install dependencies
npm install

# Create .env.local (if API key required)
echo "NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here" > .env.local
```

### Development

```bash
# Run dev server
npm run dev

# Open browser
# http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## 🌍 Weather API

The app fetches weather data from a public weather API (OpenWeatherMap, WeatherAPI, or similar). Update the API endpoint in your environment variables or `.env.local`:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
NEXT_PUBLIC_WEATHER_API_BASE=https://api.openweathermap.org/data/2.5
```

---

## 📱 Key Components

### `Map.jsx`
Interactive Leaflet map displaying weather pins for searched cities with real-time temperature overlays.

```jsx
<Map cities={searchedCities} />
```

### `Forecast.jsx`
Swiper carousel showing hourly or daily forecast with smooth animations.

```jsx
<Forecast forecast={forecastData} />
```

### `SearchBar.jsx`
Autocomplete city search with debounced API calls.

```jsx
<SearchBar onSelect={handleCitySelect} />
```

### `NavDrawer.jsx`
Mobile-responsive navigation drawer with smooth slide-in animation.

```jsx
<NavDrawer open={isOpen} onClose={toggleDrawer} />
```

### `SnakeGame.jsx`
Classic Snake game as a bonus feature — test your reflexes while checking the weather! 🎮

---

## 🎯 Performance Tips

- **Image Optimization:** Next.js Image component for lazy-loaded weather icons
- **Code Splitting:** Automatic route-based splitting via App Router
- **Caching:** SWR for efficient API data fetching with revalidation
- **Mobile-First:** Tailwind's responsive utilities for mobile optimization

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Push to GitHub, then:
# 1. Go to https://vercel.com
# 2. Import your GitHub repository
# 3. Set environment variables
# 4. Deploy
```

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Deploy Elsewhere

The app is platform-agnostic and can be deployed to:
- [Netlify](https://netlify.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Docker](https://www.docker.com/)
- Self-hosted servers

---

## 📖 API Reference

### City Search
```javascript
// Returns matching cities
const cities = await searchCities('London');
```

### Fetch Weather
```javascript
// Returns current weather + 7-day forecast
const weather = await getWeather(lat, lon);
```

### Map Pins
```javascript
// Dynamically add temperature pins
addPin(lat, lon, temperature, cityName);
```

---


## 📝 Environment Variables

```bash
# Weather API
NEXT_PUBLIC_WEATHER_API_KEY=your_key_here
NEXT_PUBLIC_WEATHER_API_BASE=https://api.openweathermap.org

# (Optional) Analytics
NEXT_PUBLIC_GA_ID=your_ga_id_here
```

---

## 🐛 Troubleshooting

**Map not loading?**
- Ensure Leaflet CSS is imported in your component
- Check browser console for CORS errors


**API rate limits?**
- Consider implementing caching or upgrading API plan
- Check rate limit headers in network tab

**Mobile navbar issues?**
- Verify Tailwind responsive breakpoints are correct
- Test in DevTools mobile device mode

---

## 🤝 Contributing

Contributions welcome! Feel free to:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Elyas Forghani**  
Frontend Developer | Next.js Specialist  
[GitHub](https://github.com/Elyasforghani) · [Portfolio](https://elyasforghani.com)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Leaflet](https://leafletjs.com/) for interactive mapping

---

## 📞 Support

Found a bug or have a feature request? [Open an issue](https://github.com/Elyasforghani/Weather/issues) on GitHub.

---

**Built with ☀️ and ❄️ by Elyas**
