import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

const ActionCard = ({ title, description, linkTo }) => {
  return (
    <Link to={linkTo} className="block">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover flex items-center">
        <div className="mr-4 bg-pink-100 p-2 rounded-full">
          <Plus className="w-5 h-5 text-pink-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default ActionCard
