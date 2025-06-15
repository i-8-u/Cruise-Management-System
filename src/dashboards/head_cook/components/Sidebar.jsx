import { Beer, Coffee, CupSoda, Home, Sandwich, Utensils, UtensilsCrossed } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LogOut } from 'lucide-react'

import { useUser } from '../context/UserContext';
import { getAuth, signOut } from 'firebase/auth';

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useUser();

  // if (!user) return null;

  const isActive = (path) => {
    return location.pathname === path ? "bg-pink-100 text-pink-600" : "text-gray-700 hover:bg-pink-50"
  }

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
    <div className="w-64 h-screen bg-white flex flex-col" style={{border: 'none', borderRight: '1px solid #ccc'}}>
      <div className="p-4">
        <Link to="/headCook/" className="flex items-center text-pink-500 font-bold text-xl">
          <img src="/logo.png" alt="" />
        </Link>
      </div>
      <hr className="cart-divider" style={{margin: '10px 0', border: 'none', borderTop: '1px solid #ccc'}}/>
      <div className="p-4">
        <nav className="space-y-1">
          <Link to="/headCook/dashboard" className={`flex items-center px-3 py-2 rounded-md ${isActive("/dashboard")}`}>
            <Home className="w-5 h-5 text-pink-500 mr-3" />
            Dashboard
          </Link>

          <Link to="/headCook/all-orders" className={`flex items-center px-3 py-2 rounded-md ${isActive("/all-orders")}`}>
            <Utensils className="w-5 h-5 text-pink-500 mr-3" />
            <span className={location.pathname === "/all-orders" ? "text-pink-500 font-medium" : ""}>All Catering Orders</span>
          </Link>

          {/* <Link
            to="/headCook/breakfast-orders"
            className={`flex items-center px-3 py-2 rounded-md ${isActive("/breakfast-orders")}`}
          >
            <Coffee className="w-5 h-5 text-pink-500 mr-3" />
            Breakfast Orders
          </Link>

          <Link to="/headCook/lunch-orders" className={`flex items-center px-3 py-2 rounded-md ${isActive("/lunch-orders")}`}>
            <Sandwich className="w-5 h-5 text-pink-500 mr-3" />
            Lunch Orders
          </Link>

          <Link to="/headCook/dinner-orders" className={`flex items-center px-3 py-2 rounded-md ${isActive("/dinner-orders")}`}>
            <UtensilsCrossed className="w-5 h-5 text-pink-500 mr-3" />
            Dinner Orders
          </Link>

          <Link to="/headCook/drink-orders" className={`flex items-center px-3 py-2 rounded-md ${isActive("/drink-orders")}`}>
            <CupSoda className="w-5 h-5 text-pink-500 mr-3" />
            Drink Orders
          </Link> */}

          <Link
            to="/headCook/party-hall-orders"
            className={`flex items-center px-3 py-2 rounded-md ${isActive("/party-hall-orders")}`}
          >
            <Beer className="w-5 h-5 text-pink-500 mr-3" />
            Party Hall Orders
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-4">
        <hr style={{margin: '10px 0', border: 'none', borderTop: '1px solid #ccc'}}/>
        {/* <Link to="/headCook/profile" className={`flex items-center px-3 py-2 rounded-md ${isActive("/profile")}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Profile
        </Link> */}

        <Link onClick={handleLogout} className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-pink-50">
          <LogOut className="w-5 h-5 text-pink-500 mr-3" />
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
