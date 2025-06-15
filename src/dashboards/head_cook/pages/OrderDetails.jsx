"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useOrders } from "../context/OrderContext"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { StatusIcons, TypeIcons } from "../components/Icons"

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getOrderById, updateOrderStatus } = useOrders()

  const order = getOrderById(id)

  if (!order) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={{ name: "Emma Johnson", role: "Head Cook" }} />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-gray-900">Order not found</h2>
              <p className="mt-2 text-gray-600">The order you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => navigate("/all-orders")}
                className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              >
                Back to Orders
              </button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const StatusIcon = StatusIcons[order.status]
  const TypeIcon = TypeIcons[order.type]

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Preparing: "bg-blue-100 text-blue-800",
    Prepared: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  }

  const handleStatusChange = (newStatus) => {
    updateOrderStatus(order.id, newStatus)
  }

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ name: "Emma Johnson", role: "Head Cook" }} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-gray-600 hover:text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
              <p className="text-gray-600">
                Placed on {order.date} at {order.time}
              </p>
            </div>
            <div className="flex space-x-2">
              <div className="flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800">
                <TypeIcon className="h-5 w-5 mr-1" />
                <span>{order.type}</span>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                <StatusIcon className="h-5 w-5 mr-1" />
                <span>{order.status}</span>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>

                {order.items.map((item, index) => (
                  <div key={index} className="mb-4 pb-4 border-b last:border-0">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                ))}

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <span className="font-medium">Total Items:</span>
                  <span className="font-bold">{totalItems}</span>
                </div>
              </div>

              {order.specialInstructions && (
                <div className="bg-white rounded-lg shadow p-6 mt-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Special Instructions</h2>
                  <p className="text-gray-600">{order.specialInstructions}</p>
                </div>
              )}
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Voyager Information</h2>

                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold mr-4">
                    {order.voyager.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{order.voyager.name}</h3>
                    <p className="text-gray-600">Cabin {order.voyager.cabin}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Update Status</h2>

                <div className="space-y-2">
                  <button
                    onClick={() => handleStatusChange("Pending")}
                    className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-yellow-50"
                    }`}
                  >
                    <StatusIcons.Pending className="h-5 w-5 mr-2" />
                    Pending
                  </button>

                  <button
                    onClick={() => handleStatusChange("Preparing")}
                    className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
                      order.status === "Preparing"
                        ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    <StatusIcons.Preparing className="h-5 w-5 mr-2" />
                    Preparing
                  </button>

                  <button
                    onClick={() => handleStatusChange("Prepared")}
                    className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
                      order.status === "Prepared"
                        ? "bg-green-100 text-green-800 border-2 border-green-300"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    <StatusIcons.Prepared className="h-5 w-5 mr-2" />
                    Prepared
                  </button>

                  <button
                    onClick={() => handleStatusChange("Cancelled")}
                    className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
                      order.status === "Cancelled"
                        ? "bg-red-100 text-red-800 border-2 border-red-300"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-red-50"
                    }`}
                  >
                    <StatusIcons.Cancelled className="h-5 w-5 mr-2" />
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default OrderDetails
