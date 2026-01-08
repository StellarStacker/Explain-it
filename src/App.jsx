import React from 'react'
import { Header } from './components/Header'
import { InputSection } from './components/InputSection'
import { OutputSection } from './components/OutputSection'
import { LoadingSection } from './components/LoadingSection'
import { ErrorSection } from './components/ErrorSection'
import { Footer } from './components/Footer'
import { BackgroundEffects } from './components/BackgroundEffects'
import { useTheme } from './hooks/useTheme'
import { useExplainer } from './hooks/useExplainer'
import { CONFIG } from './config'
import './style.css'

export default function App() {
  const MAX_INPUT_LENGTH = CONFIG.MAX_INPUT_LENGTH
  useTheme()
  const {
    input,
    setInput,
    output,
    isLoading,
    error,
    feedback,
    setFeedback,
    explain,
    clearInput
  } = useExplainer()

  const handleFeedback = (type) => {
    setFeedback(type)
    // You can send this feedback to analytics or a server
  }

  return (
    <div className="dark relative min-h-screen">
      <BackgroundEffects />

      {/* Main App Container */}
      <div id="app" className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          {/* Input Section */}
          <InputSection
            input={input}
            onInputChange={setInput}
            onExplain={explain}
            isLoading={isLoading}
            maxLength={MAX_INPUT_LENGTH}
          />

          {/* Conditional Rendering of Output Sections */}
          {error && (
            <ErrorSection
              error={error}
              onRetry={clearInput}
            />
          )}

          {isLoading && (
            <LoadingSection />
          )}

          {output && !isLoading && (
            <OutputSection
              output={output}
              onCopy={() => {}}
              onFeedback={handleFeedback}
            />
          )}

          {/* Initial State Message */}
          {!output && !isLoading && !error && (
            <div className="mt-12 max-w-4xl mx-auto px-4 text-center text-gray-400 py-8">
              <p>Enter some complex text above and click "Explain It" to get started!</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
