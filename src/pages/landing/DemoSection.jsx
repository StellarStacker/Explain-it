import React from 'react'

const inputText = `"The implementation leverages a microservices architecture with containerized deployments orchestrated through Kubernetes, utilizing asynchronous message queuing patterns for inter-service communication."`

const outputLines = [
  { term: 'Microservices architecture', explain: 'Building separate small programs that each do one job well' },
  { term: 'Containerized deployments', explain: 'Each program lives in its own protective box so they don\'t interfere' },
  { term: 'Kubernetes', explain: 'A smart manager that handles all these boxes automatically' },
  { term: 'Asynchronous message queuing', explain: 'Programs leave messages for each other, like notes in mailboxes' },
]

export const DemoSection = () => (
  <section id="demo" className="py-24 px-4 relative">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
          <svg className="w-3.5 h-3.5 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">Live Preview</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">See It in Action</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">Watch how ExplainIt breaks down a complex technical paragraph into digestible pieces.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Card */}
        <div className="demo-card">
          <div className="demo-card-header">
            <div className="demo-dot bg-red-500/80" />
            <div className="demo-dot bg-yellow-500/80" />
            <div className="demo-dot bg-green-500/80" />
            <span className="ml-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Input</span>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Complex Text</span>
            </div>
            <p className="text-sm text-gray-300 dark:text-gray-300 leading-relaxed italic">{inputText}</p>
          </div>
        </div>

        {/* Output Card */}
        <div className="demo-card">
          <div className="demo-card-header">
            <div className="demo-dot bg-red-500/80" />
            <div className="demo-dot bg-yellow-500/80" />
            <div className="demo-dot bg-green-500/80" />
            <span className="ml-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Simplified</span>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Explanation</span>
            </div>
            <p className="text-sm text-gray-300 dark:text-gray-300 mb-4">Think of this like building with LEGO blocks instead of one giant piece:</p>
            <div className="space-y-3">
              {outputLines.map((line, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 12.75L11.25 15 15 9.75"/></svg>
                  <span>
                    <span className="font-semibold text-purple-300">{line.term}</span>
                    <span className="text-gray-400"> = {line.explain}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
