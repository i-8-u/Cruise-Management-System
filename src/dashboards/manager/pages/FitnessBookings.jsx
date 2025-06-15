import { Activity, Calendar, Users } from "lucide-react"
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

function FitnessBookings() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const ordersRef = collection(db, "orders")
        const voyagersRef = collection(db, "voyagers")
        const ordersQuery = query(ordersRef, where("orderCategory", "==", "fitness"))
  
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
  
        const fetchedBookings = []
  
        ordersSnapshot.forEach((doc) => {
          const data = doc.data()
          const uid = data.uid
  
          fetchedBookings.push({
            id: doc.id,
            userName: uidToNameMap[uid] || "Unknown",
            className: data.orderDetails?.className || "N/A",
            time: data.orderDetails?.time || "N/A",
            orderForDate: data.orderDetails?.date || "",
            price: data.orderDetails.price ?? "N/A",
            status: data.status || "Pending",
          })
        })
  
        setBookings(fetchedBookings)
      } catch (error) {
        console.error("Error fetching movie bookings:", error)
      }
    }
  
    fetchBookings()
  }, [])
  

  const columns = [
    { header: "User Name", accessor: "userName" },
    { header: "Class Name", accessor: "className" },
    { header: "Time", accessor: "time" },
    { header: "Order For Date", accessor: "orderForDate" },
    { header: "Price", accessor: "price" },
    { header: "Status", accessor: "status" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-pink-600">Fitness Bookings</h1>
        <p className="text-gray-600 mt-1">View and manage all fitness bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={bookings.length} icon={<Calendar size={24} />} color="blue" />
        {/* <StatCard title="Total Viewers" value={totalViewers} icon={<Users size={24} />} color="green" /> */}
      </div>

      <div className="bg-white rounded-lg shadow">
        <BookingTable
          bookings={bookings}
          columns={columns}
          title="All Fitness Bookings"
        />
      </div>
    </div>
  )
}

export default FitnessBookings