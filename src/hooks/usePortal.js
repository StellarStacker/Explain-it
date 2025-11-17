import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const usePortal = (component) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  
  return createPortal(component, document.body)
}
