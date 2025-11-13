/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#10B981',
        accent: '#F59E0B',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        textPrimary: '#1F2937',
        textSecondary: '#6B7280',
      }
    },
  },
  plugins: [],
}
