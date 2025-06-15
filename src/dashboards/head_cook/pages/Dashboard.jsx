import { Link } from "react-router-dom"
import { useOrders } from "../context/OrderContext"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { StatusIcons, TypeIcons } from "../components/Icons"
import { ArrowRight, Beer, Coffee, CupSoda, Sandwich, Utensils, UtensilsCrossed } from "lucide-react"


const Dashboard = () => {
  const { orders } = useOrders()

  const pendingCount = orders.filter((order) => order.status === "Pending").length
  const preparingCount = orders.filter((order) => order.status === "Preparing").length
  const preparedCount = orders.filter((order) => order.status === "Prepared").length

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time))
    .slice(0, 5)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ name: "Emma Johnson", role: "Head Cook" }} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-pink-500">Head Cook Dashboard</h1>
            <p className="text-gray-600">Manage food preparation and catering orders for voyagers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* All Catering Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-pink-500 mb-4">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Catering Orders</h3>
              <p className="text-gray-600 mb-4">
                View and manage all food orders from voyagers. Track preparation status and delivery details.
              </p>
              <Link to="/headCook/all-orders" className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium">
                View Orders
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Breakfast Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-pink-500 mb-4">
              <Coffee className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Breakfast Orders</h3>
              <p className="text-gray-600 mb-4">
                Manage breakfast orders including continental, American, and healthy options.
              </p>
              <Link
                to="/headCook/all-orders"
                className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium">
                View Orders
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Lunch Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-pink-500 mb-4">
                <Sandwich className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Lunch Orders</h3>
              <p className="text-gray-600 mb-4">
                View and prepare lunch orders from voyagers. Includes salads, sandwiches, and hot meals.
              </p>
              <Link
                to="/headCook/all-orders"
                className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium">
                View Orders
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Dinner Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-pink-500 mb-4">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dinner Orders</h3>
              <p className="text-gray-600 mb-4">
                Manage dinner orders including seafood, steaks, and vegetarian options.
              </p>
              <Link
                to="/headCook/all-orders"
                className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium">
                View Orders
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Drink Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-pink-500 mb-4">
                <CupSoda className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Drink Orders</h3>
              <p className="text-gray-600 mb-4">
                Manage drink orders including cocktails, mocktails, and specialty beverages.
              </p>
              <Link
                to="/headCook/all-orders"
                className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium">
                View Orders
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Party Hall Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-pink-500 mb-4">
                <Beer className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Party Hall Orders</h3>
              <p className="text-gray-600 mb-4">Manage catering for party hall events and special celebrations.</p>
              <Link
                to="/headCook/party-hall-orders"
                className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium">
                View Orders
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Recent Orders Section */}
          {/* <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Voyager
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => {
                    const StatusIcon = StatusIcons[order.status]
                    const TypeIcon = TypeIcons[order.type]

                    const statusColors = {
                      Pending: "bg-yellow-100 text-yellow-800",
                      Preparing: "bg-blue-100 text-blue-800",
                      Prepared: "bg-green-100 text-green-800",
                      Cancelled: "bg-red-100 text-red-800",
                    }

                    return (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.voyager.name}</div>
                          <div className="text-sm text-gray-500">Cabin {order.voyager.cabin}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <TypeIcon className="h-5 w-5 mr-1" />
                            <span>{order.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                          >
                            <StatusIcon className="h-4 w-4 mr-1" />
                            {order.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link to={`/headCook/order/${order.id}`} className="text-pink-600 hover:text-pink-800">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-right">
              <Link to="/all-orders" className="text-pink-600 hover:text-pink-800 font-medium">
                View All Orders →
              </Link>
            </div>
          </div> */}

        </main>
      </div>
    </div>
  )
}

export default Dashboard
