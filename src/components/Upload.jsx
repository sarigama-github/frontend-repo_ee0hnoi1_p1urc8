import { useState } from 'react'

export default function Upload({ onAnalyzed }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [progressText, setProgressText] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleUpload = async (e) => {
    e.preventDefault()
    setError('')
    if (!file) {
      setError('Please choose a paper file (PDF, DOCX, or TXT).')
      return
    }

    try {
      setLoading(true)
      setProgressText('Uploading and analyzing your paper...')
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`${backend}/api/analyze`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || 'Upload failed')
      }
      const data = await res.json()
      onAnalyzed?.(data)
      setProgressText('Analysis complete!')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
      setTimeout(() => setProgressText(''), 1500)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-white/70 backdrop-blur">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
            id="paperFile"
          />
          <label htmlFor="paperFile" className="cursor-pointer block">
            <div className="text-gray-700">
              <div className="text-lg font-semibold">Drop your paper here</div>
              <div className="text-sm text-gray-500">PDF, DOCX, or TXT</div>
            </div>
            {file && (
              <div className="mt-3 text-sm text-gray-600">Selected: {file.name}</div>
            )}
          </label>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {progressText && <div className="text-blue-600 text-sm">{progressText}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg shadow"
        >
          {loading ? 'Analyzing…' : 'Analyze Paper'}
        </button>
      </form>
    </div>
  )
}
