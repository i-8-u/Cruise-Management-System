"use client"

import { useState } from "react"
import { useOrders } from "../context/OrderContext"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import OrdersTable from "../components/OrdersTable"

const LunchOrders = () => {
  const { getOrdersByType, updateOrderStatus } = useOrders()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")

  const lunchOrders = getOrdersByType("Lunch")

  const filteredOrders = lunchOrders.filter((order) => {
    // Apply search filter
    const searchMatch =
      searchTerm === "" ||
      order.voyager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    // Apply status filter
    const statusMatch = statusFilter === "All Statuses" || order.status === statusFilter

    return searchMatch && statusMatch
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ name: "Emma Johnson", role: "Head Cook" }} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-pink-500">Lunch Orders</h1>
            <p className="text-gray-600">Manage and prepare lunch orders for voyagers</p>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="relative mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Search orders by name or item..."
                  className="w-full md:w-80 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <select
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Prepared</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            {filteredOrders.length > 0 ? (
              <OrdersTable orders={filteredOrders} onStatusChange={updateOrderStatus} />
            ) : (
              <div className="text-center py-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No lunch orders found</h3>
                <p className="mt-1 text-sm text-gray-500">No lunch orders match your current filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default LunchOrders
