"use client"

import { useState } from "react"
import { mockUser } from "../data/mockData"
import { Mail, Phone, Building, Calendar, Award, BookOpen } from "lucide-react"

const Profile = () => {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser({
      ...user,
      ...formData,
    })
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-500 mb-2">Chef Profile</h1>
      <p className="text-gray-600 mb-6">View and manage your culinary profile</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 bg-pink-50 flex flex-col items-center justify-center border-b">
              <div className="h-24 w-24 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-3xl font-semibold mb-4">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-pink-600">{user.role}</p>
            </div>

            <div className="p-6">
              <div className="grid gap-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{user.department}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 w-full text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {isEditing ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-700">
                    Professional Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                  ></textarea>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-5 h-5 text-pink-500 mr-2" />
                  <h2 className="text-xl font-bold">Professional Bio</h2>
                </div>
                <p className="text-gray-700">{user.bio}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Award className="w-5 h-5 text-pink-500 mr-2" />
                  <h2 className="text-xl font-bold">Expertise & Certifications</h2>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Culinary Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.expertise.map((skill, index) => (
                      <span key={index} className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                  <ul className="space-y-2">
                    {user.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center">
                        <Award className="w-4 h-4 text-yellow-500 mr-2" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
