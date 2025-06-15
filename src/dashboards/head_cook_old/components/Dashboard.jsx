import { Link } from "react-router-dom"
import { Utensils, Coffee, UtensilsCrossed, Wine, ArrowRight, Sandwich, CupSoda, Beer } from "lucide-react"

const Dashboard = () => {

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-500 mb-2">Head Cook Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage food preparation and catering orders for voyagers</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4"><Utensils className="w-6 h-6 text-pink-500" /></div>
            <h2 className="text-xl font-semibold mb-2">All Catering Orders</h2>
            <p className="text-gray-600 mb-4">View and manage all food orders from voyagers. Track preparation status and delivery details.</p>
            <Link to={`/headCook/all-orders`} className="inline-flex items-center text-pink-500 hover:text-pink-600">
              View Orders <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4"><Coffee className="w-6 h-6 text-pink-500" /></div>
            <h2 className="text-xl font-semibold mb-2">Breakfast Orders</h2>
            <p className="text-gray-600 mb-4">Manage breakfast orders including continental, American, and healthy options.</p>
            <Link to={`/headCook/breakfast-orders`} className="inline-flex items-center text-pink-500 hover:text-pink-600">
              View Orders <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4"><Sandwich className="w-6 h-6 text-pink-500" /></div>
            <h2 className="text-xl font-semibold mb-2">Lunch Orders</h2>
            <p className="text-gray-600 mb-4">View and prepare lunch orders from voyagers. Includes salads, sandwiches, and hot meals.</p>
            <Link to={`/headCook/lunch-orders`} className="inline-flex items-center text-pink-500 hover:text-pink-600">
              View Orders <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4"><UtensilsCrossed className="w-6 h-6 text-pink-500" /></div>
            <h2 className="text-xl font-semibold mb-2">Dinner Orders</h2>
            <p className="text-gray-600 mb-4">Manage breakfast orders including continental, American, and healthy options.</p>
            <Link to={`/headCook/dinner-orders`} className="inline-flex items-center text-pink-500 hover:text-pink-600">
              View Orders <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4"><CupSoda className="w-6 h-6 text-pink-500" /></div>
            <h2 className="text-xl font-semibold mb-2">Drink Orders</h2>
            <p className="text-gray-600 mb-4">Manage dinner orders including seafood, steaks, and vegetarian options.</p>
            <Link to={`/headCook/drink-orders`} className="inline-flex items-center text-pink-500 hover:text-pink-600">
              View Orders <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4"><Beer className="w-6 h-6 text-pink-500" /></div>
            <h2 className="text-xl font-semibold mb-2">Party Hall Orders</h2>
            <p className="text-gray-600 mb-4">Manage catering for party hall events and special celebrations.</p>
            <Link to={`/headCook/party-orders`} className="inline-flex items-center text-pink-500 hover:text-pink-600">
              View Orders <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
