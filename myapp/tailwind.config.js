/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
            
    "primary": "#8ba9f9",
            
    "secondary": "#027cf7",
            
    "accent": "#c97f46",
            
    "neutral": "#2e232e",
            
    "base-100": "#edeef2",
            
    "info": "#8bcee4",
            
    "success": "#1bb196",
            
    "warning": "#eea53f",
            
    "error": "#f7584a",
            },
          },
        ],
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
}
