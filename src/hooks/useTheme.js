import { useState, useEffect } from 'react'

export const useTheme = () => {
  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.classList.add('dark')
  }, [])

  return { theme: 'dark' }
}
