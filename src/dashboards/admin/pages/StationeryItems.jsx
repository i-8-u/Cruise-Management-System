import { Book, Calendar, PartyPopper, Ticket, Users } from "lucide-react"
import BookingTable from "../components/BookingTable"
import StatCard from "../components/StatCard"
import Header from "../components/Header.jsx"

import { useEffect, useState } from "react"
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig.js"

function StationeryItems() {
  const [bookings, setBookings] = useState([])
  const [totalViewers, setTotalViewers] = useState(0)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const ordersRef = collection(db, "orders")
        const voyagersRef = collection(db, "voyagers")
        const ordersQuery = query(ordersRef, where("orderCategory", "==", "stationary"))
  
        // Fetch bookings and voyagers in parallel
        const [ordersSnapshot, voyagersSnapshot] = await Promise.all([
          getDocs(ordersQuery),
          getDocs(voyagersRef),
        ])  
  
        // Create a uid → name map from voyagers
        const uidToNameMap = {}
        voyagersSnapshot.forEach((doc) => {
          const data = doc.data()
          uidToNameMap[data.uid] = data.name || "Unknown"
        })
  
        let viewers = 0
        const fetchedBookings = []
  
        ordersSnapshot.forEach((doc) => {
          const data = doc.data()
          const uid = data.uid
          viewers += data.orderDetails?.ticketCount || 0

          const items = data.orderDetails?.items || []
          const itemDescriptions = items.map(
            (item) => `${item.quantity}x ${item.name}`
          )

          const createdAt = data.createdAt?.toDate?.()
          const orderDate = createdAt?.toLocaleDateString()
          const orderTime = createdAt?.toLocaleTimeString()
          // console.log("Cabin", data.cabin)
  
          fetchedBookings.push({
            id: doc.id,
            userName: uidToNameMap[uid] || "Unknown",
            orderDate: orderDate || "N/A",
            orderTime: orderTime || "N/A",
            cabinNumber: data.cabin || "N/A",
            items: itemDescriptions,
            price: data.orderDetails.price ?? "N/A",
            status: data.status || "Pending",
          })
        })
  
        setBookings(fetchedBookings)
        setTotalViewers(viewers)
        // console.log(bookings.length)
        // console.log(totalViewers)
      } catch (error) {
        console.error("Error fetching movie bookings:", error)
      }
    }
  
    fetchBookings()
  }, [])
  

  const columns = [
    { header: "User Name", accessor: "userName" },
    // { header: "Package Name", accessor: "packageName" },
    { header: "Time", accessor: "orderTime" },
    { header: "Order Date", accessor: "orderDate" },
    { header: "Items", accessor: "items"},
    { header: "Price", accessor: "price" },
    // { header: "Booking Date", accessor: "bookingDate" },
    { header: "Cabin Number", accessor: "cabinNumber" },
    // { header: "Max Guests", accessor: "maxGuests" },
    { header: "Status", accessor: "status" },
  ]

  return (
    <div>
    <Header title="Stationery Bookings" subtitle="Manage Stationery Bookings"/>
    <div className="space-y-6">
        <div className="flex items-center">
          <Book className="w-6 h-6 text-pink-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">All Stationery Bookings</h2>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={bookings.length} icon={<Calendar size={24} />} color="blue" />
        {/* <StatCard title="Total Tickets Booked" value={totalViewers} icon={<Users size={24} />} color="green" /> */}
      </div>

      <div className="bg-white rounded-lg shadow">
        <BookingTable
          setBookings={setBookings}
          bookings={bookings}
          columns={columns}
          // title="All Movie Bookings"
        />
      </div>
    </div>
    </div>
  )
}

export default StationeryItems