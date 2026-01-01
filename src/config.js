// App Configuration
export const CONFIG = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  MAX_INPUT_LENGTH: parseInt(import.meta.env.VITE_MAX_INPUT_LENGTH) || 5000,
  ANIMATION_DURATION: 300,
  APP_NAME: import.meta.env.VITE_APP_NAME || 'ExplainIt',
  DEFAULT_THEME: 'dark', // dark or light
  PARTICLE_COLORS: {
    dark: ['#00f5ff', '#bf00ff', '#ff0080'],
    light: ['#00a5ff', '#7000ff', '#ff0080']
  }
}
