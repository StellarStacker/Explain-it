import { useState, useCallback } from 'react'
import { CONFIG } from '../config.js'

export const useExplainer = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState(null)

  const MAX_INPUT_LENGTH = CONFIG.MAX_INPUT_LENGTH
  const BACKEND_URL = CONFIG.BACKEND_URL || 'http://localhost:8080'

  const validateInput = useCallback((text) => {
    if (!text.trim()) {
      throw new Error('Please enter some text to explain')
    }
    if (text.length > MAX_INPUT_LENGTH) {
      throw new Error(`Text is too long. Please keep it under ${MAX_INPUT_LENGTH} characters.`)
    }
  }, [MAX_INPUT_LENGTH])

  const explain = useCallback(async () => {
    try {
      setError('')
      setOutput('')
      validateInput(input)
      setIsLoading(true)

      // Call backend API for generation
      const response = await fetch(`${BACKEND_URL}/api/ai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input })
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(errorData || `API request failed with status ${response.status}`)
      }

      const generatedText = await response.text()

      if (!generatedText) {
        throw new Error('No response text received from API')
      }

      setOutput(generatedText)
      setFeedback(null)
    } catch (err) {
      console.error('Error in explain:', err)
      setError(err.message || 'An error occurred')
      setOutput('')
    } finally {
      setIsLoading(false)
    }
  }, [input, validateInput, BACKEND_URL])

  const clearInput = useCallback(() => {
    setInput('')
    setOutput('')
    setError('')
  }, [])

  return {
    input,
    setInput,
    output,
    isLoading,
    error,
    feedback,
    setFeedback,
    explain,
    clearInput,
  }
}
