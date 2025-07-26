import './style.css'
import { callGeminiAPI } from './api.js'

// App Configuration
const CONFIG = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE',
  GEMINI_MODEL: 'gemini-pro', // Temporarily using standard Gemini Pro instead of 1.5 Pro due to API issues
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

// DOM Elements
const elements = {
  input: document.getElementById('jargon-input'),
  explainBtn: document.getElementById('explain-btn'),
  outputSection: document.getElementById('output-section'),
  loadingSection: document.getElementById('loading-section'),
  errorSection: document.getElementById('error-section'),
  explanationText: document.getElementById('explanation-text'),
  copyBtn: document.getElementById('copy-btn'),
  errorMessage: document.getElementById('error-message'),
  themeToggle: document.getElementById('theme-toggle'),
  sunIcon: document.getElementById('sun-icon'),
  moonIcon: document.getElementById('moon-icon'),
}

// State Management
let isProcessing = false

// Utility Functions
const showSection = (section) => {
  // Hide all sections first
  Object.values(elements).forEach(el => {
    if (el && el.classList.contains('hidden')) return
    if (el && (el.id.includes('-section'))) {
      el.classList.add('hidden')
    }
  })
  
  // Show the target section with animation
  setTimeout(() => {
    section.classList.remove('hidden')
    section.style.opacity = '0'
    section.style.transform = 'translateY(20px)'
    
    requestAnimationFrame(() => {
      section.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      section.style.opacity = '1'
      section.style.transform = 'translateY(0)'
      
      // Add a subtle flash effect on appearance
      const flashElement = document.createElement('div')
      flashElement.className = 'absolute inset-0 bg-white/10 rounded-3xl'
      flashElement.style.animation = 'flash-in 0.5s forwards'
      section.querySelector('div').appendChild(flashElement)
      
      setTimeout(() => {
        if (flashElement.parentNode) {
          flashElement.parentNode.removeChild(flashElement)
        }
      }, 500)
    })
  }, 50)
  
  // Add to animation keyframes if they don't exist yet
  if (!document.querySelector('#flash-keyframes')) {
    const style = document.createElement('style')
    style.id = 'flash-keyframes'
    style.textContent = `
      @keyframes flash-in {
        0% { opacity: 0.5; }
        100% { opacity: 0; }
      }
    `
    document.head.appendChild(style)
  }
}

const hideAllSections = () => {
  [elements.outputSection, elements.loadingSection, elements.errorSection].forEach(section => {
    if (section) section.classList.add('hidden')
  })
}

const validateInput = (text) => {
  if (!text.trim()) {
    throw new Error('Please enter some text to explain')
  }
  
  if (text.length > CONFIG.MAX_INPUT_LENGTH) {
    throw new Error(`Text is too long. Please keep it under ${CONFIG.MAX_INPUT_LENGTH} characters.`)
  }
  
  return text.trim()
}

const formatExplanation = (text) => {
  // Convert markdown-like formatting to HTML
  return text
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-600 dark:text-primary-400">$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Bullet points
    .replace(/^- (.*?)$/gm, '<li class="ml-4 mb-2">$1</li>')
    .replace(/<li class="ml-4 mb-2">([\s\S]*?)(?=<li|$)/g, '<ul class="list-disc mb-4">$&</ul>')
    // Headers
    .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold my-3">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold my-4">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold my-5">$1</h1>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n(?!\n)/g, '<br>')
    // Wrap in paragraph if not starting with a heading or list
    .replace(/^(?!<h|<ul)/, '<p class="mb-4">')
    .replace(/(?!<\/h\d>|<\/ul>|<\/p>)$/, '</p>')
}

// API function is imported from ./api.js

