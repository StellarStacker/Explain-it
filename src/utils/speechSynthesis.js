// Speech Synthesis Utility
export const useSpeech = () => {
  let currentUtterance = null

  const speak = (text, onStart, onEnd, onError) => {
    try {
      // Check browser support
      if (!('speechSynthesis' in window)) {
        throw new Error('Speech synthesis not supported')
      }

      const synth = window.speechSynthesis
      
      // Cancel any existing speech first
      synth.cancel()
      
      // Wait a bit for cancel to complete
      setTimeout(() => {
        // Clean the text for better audio output
        const cleanText = text
          .replace(/\*\*/g, '') // Remove markdown bold
          .replace(/##/g, '') // Remove markdown headers
          .replace(/\n+/g, ' ') // Replace multiple newlines with single space
          .trim()

        if (!cleanText) {
          throw new Error('No text to speak')
        }

        // Create utterance
        const utterance = new SpeechSynthesisUtterance(cleanText)
        
        // Configure utterance with minimal settings
        utterance.rate = 1
        utterance.pitch = 1
        utterance.volume = 1
        utterance.lang = 'en-US'

        // Don't set voice initially - let browser choose default
        // Get voices only if available
        const voices = synth.getVoices()
        if (voices && voices.length > 0) {
          // Find a good English voice
          const englishVoice = voices.find(v => 
            v.lang === 'en-US' || v.lang.startsWith('en-US')
          ) || voices.find(v => v.lang.startsWith('en')) || voices[0]
          
          if (englishVoice) {
            utterance.voice = englishVoice
          }
        }

        // Event handlers - simple and robust
        utterance.onstart = () => {
          if (onStart) onStart()
        }

        utterance.onend = () => {
          if (onEnd) onEnd()
          currentUtterance = null
        }

        utterance.onerror = (event) => {
          if (event.error !== 'interrupted') {
            if (onError) onError(event.error)
          }
          currentUtterance = null
        }

        currentUtterance = utterance
        
        // Start speaking
        synth.speak(utterance)
      }, 100)

      return {
        stop: () => {
          console.log('Stopping speech')
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
            currentUtterance = null
          }
        }
      }

    } catch (error) {
      console.error('Speech synthesis setup error:', error.message)
      if (onError) onError(error.message)
      throw error
    }
  }

  const cancel = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      currentUtterance = null
    }
  }

  const isSpeaking = () => {
    return (window.speechSynthesis && window.speechSynthesis.speaking) || currentUtterance !== null
  }

  return { speak, cancel, isSpeaking }
}

