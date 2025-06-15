import { NavLink, useNavigate } from "react-router-dom"
import { FileText, User, LogOut } from "lucide-react"

import { useUser } from '../contexts/UserContext'; // Adjust the import path if necessary
import { getAuth, signOut } from 'firebase/auth';

function Sidebar() {

  const { logout } = useUser();
  const navigate = useNavigate()

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
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b flex items-center">
        <img src='/logo.png' alt="Got Cooked !" />
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-sm uppercase font-medium mb-2">Main Menu</p>
        <nav className="space-y-1">
          <NavLink
            to="/supervisor/"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm ${isActive ? "bg-pink-50 text-pink-500" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            <FileText className="w-5 h-5 mr-3" />
            Stationery Item Orders
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto border-t">
        <nav className="p-4 space-y-1">
          {/* <NavLink
            to="/supervisor/profile"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm ${isActive ? "bg-pink-50 text-pink-500" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            <User className="w-5 h-5 mr-3" />
            Profile
          </NavLink> */}

          <button onClick={handleLogout} className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
