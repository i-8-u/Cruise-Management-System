import { Calendar, Users } from "lucide-react"
import BookingTable from "../components/BookingTable"
import StatCard from "../components/StatCard"

import { useEffect, useState } from "react"
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig.js"

function MovieBookings() {
  const [bookings, setBookings] = useState([])
  const [totalViewers, setTotalViewers] = useState(0)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const ordersRef = collection(db, "orders")
        const voyagersRef = collection(db, "voyagers")
        const ordersQuery = query(ordersRef, where("orderCategory", "==", "movie"))
  
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
            movieTitle: data.orderDetails?.movieName || "N/A",
            showtime: `${data.orderDetails?.time || "N/A"} | ${data.orderDetails?.screen || "?"}`,
            tickets: data.orderDetails?.ticketCount || 0,
            bookingDate: data.orderDetails?.date || "",
            status: data.status || "Pending",
          })
        })
  
        setBookings(fetchedBookings)
        setTotalViewers(viewers)
      } catch (error) {
        console.error("Error fetching movie bookings:", error)
      }
    }
  
    fetchBookings()
  }, [])
  

  const columns = [
    { header: "User Name", accessor: "userName" },
    { header: "Movie Title", accessor: "movieTitle" },
    { header: "Showtime | Screen", accessor: "showtime" },
    { header: "Ticketes Booked", accessor: "tickets" },
    { header: "Booking Date", accessor: "bookingDate" },
    { header: "Status", accessor: "status" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-pink-600">Movie Bookings</h1>
        <p className="text-gray-600 mt-1">View and manage all movie bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={bookings.length} icon={<Calendar size={24} />} color="blue" />
        <StatCard title="Total Tickets Booked" value={totalViewers} icon={<Users size={24} />} color="green" />
      </div>

      <div className="bg-white rounded-lg shadow">
        <BookingTable
          bookings={bookings}
          columns={columns}
          title="All Movie Bookings"
        />
      </div>
    </div>
  )
}

export default MovieBookings