// Main Functions
const explainText = async () => {
  if (isProcessing) return
  
  // Store original button content before any modifications
  const originalBtnContent = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    Explain It
  `
  
  try {
    isProcessing = true
    elements.explainBtn.disabled = true
    
    // Set processing state
    elements.explainBtn.querySelector('span').innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    `
    
    const inputText = validateInput(elements.input.value)
    
    // Show loading state
    showSection(elements.loadingSection)
    
    // Start timer for generation time tracking
    const startTime = performance.now()
    
    // Call Gemini API with CONFIG
    const response = await callGeminiAPI(inputText, CONFIG)
    
    // End timer and calculate generation time
    const endTime = performance.now()
    const generationTime = ((endTime - startTime) / 1000).toFixed(1)
    
    console.log('Complete API response:', response);
    
    if (!response.candidates || response.candidates.length === 0) {
      console.error('API response missing candidates array:', response);
      throw new Error('No explanation generated. Please try again.')
    }
    
    if (!response.candidates[0]?.content?.parts?.[0]?.text) {
      console.error('Unexpected API response structure:', response);
      throw new Error('Invalid response format. Please try again.')
    }
    
    const explanation = response.candidates[0].content.parts[0].text
    
    // Format and display the explanation
    elements.explanationText.innerHTML = formatExplanation(explanation)
    
    // Update generation time
    const genTimeEl = document.getElementById('generation-time')
    if (genTimeEl) {
      genTimeEl.textContent = generationTime
    }
    
    // Update model badge with actually used model
    const modelBadge = document.getElementById('model-badge')
    if (modelBadge) {
      // Format the model name nicely
      const modelName = response.modelUsed || CONFIG.GEMINI_MODEL
      const displayName = modelName === 'gemini-1.5-pro' || modelName === 'gemini-1.5-pro-latest' 
        ? 'Gemini 1.5 Pro' 
        : modelName === 'gemini-pro' 
          ? 'Gemini Pro'
          : modelName === 'gemini-1.5-flash'
            ? 'Gemini 1.5 Flash'
            : modelName || 'Gemini AI'
            
      modelBadge.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        ${displayName}
      `
    }
    
    // Show output section
    showSection(elements.outputSection)
    
    // Scroll to results if needed
    if (window.innerWidth < 768) {
      setTimeout(() => {
        elements.outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
    
    // Show success toast
    showToast('Explanation generated successfully!', 'success')
    
    console.log('✅ Explanation generation completed successfully')
    
  } catch (error) {
    console.error('Error explaining text:', error)
    
    // Create a more user-friendly error message based on the error
    let userFriendlyMessage = error.message;
    
    if (error.message.includes('responseType')) {
      userFriendlyMessage = "API configuration error. The system is having trouble processing your request.";
      console.error('Likely issue with responseType parameter in the API call');
    } else if (error.message.includes('API key')) {
      userFriendlyMessage = "API key issue. Please check your API key configuration.";
    } else if (error.message.includes('model') || error.message.includes('gemini-1.5-pro')) {
      userFriendlyMessage = "API model not available. The system is using an unsupported model.";
      console.error('Likely issue with the model name: ' + CONFIG.GEMINI_MODEL);
    }
    
    elements.errorMessage.textContent = userFriendlyMessage
    showSection(elements.errorSection)
    
    // Add error animation
    elements.input.classList.add('error-shake')
    setTimeout(() => {
      elements.input.classList.remove('error-shake')
    }, 500)
    
    // Show error toast
    showToast('Error: ' + userFriendlyMessage, 'error')
    
  } finally {
    // Reset button state
    console.log('🔄 Resetting button state...')
    isProcessing = false
    elements.explainBtn.disabled = false
    elements.explainBtn.querySelector('span').innerHTML = originalBtnContent
    console.log('✅ Button state reset complete')
  }
}

const copyToClipboard = async () => {
  try {
    const text = elements.explanationText.textContent
    await navigator.clipboard.writeText(text)
    
    // Show success feedback
    const originalText = elements.copyBtn.innerHTML
    elements.copyBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      Copied!
    `
    elements.copyBtn.classList.add('text-green-400')
    
    setTimeout(() => {
      elements.copyBtn.innerHTML = originalText
      elements.copyBtn.classList.remove('text-green-400')
    }, 2000)
    
  } catch (error) {
    console.error('Failed to copy text:', error)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = elements.explanationText.textContent
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

// Enhanced Particle System
const createParticleSystem = () => {
  const particlesContainer = document.getElementById('particles')
  if (!particlesContainer) return
  
  // Store particle creation interval for cleanup
  let particleInterval
  
  const createParticle = (theme = 'dark') => {
    const colors = CONFIG.PARTICLE_COLORS[theme]
    
    const particle = document.createElement('div')
    particle.className = 'particle'
    
    // More dynamic particle properties
    const size = 2 + Math.random() * 4 // Larger particles
    const opacity = 0.4 + Math.random() * 0.3 // Vary opacity
    
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.left = Math.random() * 100 + '%'
    particle.style.top = Math.random() * 100 + '%'
    
    // Use chosen theme colors
    const color = colors[Math.floor(Math.random() * colors.length)]
    particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`
    particle.style.opacity = opacity
    
    // Apply GPU-accelerated animations
    particle.style.transform = 'translateZ(0)'
    particle.style.willChange = 'transform, opacity'
    
    // Randomize animation properties
    const duration = (15 + Math.random() * 15) + 's'
    const delay = Math.random() * 5 + 's'
    const initialY = Math.random() * 20 - 10 + 'vh' // Starting at different heights
    
    // Apply animation
    particle.animate([
      { 
        transform: `translate3d(0, ${initialY}, 0)`, 
        opacity: 0 
      },
      { 
        transform: 'translate3d(0, -100vh, 0)', 
        opacity: opacity 
      },
      { 
        transform: 'translate3d(0, -120vh, 0)', 
        opacity: 0 
      }
    ], {
      duration: parseFloat(duration) * 1000,
      delay: parseFloat(delay) * 1000,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      fill: 'forwards'
    })
    
    particlesContainer.appendChild(particle)
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, (parseFloat(duration) + parseFloat(delay) + 1) * 1000)
  }
  
  // Clear and restart particle system
  const resetParticleSystem = (theme) => {
    // Clear existing particles
    particlesContainer.innerHTML = ''
    
    // Clear existing interval
    if (particleInterval) {
      clearInterval(particleInterval)
    }
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createParticle(theme), Math.random() * 3000)
    }
    
    // Continuously create new particles
    particleInterval = setInterval(() => createParticle(theme), 2000)
  }
  
  // Initial setup with current theme
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  resetParticleSystem(currentTheme)
  
  // Listen for theme changes
  document.addEventListener('themeChanged', (e) => {
    resetParticleSystem(e.detail.theme)
  })
  
  return { resetParticleSystem }
}

// Event Listeners
const initializeEventListeners = () => {
  // Explain button click
  elements.explainBtn?.addEventListener('click', explainText)
  
  // Enter key in textarea
  elements.input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      explainText()
    }
  })
  
  // Copy button click
  elements.copyBtn?.addEventListener('click', copyToClipboard)
  
  // Speak button click
  document.getElementById('speak-btn')?.addEventListener('click', speakExplanation)
  
  // Retry button click
  document.getElementById('retry-btn')?.addEventListener('click', () => {
    hideAllSections()
    // Reset button state completely
    isProcessing = false
    elements.explainBtn.disabled = false
    elements.explainBtn.querySelector('span').innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      Explain It
    `
  })
  
  // Theme toggle
  elements.themeToggle?.addEventListener('click', toggleTheme)
  
  // Feedback buttons
  document.getElementById('thumbs-up')?.addEventListener('click', function() {
    this.classList.add('text-cyan-400')
    document.getElementById('thumbs-down')?.classList.remove('text-pink-500')
    showToast('Thanks for your feedback!', 'success')
  })
  
  document.getElementById('thumbs-down')?.addEventListener('click', function() {
    this.classList.add('text-pink-500')
    document.getElementById('thumbs-up')?.classList.remove('text-cyan-400')
    showToast('Thanks for your feedback!', 'info')
  })
  
  // Input validation and character count
  elements.input?.addEventListener('input', (e) => {
    const text = e.target.value
    const charCount = document.getElementById('char-count')
    
    if (charCount) {
      charCount.textContent = `${text.length}/${CONFIG.MAX_INPUT_LENGTH}`
      
      // Change color when approaching limit
      if (text.length > CONFIG.MAX_INPUT_LENGTH * 0.9) {
        charCount.classList.add('text-red-400')
      } else {
        charCount.classList.remove('text-red-400')
      }
    }
    
    if (text.length > CONFIG.MAX_INPUT_LENGTH) {
      e.target.value = text.substring(0, CONFIG.MAX_INPUT_LENGTH)
    }
    
    // Remove error styling when user starts typing
    if (elements.errorSection && !elements.errorSection.classList.contains('hidden')) {
      hideAllSections()
    }
  })
  
  // Auto-resize textarea
  elements.input?.addEventListener('input', function() {
    this.style.height = 'auto'
    this.style.height = Math.min(this.scrollHeight, 300) + 'px'
  })
  
  // Add animated pulse to explain button on initial load
  setTimeout(() => {
    elements.explainBtn?.classList.add('animate-pulse')
    setTimeout(() => {
      elements.explainBtn?.classList.remove('animate-pulse')
    }, 2000)
  }, 1000)
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('explainit-theme') === null) {
      // Only apply if user hasn't manually set a theme
      setTheme(e.matches ? 'dark' : 'light')
    }
  })
}

