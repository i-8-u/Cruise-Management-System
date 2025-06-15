import { useEffect, useState } from "react"
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { Search, Filter } from "lucide-react"
import { db } from "../../../firebase/firebaseConfig.js"
import StatusBadge from "../components/StatusBadge"

function StationeryOrders() {
  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders")
        const voyagersRef = collection(db, "voyagers")
        const q = query(ordersRef, where("orderCategory", "==", "stationary"))

        const [ordersSnap, voyagersSnap] = await Promise.all([
          getDocs(q),
          getDocs(voyagersRef),
        ])

        const uidMap = {}
        voyagersSnap.forEach((doc) => {
          const data = doc.data()
          uidMap[data.uid] = {
            name: data.name || "Unknown",
            cabinNumber: data.cabin || "N/A",
          }
        })

        const ordersList = []
        ordersSnap.forEach((doc) => {
          const data = doc.data()
          const voyager = uidMap[data.uid]
          console.log("Data",data)
          console.log("Voyager", voyager)

          const items = data.orderDetails?.items || []
          const itemDescriptions = items.map(
            (item) => `${item.quantity}x ${item.name}`
          )

          const createdAt = data.createdAt?.toDate?.()
          const orderDate = createdAt?.toLocaleDateString()
          const orderTime = createdAt?.toLocaleTimeString()

          ordersList.push({
            id: doc.id,
            voyagerName: voyager.name,
            initials: voyager.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase(),
            orderDate: orderDate || "N/A",
            orderTime: orderTime || "N/A",
            cabinNumber: voyager.cabinNumber || "N/A",
            items: itemDescriptions,
            status: data.status || "Pending",
          })
        })

        setOrders(ordersList)
      } catch (error) {
        console.error("Error fetching stationery orders:", error)
      }
    }

    fetchOrders()
  }, [])

  const updateStatus = async (orderId, newStatus) => {
    try {
      const docRef = doc(db, "orders", orderId)
      await updateDoc(docRef, { status: newStatus })

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch (err) {
      console.error("Failed to update status:", err)
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.voyagerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.cabinNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All Statuses" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const renderActionButtons = (order) => {
    switch (order.status.toLowerCase()) {

      case "confirmed":
        return (
          <div className="flex gap-2">
            <button
              className="text-purple-600 hover:underline text-sm font-medium bg-white-100"
              onClick={() => updateStatus(order.id, "Preparing")}
            >
              Start Preparing
            </button>
            <button
              className="text-red-600 hover:underline text-sm font-medium"
              onClick={() => updateStatus(order.id, "Cancelled")}
            >
              Cancel
            </button>
          </div>
        )
      case "preparing":
        return (
          <div className="flex gap-2">
            <button
              className="text-green-600 hover:underline text-sm font-medium"
              onClick={() => updateStatus(order.id, "Prepared")}
            >
              Mark Prepared
            </button>
            <button
              className="text-red-600 hover:underline text-sm font-medium"
              onClick={() => updateStatus(order.id, "Cancelled")}
            >
              Cancel
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-pink-500 mb-2">Supervisor Dashboard</h1>
        <p className="text-gray-600">Manage and supervise stationery orders for voyagers</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search orders by name or item..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-gray-400 mr-2" />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Prepared">Prepared</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Voyager</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
                      {order.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.voyagerName}</div>
                      <div className="text-sm text-gray-500">Cabin: {order.cabinNumber}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.orderDate}</div>
                  <div className="text-sm text-gray-500">{order.orderTime}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.items.map((item, i) => (
                    <div key={i}>{item}</div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{renderActionButtons(order)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No orders found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StationeryOrders
