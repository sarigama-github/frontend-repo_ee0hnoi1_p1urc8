import { useState, useEffect } from 'react'
import Upload from './components/Upload'
import Results from './components/Results'

function App() {
  const [result, setResult] = useState(null)

  useEffect(() => {
    document.title = 'PaperPolish — Improve Research Papers'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">PaperPolish</div>
          <div className="text-slate-300 text-sm">Private • Secure • Simple</div>
        </div>
        <h1 className="mt-10 text-4xl md:text-5xl font-semibold leading-tight">
          Upload your paper. Get clear, actionable suggestions.
        </h1>
        <p className="mt-4 text-slate-300 max-w-2xl">
          A clean, high‑tech assistant that reviews structure, clarity, and completeness — designed for busy researchers.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-white/10 rounded-2xl p-6 shadow-xl ring-1 ring-white/10">
          <div className="text-slate-200 mb-4 font-medium">Upload your paper</div>
          <Upload onAnalyzed={setResult} />
        </div>
        <Results result={result} />
      </main>

      <footer className="max-w-4xl mx-auto px-6 pb-10 text-slate-400 text-sm">
        No data is shared externally. You can remove your analysis anytime.
      </footer>
    </div>
  )
}

export default App
