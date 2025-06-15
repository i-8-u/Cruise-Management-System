import { useState } from "react"
import { User, Mail, Phone, Calendar, MapPin, Camera } from "lucide-react"

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Emmaaa",
    lastName: "Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-06-15",
    address: "123 Ocean View, Suite 500",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    country: "United States",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert("Profile updated successfully!")
    setIsEditing(false)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-pink-600">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>
        {!isEditing && (
          <button
            onClick={toggleEdit}
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <div className="h-40 w-40 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-5xl font-bold mb-4 relative group">
                      EJ
                      <div className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full cursor-pointer hover:bg-pink-600">
                        <Camera size={16} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">Emma Johnson</h3>
                    <p className="text-gray-500">Manager, Operations</p>
                  </div>
                </div>

                <div className="md:w-2/3 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="flex flex-col items-center">
                  <div className="h-40 w-40 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-5xl font-bold mb-4">
                    EJ
                  </div>
                  <h3 className="text-lg font-semibold">Emma Johnson</h3>
                  <p className="text-gray-500">Manager, Operations</p>

                  <div className="mt-4 w-full space-y-2">
                    <div className="flex items-center p-3 bg-pink-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Joined</p>
                        <p className="text-sm font-medium">March 10, 2018</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="text-base font-medium text-gray-900 mt-1 flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                        <p className="text-base font-medium text-gray-900 mt-1 flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          {formData.email}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                        <p className="text-base font-medium text-gray-900 mt-1 flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          {formData.phone}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                        <p className="text-base font-medium text-gray-900 mt-1 flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {formatDate(formData.dateOfBirth)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Address</h3>
                        <p className="text-base font-medium text-gray-900 mt-1 flex items-start">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                          <span>
                            {formData.address}
                            <br />
                            {formData.city}, {formData.state} {formData.zipCode}
                            <br />
                            {formData.country}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
