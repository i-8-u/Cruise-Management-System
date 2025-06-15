function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-white-800"
      case "prepared":
        return "bg-green-100 text-green-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = () => {
    switch (status.toLowerCase()) {
      case "prepared":
        return (
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "preparing":
        return (
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path d="M12 6V12L16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "pending":
        return (
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path d="M12 8V12" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 16H12.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      case "cancelled":
        return (
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 6L18 18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {getStatusIcon()}
      {status}
    </span>
  )
}

export default StatusBadge
