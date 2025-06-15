import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Scissors, Dumbbell, PartyPopper, User, LogOut, Utensils, NotebookPen, Clapperboard, Folder, Folders, Package } from 'lucide-react';

import { useUser } from '../context/UserContext'; // Adjust the import path if necessary
import { getAuth, signOut } from 'firebase/auth';

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate()

  const { logout } = useUser();

  const isActive = (path) => {
    return location.pathname === path;
  };

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
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/voyager/" className="logo">
          <div className="logo-icon">
            <img src='/logo.png' alt="Got Cooked !" />
          </div>
        </Link>
      </div>
      
      <div className="sidebar-content">
        <div className="menu-section">
          <div className="menu-title">MAIN MENU</div>
          <ul className="menu-items">
            <li className={`menu-item ${isActive('/') ? 'active' : ''}`}>
              <Link to="/voyager/">
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={`menu-item ${isActive('/catering') ? 'active' : ''}`}>
              <Link to="/voyager/catering">
                <Utensils size={18} />
                <span>Order Catering Items</span>
              </Link>
            </li>
            <li className={`menu-item ${isActive('/stationery') ? 'active' : ''}`}>
              <Link to="/voyager/stationery">
                <NotebookPen size={18} />
                <span>Order Stationery Items</span>
              </Link>
            </li>
            <li className={`menu-item ${isActive('/movies') ? 'active' : ''}`}>
              <Link to="/voyager/movies">
                <Clapperboard size={18} />
                <span>Book Movie Tickets</span>
              </Link>
            </li>
            <li className={`menu-item ${isActive('/beauty') ? 'active' : ''}`}>
              <Link to="/voyager/beauty">
                <Scissors size={18} />
                <span>Book Beauty Salon</span>
              </Link>
            </li>
            <li className={`menu-item ${isActive('/fitness') ? 'active' : ''}`}>
              <Link to="/voyager/fitness">
                <Dumbbell size={18} />
                <span>Book Fitness Center</span>
              </Link>
            </li>
            <li className={`menu-item ${isActive('/party') ? 'active' : ''}`}>
              <Link to="/voyager/party">
                <PartyPopper size={18} />
                <span>Book Party Hall</span>
              </Link>
            </li>
            <hr className="cart-divider" style={{margin: '10px 0', border: 'none', borderTop: '1px solid #ccc'}}/> 
            <li className={`menu-item ${isActive('/party') ? 'active' : ''}`}>
              <Link to="/voyager/orders">
                <Package size={18} />
                <span>Your Orders</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="user-actions">
          <ul className="menu-items">
            <li className={`menu-item ${isActive('/profile') ? 'active' : ''}`}>
              <Link to="/voyager/profile">
                <User size={18} />
                <span>Profile</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 240px;
          background-color: var(--sidebar-bg);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
          overflow-y: auto;
          transition: width 0.3s ease;
          z-index: 100;
        }
        
        .sidebar.collapsed {
          width: 80px;
        }
        
        .sidebar-header {
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .logo {
          display: block;
          align-items: center;
          gap: 8px;
        }
        
        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width : 190px
        }
        
        .logo-text {
          font-size: 20px;
          font-weight: 600;
          color: var(--primary);
          transition: opacity 0.3s ease;
        }
        
        .sidebar.collapsed .logo-text {
          opacity: 0;
          width: 0;
          overflow: hidden;
        }
        
        .sidebar-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px 0;
        }
        
        .menu-section {
          margin-bottom: 24px;
        }
        
        .menu-title {
          padding: 0 16px;
          margin-bottom: 8px;
          font-size: 12px;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 500;
          white-space: nowrap;
          transition: opacity 0.3s ease;
        }
        
        .sidebar.collapsed .menu-title {
          opacity: 0;
        }
        
        .menu-items {
          list-style: none;
        }
        
        .menu-item {
          margin-bottom: 4px;
        }
        
        .menu-item a {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          color: var(--text-primary);
          border-radius: 6px;
          margin: 0 8px;
          transition: all 0.2s;
        }
        
        .menu-item a:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .menu-item.active a {
          background-color: var(--primary-light);
          color: var(--primary);
          font-weight: 500;
        }
        
        .sidebar.collapsed .menu-item a span {
          opacity: 0;
          width: 0;
          overflow: hidden;
        }
        
        .user-actions {
          margin-top: auto;
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: 0;
            z-index: 99;
          }
          
          .sidebar.collapsed {
            transform: translateX(-60px);
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;