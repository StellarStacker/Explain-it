import { useState, useCallback } from 'react'
import { callGeminiAPI } from '../api.js'
import { CONFIG } from '../config.js'

export const useExplainer = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [generationTime, setGenerationTime] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const MAX_INPUT_LENGTH = CONFIG.MAX_INPUT_LENGTH

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

      const startTime = performance.now()
      const response = await callGeminiAPI(input)
      const endTime = performance.now()

      setGenerationTime((endTime - startTime) / 1000)
      
      // Extract the text from the API response
      let extractedText = ''
      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0]
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          extractedText = candidate.content.parts[0].text || ''
        }
      }
      
      if (!extractedText) {
        throw new Error('No response text received from API')
      }
      
      setOutput(extractedText)
      setFeedback(null)
    } catch (err) {
      console.error('Error in explain:', err)
      setError(err.message || 'An error occurred')
      setOutput('')
    } finally {
      setIsLoading(false)
    }
  }, [input, validateInput])

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
    generationTime,
    feedback,
    setFeedback,
    explain,
    clearInput,
  }
}
