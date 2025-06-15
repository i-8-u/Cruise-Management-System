import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Film, Calendar, MapPin, Users, Clock, Tag, FileText, Clapperboard, CircleCheck, UserLock } from "lucide-react"
import Header from "../components/Header"

const AddEditMovieTicket = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    title: "",
    showtime: "",
    location: "",
    capacity: "",
    booked: "",
    status: "Active",
    description: "",
    duration: "",
    genre: "",
  })

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEditing) {
      // Simulate API call to get movie data
      setTimeout(() => {
        const mockMovie = {
          id: Number.parseInt(id),
          title: "Ocean Adventure",
          showtime: "2025-04-15T19:00",
          location: "Main Theater",
          capacity: "200",
          booked: "145",
          status: "Active",
          description: "An exciting adventure on the high seas with stunning visuals and an engaging storyline.",
          duration: "120",
          genre: "Adventure",
        }
        setFormData(mockMovie)
        setLoading(false)
      }, 500)
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    // Simulate API call to save data
    setTimeout(() => {
      setSaving(false)
      // Show success message
      alert(`${isEditing ? "Updated" : "Added"} movie screening successfully!`)
      // Redirect back to movie tickets list
      navigate("/movie-tickets")
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
        <p className="mt-2 text-gray-500">Loading movie data...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title={isEditing ? "Edit Movie Screening" : "Add New Movie Screening"}
        subtitle={isEditing ? "Update movie screening details" : "Create a new movie screening"}
        user={user}
      />

      <button onClick={() => navigate("/admin/movie-tickets")} className="flex items-center btn-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Movie Tickets
      </button>

      <form onSubmit={handleSubmit}>
        
        {/* Movie Info */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <Clapperboard className="w-5 h-5 mr-2 text-pink-500" />
            Movie Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Movie Title */}            
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                <Film className="w-4 h-4 mr-1 text-gray-500" />
                Movie Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter movie title"
                required
              />
            </div>
            
            {/* Genre */}
            <div className="form-group">
              <label htmlFor="genre" className="form-label flex items-center">
                <Tag className="w-4 h-4 mr-1 text-gray-500" />
                Genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Action, Comedy, Drama"
              />
            </div>

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
                placeholder="e.g., 120"
                min="0"
              />
            </div>

          </div>

          {/* Description */}
          <div className="grid grid-cols-1 gap-6 mt-4">

            <div className="form-group">
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
                placeholder="Brief description of the movie"
                rows="2"
              ></textarea>
            </div>
          </div>

        </div>

        {/* Screening Details */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-pink-500" />
            Screening Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Showtime */}
            <div className="form-group">
              <label htmlFor="showtime" className="form-label">
                <Clock className="w-4 h-4 mr-1 text-gray-500" />
                Showtime
              </label>
              <input
                type="datetime-local"
                id="showtime"
                name="showtime"
                value={formData.showtime}
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
                <option value="Main Theater">Main Theater</option>
                <option value="Deck Cinema">Deck Cinema</option>
                <option value="VIP Lounge">VIP Lounge</option>
              </select>
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status" className="form-label">
                <CircleCheck className="w-4 h-4 mr-1 text-gray-500"/>
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
                <option value="Sold Out">Sold Out</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            
            {/* Total Capacity */}
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
              <label htmlFor="booked" className="form-label">
                <UserLock className="w-4 h-4 mr-1 text-gray-500" />
                Booked Seats
              </label>
              <input
                type="number"
                id="booked"
                name="booked"
                value={formData.booked}
                onChange={handleChange}
                className="form-input"
                placeholder="0"
                min="0"
                max={formData.capacity}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.capacity && formData.booked
                  ? `${formData.capacity - formData.booked} seats available`
                  : "Enter capacity and booked seats"}
              </p>
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate("/admin/movie-tickets")} className="btn-secondary" disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                {isEditing ? "Updating..." : "Saving..."}
              </>
            ) : isEditing ? (
              "Update Screening"
            ) : (
              "Save Screening"
            )}
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddEditMovieTicket
