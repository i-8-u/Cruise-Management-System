import { Calendar, PartyPopper, Ticket, Users } from "lucide-react"
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

function PartyHall() {
  const [bookings, setBookings] = useState([])
  const [totalViewers, setTotalViewers] = useState(0)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const ordersRef = collection(db, "orders")
        const voyagersRef = collection(db, "voyagers")
        const ordersQuery = query(ordersRef, where("orderCategory", "==", "party"))
  
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
  
          fetchedBookings.push({
            id: doc.id,
            userName: uidToNameMap[uid] || "Unknown",
            packageName: data.orderDetails?.packageName || "N/A",
            time: data.orderDetails?.time || "N/A",
            price: data.orderDetails?.price || "N/A",
            orderForDate: data.orderDetails?.date || "",
            // bookingDate: data.createdAt?.toDate?.() || "",
            duration: data.orderDetails?.duration || "N/A",
            maxGuests: data.orderDetails?.guests || "N/A",
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
    { header: "Package Name", accessor: "packageName" },
    { header: "Time", accessor: "time" },
    { header: "Order for Date", accessor: "orderForDate" },
    { header: "Price", accessor: "price" },
    // { header: "Booking Date", accessor: "bookingDate" },
    { header: "Duration", accessor: "duration" },
    { header: "Max Guests", accessor: "maxGuests" },
    { header: "Status", accessor: "status" },
  ]

  return (
    <div>
    <Header title="Party Hall Bookings" subtitle="Manage Party Hall Bookings"/>
    <div className="space-y-6">
        <div className="flex items-center">
          <PartyPopper className="w-6 h-6 text-pink-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">All Party Hall Bookings</h2>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={bookings.length} icon={<Calendar size={24} />} color="blue" />
        {/* <StatCard title="Total Tickets Booked" value={totalViewers} icon={<Users size={24} />} color="green" /> */}
      </div>

      <div className="bg-white rounded-lg shadow">
        <BookingTable
          bookings={bookings}
          columns={columns}
          // title="All Movie Bookings"
        />
      </div>
    </div>
    </div>
  )
}

export default PartyHall
