import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Clock, CheckCircle, X, AlertTriangle, Coffee, UtensilsCrossed, Utensils, Wine } from "lucide-react"
import { mockOrders } from "../data/mockData"

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newStatus, setNewStatus] = useState("")

  useEffect(() => {
    // In a real app, you would fetch data from an API
    const foundOrder = mockOrders.find((o) => o.id === id)
    setOrder(foundOrder || null)
    if (foundOrder) {
      setNewStatus(foundOrder.status)
    }
    setLoading(false)
  }, [id])

  const handleStatusChange = (status) => {
    setNewStatus(status)
    setOrder({
      ...order,
      status,
    })
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

  const getTypeIcon = (type) => {
    switch (type) {
      case "breakfast":
        return <Coffee className="h-5 w-5 text-orange-500" />
      case "lunch":
        return <UtensilsCrossed className="h-5 w-5 text-green-500" />
      case "dinner":
        return <Utensils className="h-5 w-5 text-purple-500" />
      case "drinks":
        return <Wine className="h-5 w-5 text-blue-500" />
      case "party":
        return <UtensilsCrossed className="h-5 w-5 text-pink-500" />
      default:
        return <Utensils className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeClass = (type) => {
    switch (type) {
      case "breakfast":
        return "bg-orange-100 text-orange-800"
      case "lunch":
        return "bg-green-100 text-green-800"
      case "dinner":
        return "bg-purple-100 text-purple-800"
      case "drinks":
        return "bg-blue-100 text-blue-800"
      case "party":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/headCook/all-orders")}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" /> Back to Orders
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/head-cook")}
            className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Return to Orders
          </button>
        </div>
      </div>
    )
  }

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate("/headCook/all-orders")} className="btn-primary flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-1" /> Back to Orders
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Order #{order.id}</h1>
              <p className="text-gray-600">
                Placed on {new Date(order.orderDate).toLocaleDateString()} at{" "}
                {new Date(order.orderDate).toLocaleTimeString()}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <span
                className={`px-3 py-1 inline-flex items-center text-sm font-semibold rounded-full ${getTypeClass(order.type)}`}
              >
                {getTypeIcon(order.type)}
                <span className="ml-1 capitalize">{order.type}</span>
              </span>
              <span
                className={`px-3 py-1 inline-flex items-center text-sm font-semibold rounded-full ${getStatusClass(order.status)}`}
              >
                {getStatusIcon(order.status)}
                <span className="ml-1 capitalize">{order.status}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="divide-y">
                {order.items.map((item, index) => (
                  <div key={index} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between font-medium">
                  <span>Total Items:</span>
                  <span>{totalItems}</span>
                </div>
              </div>
            </div>

            {order.specialInstructions && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Special Instructions</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>{order.specialInstructions}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Voyager Information</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-semibold mr-3">
                  {order.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium">{order.userName}</p>
                  <p className="text-sm text-gray-500">Cabin {order.cabinNumber}</p>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-4">Update Status</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <button
                  onClick={() => handleStatusChange("pending")}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${newStatus === "pending" ? "bg-yellow-100 text-yellow-800" : "hover:bg-gray-100"}`}
                >
                  <Clock className="h-5 w-5 mr-2 text-yellow-500" />
                  Pending
                </button>
                <button
                  onClick={() => handleStatusChange("preparing")}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${newStatus === "preparing" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"}`}
                >
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  Preparing
                </button>
                <button
                  onClick={() => handleStatusChange("prepared")}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${newStatus === "prepared" ? "bg-green-100 text-green-800" : "hover:bg-gray-100"}`}
                >
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Prepared
                </button>
                <button
                  onClick={() => handleStatusChange("cancelled")}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${newStatus === "cancelled" ? "bg-red-100 text-red-800" : "hover:bg-gray-100"}`}
                >
                  <X className="h-5 w-5 mr-2 text-red-500" />
                  Cancelled
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
