import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Utensils,
  FileText,
  Users,
  LogOut,
  Clapperboard,
  Scissors,
  Dumbbell,
  PartyPopper,
} from "lucide-react"
import "../index.css"

import { useUser } from '../contexts/UserContext'; // Adjust the import path if necessary
import { getAuth, signOut } from 'firebase/auth';

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [servicesOpen, setServicesOpen] = useState(false)

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : ""
  }

  const { logout } = useUser(); // Access logout from context

  const handleLogout = () => {
    // Step 1: Sign out from Firebase
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Step 2: Call logout function from UserContext
        logout();

        // Step 3: Show success alert
        alert("Logged out successfully");

        // Step 4: Navigate to login page
        navigate('/');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
        alert('An error occurred while logging out. Please try again.');
      });
  };

  return (
    <div className="w-64 bg-white h-full border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <Link to="/manager/" className="flex items-center">
          <img src='/logo.png' alt="Got Cooked !" />
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">MAIN MENU</p>
          <nav className="space-y-1">
            <Link
              to="/manager/"
              className={`flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-pink-50 hover:text-pink-500 ${isActive("/")}`}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="/manager/movie-bookings"
              className={`flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-pink-50 hover:text-pink-500 ${isActive("/catering")}`}
            >
              <Clapperboard className="w-5 h-5 mr-3" />
              View Movie Bookings
            </Link>
            <Link
              to="/manager/salon-bookings"
              className={`flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-pink-50 hover:text-pink-500 ${isActive("/stationery")}`}
            >
              <Scissors className="w-5 h-5 mr-3" />
              View Salon Bookings
            </Link>
            <Link
              to="/manager/fitness-bookings"
              className={`flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-pink-50 hover:text-pink-500 ${isActive("/voyagers")}`}
            >
              <Dumbbell className="w-5 h-5 mr-3" />
              View Fitness Bookings
            </Link>
            <Link
              to="/manager/party-hall-bookings"
              className={`flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-pink-50 hover:text-pink-500 ${isActive("/voyagers")}`}
            >
              <PartyPopper className="w-5 h-5 mr-3" />
              View Party Hall Bookings
            </Link>
          </nav>
        </div>

      </div>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        {/* <Link
          to="/admin/profile"
          className={`flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-pink-50 hover:text-pink-500 ${isActive("/profile")}`}
        >
          <User className="w-5 h-5 mr-3" />
          Profile
        </Link> */}
        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-pink-50 hover:text-pink-500 w-full text-left"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
