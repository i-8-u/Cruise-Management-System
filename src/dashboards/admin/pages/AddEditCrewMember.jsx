import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, User, Mail, Phone, Home, Package, Calendar, UserRoundPen, Eye, EyeOff, KeySquare, ShieldUser } from "lucide-react"
import Header from "../components/Header"
// import bcrypt from 'bcryptjs'

// Firebase
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import { db, auth } from "../../../firebase/firebaseConfig.js"
import { createUserWithEmailAndPassword } from 'firebase/auth'; 

const AddEditCrewMember = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    address: "",
    role: "",
    password: ""
  })

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const fetchCrewMember = async () => {
      if (isEditing) {
        setLoading(true)
        try {
          const docRef = doc(db, "crewMembers", id)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            setFormData({
              name: data.name || "",
              email: data.email || "",
              phone: data.phone || "",
              startDate: data.startDate || "",
              address: data.address || "",
              role: data.role || "",
              password: "" // Keep empty during edit
            })
          } else {
            console.log("No such document!")
          }
        } catch (error) {
          console.error("Error fetching crew member:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchCrewMember()
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing) {
        const { password, ...updatedData } = formData;
        const crewDocRef = doc(db, "crewMembers", id);
        await updateDoc(crewDocRef, updatedData);
        alert("Crew member updated successfully!");
      } else {
        // Create user in Firebase Authentication
        const { email, password, ...newCrewMemberData } = formData;

        // Create user with email and password in Firebase Authentication
        await createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;

            // Now, save the crew member data (excluding password) in Firestore
            const newCrewMember = {
              ...newCrewMemberData,
              email,
              password,
              uid: user.uid,  // Add Firebase user UID to the Firestore document
            };

            // Add to Firestore collection
            await addDoc(collection(db, "crewMembers"), newCrewMember);
            alert("Crew member added successfully!");

            // Redirect to Crew Members list page
            navigate("/admin/crewMembers");
          })
          .catch((error) => {
            console.error("Error creating user:", error);
            alert("Error creating user! " + error.message);
          });
      }
    } catch (error) {
      console.error("Error saving crew member:", error);
      alert("Something went wrong!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        <p className="mt-2 text-gray-500">Loading voyager data...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title={isEditing ? "Edit Crew Member" : "Register New Crew Member"}
        subtitle={isEditing ? "Update crew member details" : "Add a new crew member to the system"}
      />

      <button onClick={() => navigate("/admin/crewMembers")} className="flex items-center btn-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Crew Members
      </button>

      <form onSubmit={handleSubmit}>

        {/* Personal Information */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <User className="w-5 h-5 mr-2 text-pink-500" />
            Personal Information
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <UserRoundPen className="w-4 h-4 mr-1 text-gray-500" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Role */}
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                <ShieldUser className="w-4 h-4 mr-1 text-gray-500" />
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Supervisor">Supervisor</option>
                <option value="HeadCook">HeadCook</option>
              </select>
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="email" className="form-label flex items-center">
                <Mail className="w-4 h-4 mr-1 text-gray-500" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="email@example.com"
                required
              />
            </div>

            {/* Password with eye toggle */}
            
            <div className="form-group relative mb-4">
              <label htmlFor="password" className="form-label flex items-center mb-1 text-sm font-medium text-gray-700">
                <KeySquare className="w-4 h-4 mr-1 text-gray-500" />
                Password
              </label>
  
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input w-full pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="eg. aBc@123"
                  required={!isEditing}
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>


            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label flex items-center">
                <Phone className="w-4 h-4 mr-1 text-gray-500" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+919988443322"
                required
              />
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address" className="form-label flex items-center">
                <Home className="w-4 h-4 mr-1 text-gray-500" />
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., New Delhi"
                required
              />
            </div>

            {/* Start Date */}
            <div className="form-group">
              <label htmlFor="startDate" className="form-label flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate("/admin/crewMembers")} className="btn-secondary" disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                {isEditing ? "Updating..." : "Register"}
              </>
            ) : isEditing ? (
              "Update Crew Member"
            ) : (
              "Register Crew Member"
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .form-input {
          // width: 60%;
          border-color: var(--color-red-400);
        }
        .form-group {
          width : 70%
        }
      `}</style>
    </div>
  )
}

export default AddEditCrewMember
