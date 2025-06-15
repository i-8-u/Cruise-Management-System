import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

function ServiceCard({ icon, title, description, linkTo }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="text-pink-500 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <Link to={linkTo} className="inline-flex items-center text-pink-500 text-sm font-medium">
        Book Now
        <ArrowRight className="ml-1 w-4 h-4" />
      </Link>
    </div>
  )
}

export default ServiceCard
