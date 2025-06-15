import { useState, useEffect } from "react"
import { Search, Filter, CheckCircle, Clock, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { mockOrders } from "../data/mockData"

const DrinkOrders = () => {
  const location = useLocation()
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [orderType, setOrderType] = useState("all")

  // Determine order type based on current path
  useEffect(() => {
    let type = "all"
    if (location.pathname === "/breakfast-orders") type = "breakfast"
    else if (location.pathname === "/lunch-orders") type = "lunch"
    else if (location.pathname === "/dinner-orders") type = "dinner"
    else if (location.pathname === "/drink-orders") type = "drinks"
    else if (location.pathname === "/party-orders") type = "party"

    setOrderType(type)
  }, [location])

  useEffect(() => {
    // In a real app, you would fetch data from an API
    let filteredByType = mockOrders

    if (orderType !== "all") {
      filteredByType = mockOrders.filter((order) => order.type === orderType)
    }

    setOrders(filteredByType)
    setFilteredOrders(filteredByType)
  }, [orderType])

  useEffect(() => {
    let result = orders

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(result)
  }, [searchTerm, statusFilter, orders])

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "preparing":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "prepared":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "prepared":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-500 mb-2">Drink Orders</h1>
      <p className="text-gray-600 mb-6">
        Manage and prepare drink orders for voyagers
      </p>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders by name or item..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-gray-400" />
          <select
            className="border rounded-lg px-4 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="prepared">Prepared</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Voyager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                          {order.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{order.userName}</div>
                          <div className="text-sm text-gray-500">Cabin {order.cabinNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{new Date(order.orderDate).toLocaleDateString()}</div>
                      <div className="text-xs">{new Date(order.orderDate).toLocaleTimeString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <ul className="text-sm text-gray-500">
                        {order.items.map((item, index) => (
                          <li key={index} className="mb-1">
                            {item.quantity}x {item.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}
                      >
                        <span className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {order.status === "pending" && (
                          <button
                            onClick={() => handleStatusChange(order.id, "preparing")}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded"
                          >
                            Start Preparing
                          </button>
                        )}
                        {order.status === "preparing" && (
                          <button
                            onClick={() => handleStatusChange(order.id, "prepared")}
                            className="text-green-600 hover:text-green-900 bg-green-50 px-2 py-1 rounded"
                          >
                            Mark Prepared
                          </button>
                        )}
                        {(order.status === "pending" || order.status === "preparing") && (
                          <button
                            onClick={() => handleStatusChange(order.id, "cancelled")}
                            className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded"
                          >
                            Cancel
                          </button>
                        )}
                        <Link
                          to={`/headCook/order/${order.id}`}
                          className="text-pink-600 hover:text-pink-900 bg-pink-50 px-2 py-1 rounded"
                        >
                          View Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DrinkOrders