export default function QuoteSkeleton() {
  return (
    <div className="border rounded-xl p-4 animate-pulse bg-muted">
      <div className="h-4 w-3/4 bg-gray-300 rounded mb-3" />
      <div className="h-4 w-full bg-gray-300 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-300 rounded mb-4" />

      <div className="flex justify-between mt-4">
        <div className="h-6 w-16 bg-gray-300 rounded" />
        <div className="h-6 w-6 bg-gray-300 rounded-full" />
      </div>
    </div>
  )
}
