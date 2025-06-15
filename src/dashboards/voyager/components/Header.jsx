import { Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useUser } from "../context/UserContext";

const Header = () => {

  const { user } = useUser(); // get user from context
  
  if (!user) return null;

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {/* <button className="menu-button" onClick={toggleSidebar}>
            <Menu size={20} />
          </button> */}
        </div>
        
        <div className="header-right">
          <Link to='/voyager/profile' className="user-profile">
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-type">{user.package} Voyager</div>
            </div>
            <div className="user-avatar">
              <User size={20} />
            </div>
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .header {
          background-color: white;
          border-bottom: 1px solid var(--border-color);
          padding: 12px 24px;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-left {
          display: flex;
          align-items: center;
        }
        
        .menu-button {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }
        
        .header-right {
          display: flex;
          align-items: center;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .user-info {
          text-align: right;
        }
        
        .user-name {
          font-weight: 500;
          font-size: 14px;
        }
        
        .user-type {
          font-size: 12px;
          color: var(--text-secondary);
        }
        
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }
      `}</style>
    </header>
  );
};

export default Header;