// Speech synthesis function
const speakExplanation = () => {
  const text = elements.explanationText.textContent
  const speakBtn = document.getElementById('speak-btn')
  
  if ('speechSynthesis' in window) {
    // If already speaking, stop it
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
      speakBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
        </svg>
        Listen
      `
      return
    }
    
    // Update button to show it's active
    speakBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      Stop
    `
    speakBtn.classList.add('text-cyan-400')
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Add event listener for when speech finishes
    utterance.onend = () => {
      speakBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
        </svg>
        Listen
      `
      speakBtn.classList.remove('text-cyan-400')
    }
    
    window.speechSynthesis.speak(utterance)
  } else {
    // Speech synthesis not supported
    showToast('Your browser does not support text-to-speech', 'error')
  }
}

// Toast notification system
const showToast = (message, type = 'info') => {
  // Create toast container if it doesn't exist
  if (!document.getElementById('toast-container')) {
    const toastContainer = document.createElement('div')
    toastContainer.id = 'toast-container'
    toastContainer.className = 'fixed top-4 right-4 z-50 flex flex-col items-end space-y-2'
    document.body.appendChild(toastContainer)
  }
  
  // Create toast element
  const toast = document.createElement('div')
  const bgColor = type === 'success' ? 'bg-green-500/80' : type === 'error' ? 'bg-red-500/80' : 'bg-blue-500/80'
  
  toast.className = `${bgColor} text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm flex items-center transform transition-all duration-300 translate-x-full`
  
  // Icon based on type
  let icon = ''
  if (type === 'success') {
    icon = '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
  } else if (type === 'error') {
    icon = '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
  } else {
    icon = '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  }
  
  toast.innerHTML = `${icon}<span>${message}</span>`
  document.getElementById('toast-container').appendChild(toast)
  
  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-x-full')
  }, 10)
  
  // Animate out and remove after delay
  setTimeout(() => {
    toast.classList.add('translate-x-full')
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 3000)
}

// Theme Functions
const toggleTheme = () => {
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  setTheme(newTheme)
  
  // Save preference to localStorage
  localStorage.setItem('explainit-theme', newTheme)
  
  // Show toast for theme change
  showToast(`Switched to ${newTheme} mode`, 'info')
}

const setTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')
    
    // Update icons
    elements.sunIcon.classList.remove('hidden')
    elements.moonIcon.classList.add('hidden')
  } else {
    document.documentElement.classList.remove('dark')
    document.body.classList.remove('dark')
    
    // Update icons
    elements.sunIcon.classList.add('hidden')
    elements.moonIcon.classList.remove('hidden')
  }
  
  // Dispatch custom event for other components to react
  document.dispatchEvent(new CustomEvent('themeChanged', { 
    detail: { theme }
  }))
}

// Initialize theme
const initializeTheme = () => {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('explainit-theme')
  const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  const initialTheme = savedTheme || (systemDarkMode ? 'dark' : 'light')
  setTheme(initialTheme)
}

// Check environment variables
const checkEnvironment = () => {
  console.log('Checking environment variables...')
  const envVars = {
    VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'Not set',
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME || 'Not set',
    VITE_MAX_INPUT_LENGTH: import.meta.env.VITE_MAX_INPUT_LENGTH || 'Not set',
    NODE_ENV: import.meta.env.MODE || 'Not set',
  }
  
  console.log('Environment variables:', {
    ...envVars,
    VITE_GEMINI_API_KEY: envVars.VITE_GEMINI_API_KEY === 'Not set' 
      ? 'Not set' 
      : `Set (${envVars.VITE_GEMINI_API_KEY.substring(0, 5)}...${envVars.VITE_GEMINI_API_KEY.slice(-4)})`
  })
  
  return envVars.VITE_GEMINI_API_KEY !== 'Not set' && envVars.VITE_GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE'
}

// App Initialization
const initializeApp = () => {
  console.log('🚀 ExplainIt - The Jargon Buster initialized!')
  
  // Check environment variables
  const isApiKeySet = checkEnvironment()
  
  // Initialize theme
  initializeTheme()
  
  // Initialize event listeners
  initializeEventListeners()
  
  // Create particle system
  createParticleSystem()
  
  // Add some example text to help users get started
  if (elements.input) {
    elements.input.focus()
  }
  
  // Check if API key is configured
  if (!isApiKeySet) {
    console.warn('⚠️ Demo mode: Add your Gemini API key to .env file for real AI explanations')
    showToast('⚠️ Running in demo mode. Add your Gemini API key in .env file for real AI results.', 'warning')
  } else {
    console.log('✅ API key configured')
  }
}

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  initializeApp()
}
