import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Scissors, User, Calendar, Clock, Users, Tag, MessageSquare, CalendarCheck2, UserRoundPen, PencilLine } from "lucide-react"
import Header from "../components/Header"

const AddEditBeautySalon = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    service: "",
    voyager: "",
    date: "",
    time: "",
    stylist: "",
    status: "Confirmed",
    notes: "",
    duration: "",
  })

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEditing) {
      // Simulate API call to get appointment data
      setTimeout(() => {
        const mockAppointment = {
          id: Number.parseInt(id),
          service: "Haircut",
          voyager: "John Smith",
          date: "2025-04-15",
          time: "10:00",
          stylist: "Emma Wilson",
          status: "Confirmed",
          notes: "Client prefers shorter on the sides.",
          duration: "45",
        }
        setFormData(mockAppointment)
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
      alert(`${isEditing ? "Updated" : "Added"} salon appointment successfully!`)
      // Redirect back to beauty salon list
      navigate("/beauty-salon")
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
        <p className="mt-2 text-gray-500">Loading appointment data...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title={isEditing ? "Edit Salon Appointment" : "Add New Salon Appointment"}
        subtitle={isEditing ? "Update appointment details" : "Create a new salon appointment"}
        user={user}
      />

      <button onClick={() => navigate("/admin/beauty-salon")} className="flex items-center btn-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Beauty Salon
      </button>

      <form onSubmit={handleSubmit}>
        
        {/* Service Info */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <Scissors className="w-5 h-5 mr-2 text-pink-500" />
            Service Information
          </h3>

          {/* Service Type & Stylist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Service Type */}
            <div className="form-group">
              <label htmlFor="service" className="form-label">
                <CalendarCheck2 className="w-4 h-4 mr-1 text-gray-500" />
                Service Type
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a service</option>
                <option value="Haircut">Haircut</option>
                <option value="Manicure">Manicure</option>
                <option value="Pedicure">Pedicure</option>
                <option value="Facial">Facial</option>
                <option value="Hair Coloring">Hair Coloring</option>
                <option value="Massage">Massage</option>
              </select>
            </div>

            {/* Stylist */}
            <div className="form-group">
              <label htmlFor="stylist" className="form-label flex items-center">
                <User className="w-4 h-4 mr-1 text-gray-500" />
                Stylist
              </label>
              <select
                id="stylist"
                name="stylist"
                value={formData.stylist}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a stylist</option>
                <option value="Emma Wilson">Emma Wilson</option>
                <option value="Sophia Lee">Sophia Lee</option>
                <option value="James Taylor">James Taylor</option>
              </select>
            </div>

          </div>

          {/* Duration & Status */}
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
                placeholder="e.g., 45"
                min="0"
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status" className="form-label flex items-center">
                <Tag className="w-4 h-4 mr-1 text-gray-500" />
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
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

          </div>

        </div>

        {/* Client Schedule */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <Users className="w-5 h-5 mr-2 text-pink-500" />
            Client & Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Voyager Name */}
            <div className="form-group">
              <label htmlFor="voyager" className="form-label">
                <UserRoundPen className="w-4 h-4 mr-1 text-gray-500" />
                Voyager Name
              </label>
              <input
                type="text"
                id="voyager"
                name="voyager"
                value={formData.voyager}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter voyager name"
                required
              />
            </div>
            
            {/* Date */}
            <div className="form-group">
              <label htmlFor="date" className="form-label flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-500" />
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

            {/* Time */}
            <div className="form-group">
              <label htmlFor="time" className="form-label flex items-center">
                <Clock className="w-4 h-4 mr-1 text-gray-500" />
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

          </div>
        </div>

        {/* Additional Info */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-pink-500" />
            Additional Information
          </h3>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              <PencilLine className="w-4 h-4 mr-1 text-gray-500" />
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Any special requests or notes about the appointment"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate("/admin/beauty-salon")} className="btn-secondary" disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                {isEditing ? "Updating..." : "Saving..."}
              </>
            ) : isEditing ? (
              "Update Appointment"
            ) : (
              "Save Appointment"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddEditBeautySalon
