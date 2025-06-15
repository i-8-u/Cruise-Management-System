import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Dumbbell, User, Calendar, Clock, MapPin, Users, FileText, HeartPulse } from "lucide-react"
import Header from "../components/Header"

const AddEditFitnessClass = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    class: "",
    instructor: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    enrolled: "",
    status: "Active",
    description: "",
    duration: "",
  })

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEditing) {
      // Simulate API call to get class data
      setTimeout(() => {
        const mockClass = {
          id: Number.parseInt(id),
          class: "Yoga",
          instructor: "Sarah Johnson",
          date: "2025-04-15",
          time: "08:00",
          location: "Fitness Deck",
          capacity: "20",
          enrolled: "15",
          status: "Active",
          description: "A gentle yoga class suitable for all levels, focusing on flexibility and relaxation.",
          duration: "60",
        }
        setFormData(mockClass)
        setLoading(false)
      }, 500)
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    // Simulate API call to save data
    setTimeout(() => {
      setSaving(false)
      // Show success message
      alert(`${isEditing ? "Updated" : "Added"} fitness class successfully!`)
      // Redirect back to fitness center list
      navigate("/fitness-center")
    }, 800)
  }

  const user = {
    name: "Admin User",
    role: "System Administrator",
    avatar: "A",
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        <p className="mt-2 text-gray-500">Loading class data...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title={isEditing ? "Edit Fitness Class" : "Add New Fitness Class"}
        subtitle={isEditing ? "Update fitness class details" : "Create a new fitness class"}
        user={user}
      />

      <button onClick={() => navigate("/admin/fitness-center")} className="flex items-center btn-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Fitness Center
      </button>

      <form onSubmit={handleSubmit}>
        
        {/* Class Info */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <Dumbbell className="w-5 h-5 mr-2 text-pink-500" />
            Class Information
          </h3>

          {/* Class Name & Instructor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Class Name */}
            <div className="form-group">
              <label htmlFor="class" className="form-label">
                <HeartPulse className="w-4 h-4 mr-1 text-gray-500" />
                Class Name
              </label>
              <input
                type="text"
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter class name"
                required
              />
            </div>

            {/* Instructor */}
            <div className="form-group">
              <label htmlFor="instructor" className="form-label flex items-center">
                <User className="w-4 h-4 mr-1 text-gray-500" />
                Instructor
              </label>
              <select
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select an instructor</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Michael Chen">Michael Chen</option>
                <option value="Emma Davis">Emma Davis</option>
                <option value="Carlos Rodriguez">Carlos Rodriguez</option>
                <option value="Jessica Kim">Jessica Kim</option>
              </select>
            </div>

          </div>

          {/* Duration & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            
            {/* Duration */}
            <div className="form-group">
              <label htmlFor="duration" className="form-label flex items-center">
                <Clock className="w-4 h-4 mr-1 text-gray-500" />
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 60"
                min="0"
                required
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location" className="form-label flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                Location
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a location</option>
                <option value="Fitness Deck">Fitness Deck</option>
                <option value="Gym">Gym</option>
                <option value="Dance Studio">Dance Studio</option>
              </select>
            </div>

          </div>

          {/* Description */}
          <div className="form-group mt-4">
            <label htmlFor="description" className="form-label flex items-center">
              <FileText className="w-4 h-4 mr-1 text-gray-500" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Brief description of the class"
              rows="3"
            ></textarea>
          </div>

        </div>

        {/* Schedule & Capacity */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-pink-500" />
            Schedule & Capacity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="Active">Active</option>
                <option value="Full">Full</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="form-group">
              <label htmlFor="capacity" className="form-label flex items-center">
                <Users className="w-4 h-4 mr-1 text-gray-500" />
                Total Capacity
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="form-input"
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="enrolled" className="form-label">
                Enrolled Participants
              </label>
              <input
                type="number"
                id="enrolled"
                name="enrolled"
                value={formData.enrolled}
                onChange={handleChange}
                className="form-input"
                placeholder="0"
                min="0"
                max={formData.capacity}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.capacity && formData.enrolled
                  ? `${formData.capacity - formData.enrolled} spots available`
                  : "Enter capacity and enrolled participants"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate("/admin/fitness-center")} className="btn-secondary" disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                {isEditing ? "Updating..." : "Saving..."}
              </>
            ) : isEditing ? (
              "Update Class"
            ) : (
              "Save Class"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddEditFitnessClass
