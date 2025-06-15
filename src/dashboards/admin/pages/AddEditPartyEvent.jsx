import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, PartyPopper, User, Calendar, Clock, MapPin, Users, MessageSquare, DollarSign, IndianRupee, UserRoundPen, BadgeCheck, CalendarFold } from "lucide-react"
import Header from "../components/Header"

const AddEditPartyEvent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: "",
    host: "",
    date: "",
    time: "",
    location: "",
    guests: "",
    status: "Confirmed",
    notes: "",
    budget: "",
    duration: "",
  })

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEditing) {
      // Simulate API call to get event data
      setTimeout(() => {
        const mockEvent = {
          id: Number.parseInt(id),
          name: "Birthday Celebration",
          host: "John Smith",
          date: "2025-04-15",
          time: "19:00",
          location: "Grand Ballroom",
          guests: "50",
          status: "Confirmed",
          notes: "Client requested special birthday cake and decorations.",
          budget: "1500",
          duration: "4",
        }
        setFormData(mockEvent)
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
      alert(`${isEditing ? "Updated" : "Added"} party event successfully!`)
      // Redirect back to party hall list
      navigate("/party-hall")
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
        <p className="mt-2 text-gray-500">Loading event data...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title={isEditing ? "Edit Party Event" : "Add New Party Event"}
        subtitle={isEditing ? "Update party event details" : "Create a new party event"}
        user={user}
      />

      <button onClick={() => navigate("/admin/party-hall")} className="flex items-center btn-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Party Hall
      </button>

      <form onSubmit={handleSubmit}>
        
        {/* Event Info */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <PartyPopper className="w-5 h-5 mr-2 text-pink-500" />
            Event Information
          </h3>

          {/* Event Name & Host Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Event Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <UserRoundPen className="w-4 h-4 mr-1 text-gray-500" />
                Event Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter event name"
                required
              />
            </div>

            {/* Host Name */}
            <div className="form-group">
              <label htmlFor="host" className="form-label flex items-center">
                <User className="w-4 h-4 mr-1 text-gray-500" />
                Host Name
              </label>
              <input
                type="text"
                id="host"
                name="host"
                value={formData.host}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter host name"
                required
              />
            </div>

          </div>

          {/* Bufget & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            
            {/* Budget */}
            <div className="form-group">
              <label htmlFor="budget" className="form-label flex items-center">
                <IndianRupee className="w-4 h-4 mr-1 text-gray-500" />
                Budget ($)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="form-input"
                placeholder="0.00"
                min="0"
              />
            </div>

            {/* Duration */}
            <div className="form-group">
              <label htmlFor="duration" className="form-label flex items-center">
                <Clock className="w-4 h-4 mr-1 text-gray-500" />
                Duration (hours)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 4"
                min="0"
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status" className="form-label">
                <BadgeCheck className="w-4 h-4 mr-1 text-gray-500" />
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

        {/* Schedule Location */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-pink-500" />
            Schedule & Location
          </h3>

          {/* Date, Time, Location & No. of guests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Date */}
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                <CalendarFold className="w-4 h-4 mr-1 text-gray-500" />
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
              <label htmlFor="time" className="form-label">
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
                <option value="Grand Ballroom">Grand Ballroom</option>
                <option value="Sunset Deck">Sunset Deck</option>
                <option value="Conference Hall">Conference Hall</option>
              </select>
            </div>

            {/* No. of guests */}
            <div className="form-group">
              <label htmlFor="guests" className="form-label flex items-center">
                <Users className="w-4 h-4 mr-1 text-gray-500" />
                Number of Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="form-input"
                placeholder="0"
                min="0"
                required
              />
            </div>

          </div>

        </div>

        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-pink-500" />
            Additional Information
          </h3>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              Notes & Special Requests
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Any special requests or notes about the event"
              rows="3"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Include details about decorations, catering preferences, or special arrangements.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate("/admin/party-hall")} className="btn-secondary" disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                {isEditing ? "Updating..." : "Saving..."}
              </>
            ) : isEditing ? (
              "Update Event"
            ) : (
              "Save Event"
            )}
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddEditPartyEvent
