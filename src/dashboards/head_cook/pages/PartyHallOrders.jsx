import { useEffect, useState, useMemo } from "react"
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig.js"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import BookingTable from "../components/BookingTable"

const PartyHallOrders = () => {
  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [typeFilter, setTypeFilter] = useState("All Types")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders")
        const voyagersRef = collection(db, "voyagers")
        const q = query(ordersRef, where("orderCategory", "==", "party"))

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
          const voyager = uidMap[data.uid] || {
            name: "Unknown",
            cabinNumber: "N/A",
          }

          const itemsByCategory = data.orderDetails?.itemsByCategory || {}
          const flatItems = Object.entries(itemsByCategory).flatMap(
            ([category, items]) =>
              items.map((item) => ({
                ...item,
                category,
              }))
          )

          const itemDescriptions = flatItems.map(
            (item) => `${item.quantity}x ${item.name}`
          )

          // const createdAt = data.createdAt?.toDate?.()
          // const partyDate = createdAt?.toLocaleDateString() || "N/A"
          // const orderTime = createdAt?.toLocaleTimeString() || "N/A"

          ordersList.push({
            id: doc.id,
            voyagerName: voyager.name,
            initials: voyager.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase(),
            cabinNumber: voyager.cabinNumber,
            // orderDate,
            partyDate: data.orderDetails.date || "N/A",
            // orderTime,
            partyTime: data.orderDetails.time || "N/A",
            package: data.orderDetails.packageName || "N/A",
            // type: data.orderDetails?.orderType || "N/A",
            status: data.status || "Pending",
          })
        })

        setOrders(ordersList)
      } catch (error) {
        console.error("Error fetching catering orders:", error)
      }
    }

    fetchOrders()
  }, [])

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const orderRef = doc(db, "orders", id)
      await updateDoc(orderRef, { status: newStatus })
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchMatch =
        searchTerm === "" ||
        order.voyagerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )

      const statusMatch =
        statusFilter === "All Statuses" || order.status === statusFilter

      const typeMatch =
        typeFilter === "All Types" || order.type === typeFilter

      return searchMatch && statusMatch && typeMatch
    })
  }, [orders, searchTerm, statusFilter, typeFilter])

  const columns = [
    { header: "Voyager", accessor: "voyagerName" },
    { header: "Cabin", accessor: "cabinNumber" },
    { header: "Date Of Party", accessor: "partyDate" },
    { header: "Time", accessor: "partyTime" },
    { header: "Package", accessor: "package" },
    // { header: "Type", accessor: "type" },
    { header: "Status", accessor: "status" },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-pink-500">Party Hall Orders</h1>
            <p className="text-gray-600">Manage and prepare all party hall orders for voyagers</p>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <input
                type="text"
                placeholder="Search by name or item..."
                className="w-full md:w-80 mb-4 md:mb-0 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <select
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Prepared</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                </select>
                {/* <select
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Drinks</option>
                </select> */}
              </div>
            </div>

            <BookingTable
              bookings={filteredOrders}
              columns={columns}
              title="Party Hall Orders"
              onStatusChange={updateOrderStatus}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default PartyHallOrders
