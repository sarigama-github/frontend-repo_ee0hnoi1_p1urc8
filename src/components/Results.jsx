export default function Results({ result }) {
  if (!result) return null
  return (
    <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{result.title}</h3>
        <p className="text-sm text-gray-500">Personalized recommendations</p>
      </div>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        {result.recommendations?.length ? (
          result.recommendations.map((r, i) => (
            <li key={i}>{r}</li>
          ))
        ) : (
          <li>No specific recommendations — looks good!</li>
        )}
      </ul>
      <a
        href="/test"
        className="inline-block text-sm text-blue-600 hover:text-blue-700"
      >
        Check system status
      </a>
    </div>
  )
}
