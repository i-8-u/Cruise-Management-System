import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import Header from "../components/Header"
import DataTable from "../components/DataTable"

// Firebase
import { collection, getDocs, deleteDoc, doc, onSnapshot} from 'firebase/firestore'
import { db } from "../../../firebase/firebaseConfig.js"

const ViewAllVoyagers = () => {
  const [voyagers, setVoyagers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Start real-time listener
    const unsubscribe = onSnapshot(
      collection(db, "voyagers"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setVoyagers(data)
        setLoading(false)
      },
      (error) => {
        console.error("Error listening to voyagers:", error)
        setLoading(false)
      }
    )
  
    // Cleanup listener when component unmounts
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this crew member?")) {
      try {
        await deleteDoc(doc(db, "voyager", id))
        setVoyagers(voyagers.filter(voyager => voyager.id !== id))
      } catch (error) {
        console.error("Error deleting crew member:", error)
      }
    }
  }

  const columns = [
    { key: "name", header: "Voyager Name" },
    { key: "cabin", header: "Cabin" },
    { key: "package", header: "Package" },
    { key: "checkIn", header: "Check In" },
    { key: "checkOut", header: "Check Out" },
    // { key: "gender", header: "Gender" },
    {
      key: "Gender",
      header: "Gender",
      render: (voyager) => {
        let badgeClass = "badge-danger"; // Default badge class
    
        // Assign different colors based on gender
        if (voyager.gender === "Male") {
          badgeClass = "badge-blue"; // Blue for male
        } else if (voyager.gender === "Female") {
          badgeClass = "badge-pink"; // Pink for female
        }
    
        return <span className={`badge ${badgeClass}`}>{voyager.gender}</span>;
      },
    }
  ]


  return (
    <div>
      <Header title="All Voyagers" subtitle="Manage passengers on your cruise" />

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Registered Voyagers</h2>
        <Link to="/admin/voyagers/add" className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          Register New Voyager
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          <p className="mt-2 text-gray-500">Loading voyagers...</p>
        </div>
      ) : (
        <DataTable
          data={voyagers}
          columns={columns}
          onDelete={handleDelete}
          editPath="/admin/voyagers/edit"
          searchPlaceholder="Search voyagers..."
          // filters={filters}
        />
      )}

    </div>
  )
}

export default ViewAllVoyagers
