function StatCard({ title, value, icon, color }) {
  const getColorClasses = () => {
    switch (color) {
      case "pink":
        return { bg: "bg-pink-100", text: "text-pink-500" }
      case "purple":
        return { bg: "bg-purple-100", text: "text-purple-500" }
      case "blue":
        return { bg: "bg-blue-100", text: "text-blue-500" }
      case "green":
        return { bg: "bg-green-100", text: "text-green-500" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-500" }
    }
  }

  const { bg, text } = getColorClasses()

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${bg} ${text} mr-4`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default StatCard