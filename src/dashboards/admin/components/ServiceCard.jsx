import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const ServiceCard = ({ title, description, icon, linkTo, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
      <div className="flex justify-between items-start mb-4">
        <div className={`text-${iconColor || "pink-500"}`}>{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <Link to={linkTo} className="inline-flex items-center text-sm text-pink-500 hover:text-pink-600">
        Manage
        <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  )
}

export default ServiceCard
