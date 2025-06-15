import { X, Check } from 'lucide-react';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div className="confirmation-icon">
            <Check size={32} />
          </div>
          <p className="confirmation-message">{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={() => { onConfirm(); onClose(); }}>
            Done
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .modal-container {
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          width: 400px;           /* 👈 Increase this to desired width */
          max-width: 90%;         /* ✅ Keeps it responsive on small screens */
          max-height: 90vh;       /* ✅ Prevents it from overflowing the screen */
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); /* optional: gives it a nice pop */
        }

        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .modal-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }
        
        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .modal-body {
          padding: 24px;
          text-align: center;
        }
        
        .confirmation-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: var(--primary-light);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        
        .confirmation-message {
          margin: 0;
          font-size: 16px;
          color: var(--text-primary);
        }
        
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px;
          border-top: 1px solid var(--border-color);
        }
        
        .btn-primary {
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          font-weight: 500;
          cursor: pointer;
        }
        
        .btn-secondary {
          background-color: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          border-radius: 6px;
          padding: 8px 16px;
          font-weight: 500;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;