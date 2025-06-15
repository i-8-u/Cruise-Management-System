"use client"

import { Link } from "react-router-dom"
import { StatusIcons, TypeIcons } from "./Icons"

const OrdersTable = ({ orders, onStatusChange }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const renderStatusBadge = (status) => {
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Preparing: "bg-blue-100 text-blue-800",
      Prepared: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    }

    const StatusIcon = StatusIcons[status]

    return (
      <div className={`flex items-center px-2 py-1 rounded-full ${statusColors[status]}`}>
        <StatusIcon className="h-4 w-4 mr-1" />
        <span>{status}</span>
      </div>
    )
  }

  const renderTypeIcon = (type) => {
    const TypeIcon = TypeIcons[type]
    const typeColors = {
      Breakfast: "text-orange-500",
      Lunch: "text-green-500",
      Dinner: "text-purple-500",
      Drinks: "text-blue-500",
    }

    return (
      <div className="flex items-center">
        <TypeIcon className="h-5 w-5 mr-1" />
        <span className={typeColors[type]}>{type}</span>
      </div>
    )
  }

  const renderActions = (order) => {
    switch (order.status) {
      case "Pending":
        return (
          <div className="flex space-x-4">
            <button onClick={() => onStatusChange(order.id, "Preparing")} className="text-blue-600 hover:text-blue-800">
              Start Preparing
            </button>
            <button onClick={() => onStatusChange(order.id, "Cancelled")} className="text-red-600 hover:text-red-800">
              Cancel
            </button>
            <Link to={`/order/${order.id}`} className="text-pink-600 hover:text-pink-800">
              View Details
            </Link>
          </div>
        )
      case "Preparing":
        return (
          <div className="flex space-x-4">
            <button
              onClick={() => onStatusChange(order.id, "Prepared")}
              className="text-green-600 hover:text-green-800"
            >
              Mark Prepared
            </button>
            <button onClick={() => onStatusChange(order.id, "Cancelled")} className="text-red-600 hover:text-red-800">
              Cancel
            </button>
            <Link to={`/order/${order.id}`} className="text-pink-600 hover:text-pink-800">
              View Details
            </Link>
          </div>
        )
      case "Prepared":
      case "Cancelled":
        return (
          <div className="flex space-x-4">
            <Link to={`/order/${order.id}`} className="text-pink-600 hover:text-pink-800">
              View Details
            </Link>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Voyager
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">#{order.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    {getInitials(order.voyager.name)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{order.voyager.name}</div>
                    <div className="text-sm text-gray-500">Cabin {order.voyager.cabin}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.date}</div>
                <div className="text-sm text-gray-500">{order.time}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.quantity}x {item.name}
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{renderTypeIcon(order.type)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{renderStatusBadge(order.status)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{renderActions(order)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersTable
