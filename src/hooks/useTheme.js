import { useState, useEffect } from 'react'

export const useTheme = (defaultTheme = 'dark') => {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('app-theme')
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme(defaultTheme)
    }
  }, [defaultTheme])

  const applyTheme = (newTheme) => {
    const htmlElement = document.documentElement
    if (newTheme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
    localStorage.setItem('app-theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return { theme, toggleTheme }
}
