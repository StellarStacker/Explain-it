// App Configuration
export const CONFIG = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE',
  GEMINI_MODEL: 'gemini-2.0-flash', // Using the latest available Gemini 2.0 Flash model
  GEMINI_API_BASE: 'https://generativelanguage.googleapis.com/v1/models/',
  get GEMINI_API_URL() { return `${this.GEMINI_API_BASE}${this.GEMINI_MODEL}:generateContent`; },
  MAX_INPUT_LENGTH: parseInt(import.meta.env.VITE_MAX_INPUT_LENGTH) || 5000,
  ANIMATION_DURATION: 300,
  APP_NAME: import.meta.env.VITE_APP_NAME || 'ExplainIt',
  DEFAULT_THEME: 'dark', // dark or light
  PARTICLE_COLORS: {
    dark: ['#00f5ff', '#bf00ff', '#ff0080'],
    light: ['#00a5ff', '#7000ff', '#ff0080']
  }
}
