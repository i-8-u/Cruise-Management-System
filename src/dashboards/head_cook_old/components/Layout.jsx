import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Utensils, Coffee, UtensilsCrossed, Wine, User, LogOut, MenuIcon, Beer, CupSoda, Sandwich } from "lucide-react"
import { mockUser } from "../data/mockData"

const Layout = ({ children }) => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const menuItems = [
    { path: "/headCook/", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { path: "/headCook/all-orders", label: "All Orders", icon: <Utensils className="w-5 h-5" /> },
    { path: "/headCook/breakfast-orders", label: "Breakfast Orders", icon: <Coffee className="w-5 h-5" /> },
    { path: "/headCook/lunch-orders", label: "Lunch Orders", icon: <Sandwich className="w-5 h-5" /> },
    { path: "/headCook/dinner-orders", label: "Dinner Orders", icon: <UtensilsCrossed className="w-5 h-5" /> },
    { path: "/headCook/drink-orders", label: "Drink Orders", icon: <CupSoda className="w-5 h-5" /> },
    { path: "/headCook/party-orders", label: "Party Hall Orders", icon: <Beer className="w-5 h-5" /> },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleMobileMenu} className="p-2 rounded-md bg-white shadow-md text-gray-600">
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <Link to={`/headCook/`} className="flex items-center px-6 py-4 h-16 border-b">
            <img src='/logo.png' alt="Got Cooked !" />
          </Link>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto py-4">
            <p className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Head Cook Menu</p>
            <nav className="mt-2 px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? "bg-pink-50 text-pink-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User section */}
          <div className="p-4 border-t">
            <Link
              to="/headCook/profile"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span className="ml-3">Profile</span>
            </Link>
            <Link
              to="/headCook/logout"
              className="flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm z-10 h-16 flex items-center justify-end px-4 md:px-6">
          <Link to={`/headCook/profile`} className="flex items-center">
            <div className="mr-4 text-right">
              <div className="text-sm font-medium text-gray-900">{mockUser.name}</div>
              <div className="text-xs text-gray-500">{mockUser.role}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-semibold">
              {mockUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

export default Layout
