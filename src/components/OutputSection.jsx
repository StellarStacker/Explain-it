import React, { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSpeech } from '../utils/speechSynthesis'

// Custom markdown components for enhanced readability
const markdownComponents = {
  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 mt-6 text-cyan-700 dark:text-cyan-300 border-b-2 border-cyan-300/30 pb-2" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 mt-5 text-cyan-600 dark:text-cyan-400" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-3 mt-4 text-purple-600 dark:text-purple-400" {...props} />,
  h4: ({ node, ...props }) => <h4 className="text-base font-bold mb-2 mt-3 text-purple-500 dark:text-purple-400" {...props} />,
  p: ({ node, ...props }) => <p className="mb-5 leading-8 text-gray-900 dark:text-gray-100" {...props} />,
  ul: ({ node, ...props }) => <ul className="mb-5 ml-6 space-y-3 list-disc" {...props} />,
  ol: ({ node, ...props }) => <ol className="mb-5 ml-6 space-y-3 list-decimal" {...props} />,
  li: ({ node, ...props }) => <li className="text-gray-900 dark:text-gray-100 marker:text-cyan-600 dark:marker:text-cyan-400 marker:font-bold" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="my-6 border-l-4 border-cyan-500 dark:border-cyan-400 bg-cyan-50/50 dark:bg-cyan-900/20 px-5 py-3 rounded-r-lg italic text-gray-800 dark:text-gray-200" {...props} />
  ),
  code: ({ inline, ...props }) => 
    inline ? (
      <code className="bg-gradient-to-r from-cyan-100/80 to-purple-100/80 dark:from-cyan-900/50 dark:to-purple-900/50 px-2 py-1 rounded-md text-xs font-mono text-cyan-700 dark:text-cyan-300 font-semibold" {...props} />
    ) : (
      <code className="block bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto my-5 font-mono text-sm leading-relaxed border border-gray-700" {...props} />
    ),
  pre: ({ node, ...props }) => <pre className="my-5 rounded-lg overflow-x-auto" {...props} />,
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-5">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="bg-cyan-600/20 dark:bg-cyan-900/50" {...props} />,
  th: ({ node, ...props }) => <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-bold text-cyan-700 dark:text-cyan-300" {...props} />,
  td: ({ node, ...props }) => <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-100/40 dark:bg-cyan-900/30 px-1 rounded" {...props} />,
  em: ({ node, ...props }) => <em className="italic text-purple-600 dark:text-purple-400 not-italic font-medium" {...props} />,
  a: ({ node, ...props }) => <a className="text-cyan-600 dark:text-cyan-400 underline hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
  hr: ({ node, ...props }) => <hr className="my-6 border-t-2 border-gradient-to-r from-cyan-300/30 to-purple-300/30 dark:from-cyan-700/30 dark:to-purple-700/30" {...props} />,
}

export const OutputSection = ({ 
  output, 
  generationTime, 
  onCopy,
  onFeedback 
}) => {
  const [copied, setCopied] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const { speak, cancel } = useSpeech()
  const speechControlRef = useRef(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    if (onCopy) onCopy()
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSpeak = () => {
    try {
      if (isSpeaking) {
        // Stop speaking
        cancel()
        setIsSpeaking(false)
        return
      }

      // Start speaking
      speak(
        output,
        () => {
          console.log('Speak started from component')
          setIsSpeaking(true)
        },
        () => {
          console.log('Speak ended from component')
          setIsSpeaking(false)
        },
        (error) => {
          console.error('Speak error from component:', error)
          // Don't show error for "interrupted" since that's normal when user clicks stop
          if (error !== 'interrupted') {
            setIsSpeaking(false)
          }
        }
      )
    } catch (error) {
      console.error('Error in handleSpeak:', error)
      setIsSpeaking(false)
    }
  }

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 animate-fade-in">
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10">
        {/* Output Label */}
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Simplified Explanation:
        </label>

        {/* Output Text */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-cyan-50/50 to-purple-50/50 dark:from-cyan-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-cyan-200/30 dark:border-cyan-800/30">
            <div className="text-gray-900 dark:text-gray-100 leading-8">
              <ReactMarkdown components={markdownComponents}>{output}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Action Buttons and Info */}
        <div className="mt-6 pt-6 border-t border-gray-300/30 dark:border-white/10 flex flex-wrap justify-between items-center text-xs text-gray-600 dark:text-gray-400 gap-3">
          <div className="flex items-center gap-4">
            <div>
              Generated in <span className="text-cyan-600 dark:text-cyan-400 font-medium">{generationTime.toFixed(2)}</span> seconds
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onFeedback?.('up')}
                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-400"
                title="This was helpful"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v-6a1.5 1.5 0 01-3 0v6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                </svg>
              </button>
              <button 
                onClick={() => onFeedback?.('down')}
                className="hover:text-pink-500 transition-colors text-gray-600 dark:text-gray-400"
                title="This wasn't helpful"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 9.5a1.5 1.5 0 11-3 0v6a1.5 1.5 0 013 0v-6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.641a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-gray-200/80 dark:bg-gray-800/50 hover:bg-gray-300/80 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-cyan-500/20 hover:shadow-md text-gray-700 dark:text-white"
              title="Copy to clipboard"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              {copied ? 'Copied!' : 'Copy'}
            </button>

            <button
              onClick={handleSpeak}
              disabled={!output}
              className="px-3 py-1.5 bg-gray-200/80 dark:bg-gray-800/50 hover:bg-gray-300/80 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-cyan-500/20 hover:shadow-md text-gray-700 dark:text-white"
              title={isSpeaking ? "Click to stop speaking" : "Click to speak explanation"}
            >
              {isSpeaking ? (
                <>
                  <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm-4 4a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                  </svg>
                  Stop
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2v8a1 1 0 001 1h1a1 1 0 100-2v-8a1 1 0 00-1-1H9z"></path>
                    <path d="M14.935 7.35A4 4 0 0016 4a1 1 0 00-1-1 7 7 0 00-6 6V9a1 1 0 000 2 1 1 0 001 1h1a1 1 0 100-2v-2a5 5 0 015 5v2a1 1 0 01-1 1H9a1 1 0 110-2h1v-2a3 3 0 00-3-3 1 1 0 00-1 1v2a1 1 0 11-2 0v-2a5 5 0 015-5 1 1 0 001-1v-1z"></path>
                  </svg>
                  Speak
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
