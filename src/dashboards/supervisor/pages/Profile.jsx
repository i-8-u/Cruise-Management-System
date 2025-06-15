"use client"

import { useState } from "react"
import { Mail, Phone, Home, Edit2, Save } from "lucide-react"

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 123-4567",
    cabin: "A-123",
    voyagerType: "Premium Voyager",
    joinDate: "2023-01-15",
    preferences: {
      dietaryRestrictions: "Vegetarian",
      roomService: "Morning",
      notifications: true,
    },
  })

  const handleInputChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value,
    })
  }

  const handlePreferenceChange = (field, value) => {
    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        [field]: value,
      },
    })
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const saveProfile = () => {
    // In a real app, you would save to backend here
    setIsEditing(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
        {isEditing ? (
          <button
            className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
            onClick={saveProfile}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        ) : (
          <button
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={toggleEdit}
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-2xl font-bold mx-auto mb-4">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-500">{profile.voyagerType}</p>
              <p className="text-sm text-gray-400 mt-1">
                Member since {new Date(profile.joinDate).toLocaleDateString()}
              </p>
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{profile.phone}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4">Personal Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  <p className="text-gray-800">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  <p className="text-gray-800">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                ) : (
                  <p className="text-gray-800">{profile.phone}</p>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile
