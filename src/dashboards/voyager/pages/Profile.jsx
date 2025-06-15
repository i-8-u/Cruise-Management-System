import { useState } from 'react';
import { User } from 'lucide-react';

import { useUser } from "../context/UserContext"

const Profile = () => {
  const { user } = useUser(); // get user from context
  
  if (!user) return null;
  
  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="section-title">My Profile</h1>
        <p className="section-subtitle">Manage your personal information and preferences</p>
        
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar">
                <User size={40} />
              </div>
              <h2 className="profile-name">{user.name}</h2>
              <div className="membership-badge">{user.package} Member</div>
              
              <div className="profile-contact">
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span>{user.email}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>{user.phone}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🏠</span>
                  <span>{user.cabin}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🎁</span>
                  <span className='contact-expense' >₹ {user.expenses} spent</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="profile-main">
            <div className="profile-tabs">
              <button 
                className={`profile-tab`}
              >
                <User size={18} />
                <span>Personal Info</span>
              </button>
              
            </div>
            
            <div className="tab-content">
                <div className="personal-info">
                  
                  <div className="info-grid">
                    <div className="info-group">
                      <label>Full Name</label>
                      <div className="info-value">{user.name}</div>
                    </div>
                    <div className="info-group">
                      <label>Email Address</label>
                      <div className="info-value">{user.email}</div>
                    </div>
                    <div className="info-group">
                      <label>Phone Number</label>
                      <div className="info-value">{user.phone}</div>
                    </div>
                    <div className="info-group">
                      <label>Cabin No.</label>
                      <div className="info-value">{user.cabin}</div>
                    </div>
                  </div>
                  
                  <div className="section-header">
                    <h3>Membership Details</h3>
                  </div>
                  
                  <div className="info-grid">
                    <div className="info-group">
                      <label>Check In</label>
                      <div className="info-value">{user.checkIn}</div>
                    </div>
                    <div className="info-group">
                      <label>Check Out</label>
                      <div className="info-value">{user.checkOut}</div>
                    </div>
                  </div>
                </div>
              
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .profile-page {
          padding: 24px;
        }
        
        .profile-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .profile-container {
          display: grid;
          gap: 24px;
          margin-top: 24px;
        }
        
        .profile-sidebar, .profile-main {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .profile-card {
          padding: 24px;
          text-align: center;
        }
        
        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 16px;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }
        
        .profile-name {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .membership-badge {
          display: inline-block;
          padding: 4px 12px;
          background-color: var(--primary-light);
          color: var(--primary);
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 16px;
        }
        
        .profile-contact {
          text-align: left;
          margin-bottom: 24px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .contact-expense {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0px;
          font-size: 22px;
        }
        
        .current-cruise {
          background-color: #f9f9f9;
          padding: 16px;
          border-radius: 8px;
          text-align: left;
        }
        
        .current-cruise h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .cruise-name {
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .cruise-dates, .cruise-cabin {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        
        .profile-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-color);
        }
        
        .profile-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          font-weight: 500;
          cursor: pointer;
        }
        
        .profile-tab.active {
          border-bottom-color: var(--primary);
          color: var(--primary);
        }
        
        .tab-content {
          padding: 24px;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .section-header h3 {
          font-size: 18px;
          font-weight: 600;
        }
        
        .edit-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          background-color: var(--primary-light);
          color: var(--primary);
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
        
        .info-grid {
          display: grid;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .info-group label {
          display: block;
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        
        .info-value {
          font-weight: 500;
        }
        
        .cruise-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .cruise-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .cruise-item.current {
          background-color: var(--primary-light);
        }
        
        .cruise-status {
          display: inline-block;
          padding: 4px 8px;
          background-color: var(--primary);
          color: white;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          height: fit-content;
        }
        
        .cruise-status.past {
          background-color: #ccc;
        }
        
        .cruise-details h4 {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .cruise-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        
        .cruise-ports {
          font-size: 14px;
        }
        
        .preference-section {
          margin-bottom: 24px;
        }
        
        .preference-section h4 {
          font-weight: 600;
          margin-bottom: 12px;
        }
        
        .preference-options {
          display: grid;
          gap: 12px;
        }
        
        .preference-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        
        .save-preferences-btn {
          padding: 10px 16px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .save-preferences-btn:hover {
          background-color: var(--primary-dark);
        }
        
        @media (min-width: 768px) {
          .profile-container {
            grid-template-columns: 300px 1fr;
          }
          
          .info-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .preference-options {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;