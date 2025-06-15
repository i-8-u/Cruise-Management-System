import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Save, Shield, Briefcase, UserRoundPen } from "lucide-react";
import Header from "../components/Header";
import { useUser } from "../contexts/UserContext"; // NEW: import user context

const Profile = () => {
  const { user, setUser } = useUser(); // get from context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [saving, setSaving] = useState(false);

  // initialize formData when user is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    // Simulate API call to save data
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser)); // save back to localStorage
      setSaving(false);
      alert("Profile updated successfully!");
    }, 800);
  };

  if (!user) return null; // safe fallback until user is loaded

  return (
    <div>
      <Header title="Your Profile" subtitle="Manage your account information" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="form-section">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-4xl font-bold mb-6 shadow-md">
                {formData.avatar}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{formData.name}</h3>
              <div className="flex items-center text-gray-500 mb-6">
                <Briefcase className="w-4 h-4 mr-1" />
                <span>{user.role}</span>
              </div>

              <div className="w-full space-y-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-pink-500" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-pink-500" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-pink-500" />
                  <span>{formData.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className="form-section">
              <h3 className="form-section-title flex items-center">
                <User className="w-5 h-5 mr-2 text-pink-500" />
                Personal Information
              </h3>

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <UserRoundPen className="w-4 h-4 mr-1 text-gray-500" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail className="w-4 h-4 mr-1 text-gray-500" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <Phone className="w-4 h-4 mr-1 text-gray-500" />
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="form-section">
              <h3 className="form-section-title flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-pink-500" />
                Contact Details
              </h3>

              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <div className="relative">
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="form-textarea pl-10"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Avatar */}
            <div className="form-section">
              <h3 className="form-section-title flex items-center">
                <Shield className="w-5 h-5 mr-2 text-pink-500" />
                Account Settings
              </h3>

              <div className="form-group">
                <label htmlFor="avatar" className="form-label">
                  Avatar Initial
                </label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="form-input"
                  maxLength="1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter a single letter for your avatar</p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" className="btn-primary flex items-center" disabled={saving}>
                {saving ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
