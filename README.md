# Nomad Gear | Premium Camping Rentals

Nomad Gear is a state-of-the-art camping equipment rental platform. It combines a high-end retail experience with advanced AI integrations to help adventurers prepare for the wilderness with confidence.

## 🚀 Features

### 1. AI Trip Planner
Describe your upcoming adventure in natural language, and our AI (Gemini 3 Flash) will recommend the perfect rental package. It considers group size, duration, and environmental conditions to ensure you have exactly what you need.

### 2. Live AI Support
Need immediate advice? Our Live Support feature uses the Gemini Live API to provide a real-time, voice-activated conversation with a "Wilderness Expert." You can ask about gear maintenance, safety protocols, or packing lists.

### 3. Campground Finder
Integrated with Google Maps grounding, this tool allows you to search for the best campsites near your current location or a specific destination. It provides real-time data and direct navigation links.

### 4. Sustainable Adventure
We promote a circular economy. Renting instead of buying reduces manufacturing waste. We use eco-friendly cleaning processes and donate 1% of all revenue to forest preservation.

## 🛠 Technical Stack

- **Frontend**: React (v19)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Engine**: Google Gemini API (@google/genai)
  - `gemini-3-flash-preview`: For text-based planning.
  - `gemini-2.5-flash`: For Maps/Search grounded discovery.
  - `gemini-2.5-flash-native-audio-preview-12-2025`: For real-time voice support.

## 📦 Getting Started

1. **Environment Variables**: The application requires a valid `API_KEY` for Google GenAI services. This is typically injected via the hosting environment.
2. **Permissions**: The app will request access to your **Microphone** (for Live Support) and **Location** (for the Campground Finder).

## 🌲 Navigation
- **Home**: Hero section with quick links to start renting.
- **How it Works**: A step-by-step guide to the rental process.
- **Gear**: Detailed view of our curated rental packages.
- **AI Planner**: The intelligent recommendation engine.
- **Explorer**: Maps-grounded campsite search.
- **Destinations**: A gallery of curated adventure spots.

---
*Created for adventurers, by adventurers.*