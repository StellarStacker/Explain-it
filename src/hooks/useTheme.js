import { useEffect } from 'react'

export const useTheme = () => {
  useEffect(() => {
    // Always apply dark mode
    const htmlElement = document.documentElement
    htmlElement.classList.add('dark')
  }, [])

  return { theme: 'dark' }
}
