import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import Header from "../components/Header"
import DataTable from "../components/DataTable"

// Firebase
import { collection, getDocs, deleteDoc, doc, onSnapshot} from 'firebase/firestore'
import { db } from "../../../firebase/firebaseConfig.js"

const ViewAllCrewMembers = () => {
  const [voyagers, setVoyagers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Start real-time listener
    const unsubscribe = onSnapshot(
      collection(db, "crewMembers"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setVoyagers(data)
        setLoading(false)
      },
      (error) => {
        console.error("Error listening to crew members:", error)
        setLoading(false)
      }
    )
  
    // Cleanup listener when component unmounts
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this crew member?")) {
      try {
        await deleteDoc(doc(db, "crewMembers", id))
        setVoyagers(voyagers.filter(voyager => voyager.id !== id))
      } catch (error) {
        console.error("Error deleting crew member:", error)
      }
    }
  }

  const columns = [
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
    { key: "startDate", header: "Start Date" },
    { key: "email", header: "Email" },
    { key : "address", header : "Address"},
    { key : "phone", header : "Phone"},
  ]

  // const filters = [
  //   {
  //     name: "package",
  //     label: "Package",
  //     options: [
  //       { value: "Standard", label: "Standard" },
  //       { value: "Deluxe", label: "Deluxe" },
  //       { value: "Premium", label: "Premium" },
  //     ],
  //   },
  //   {
  //     name: "status",
  //     label: "Status",
  //     options: [
  //       { value: "Active", label: "Active" },
  //       { value: "Pending", label: "Pending" },
  //       { value: "Cancelled", label: "Cancelled" },
  //     ],
  //   },
  // ]



  return (
    <div>
      <Header title="All Crew Members" subtitle="Manage crew members on your cruise" />

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Registered Crew Members</h2>
        <Link to="/admin/crewMember/add" className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          Register New Crew Member
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          <p className="mt-2 text-gray-500">Loading crew members...</p>
        </div>
      ) : (
        <DataTable
          data={voyagers}
          columns={columns}
          onDelete={handleDelete}
          editPath="/admin/crewMember/edit"
          searchPlaceholder="Search voyagers..."
          // filters={filters}
        />
      )}
    </div>
  )
}

export default ViewAllCrewMembers
