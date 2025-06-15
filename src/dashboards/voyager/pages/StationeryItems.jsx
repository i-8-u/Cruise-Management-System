import { useState } from 'react';
import { Plus, Minus, ShoppingCart, X } from 'lucide-react';

import { useUser } from "../context/UserContext"; // To get user information
import { db } from "../../../firebase/firebaseConfig.js"; // Assuming you have firebase.js configured with Firestore
import { collection, addDoc, doc, getDocs, updateDoc, where, query, serverTimestamp } from "firebase/firestore"; // Firestore functions

const StationeryItems = ({ showConfirmation }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  const { user } = useUser();
  
  const stationeryItems = [
    {
      id: 'notebook',
      name: 'Premium Notebook',
      description: 'High-quality hardcover notebook with 200 pages',
      price: 360,
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTRIzcg4vFVmwMfEskvAzrjHe_oVeMnOKxc86aiwZHcM5Z7XcWhaPjKEIKM6-2K5txMVtv1BDKy0b0XAZEPg0S9Y274X955EGZfzD8VuTb_Wqxe-O8HQRSttcQX'
    },
    {
      id: 'pens',
      name: 'Ballpoint Pen Set',
      description: 'Set of 5 premium ballpoint pens in different colors',
      price: 400,
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSk90dWg7YDV7UU-_nsgwrtYlnYsWp9EhiwOX_0wIWdjV3A1DCMfjwjhFom4WeyE1z9jfB6MZPLVikY1p0xXRSGT2RTb7J6HmBWqg73miop8EsQOki8fIsD'
    },
    {
      id: 'markers',
      name: 'Highlighter Set',
      description: 'Set of 6 fluorescent highlighters for marking important text',
      price: 280,
      image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQn5jX550413hZZfUEuiupcJ1OnUbi7fwaRTw6n6cplD6muR_GsALcLnLwz65EgBsOFMPkhEinek4nbOwlaekAUIWeI29K22wjok-9Q2vQtbnf5p3eIFJEn'
    },
    {
      id: 'sticky',
      name: 'Sticky Notes',
      description: 'Pack of colorful sticky notes in various sizes',
      price: 90,
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR81JOpNkg9hqXW_JOTXI0RiaUFLLU_mR44SIRQ9WyM-1-irDNxKjXxzSCUE_Rf1mRJQ2NG9TjdAXDLKXIZIrDold_UM5NkeDQ19JSB_HHkhs7A8fjo0E_cZQ'
    },
    {
      id: 'folder',
      name: 'Document Folder',
      description: 'Elegant leather document folder with multiple compartments',
      price: 340,
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSLo_6j4rpflIpVV4hc2svx9yMfhwljKB3DwkL22r_TIet4mBIMnjU666RtiIv3K7EnxgZwR5EA_DWn95Ife0VG7pTfcvOb_AZUTCaReJJK_THeWU1mJJRr'
    },
    {
      id: 'calendar',
      name: 'Desk Calendar',
      description: 'Compact desk calendar with daily inspirational quotes',
      price: 330,
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQYQs-XHoFy2Z7U75Jwd1Lrp593GUkTXYZoLndfNrmYvOzvQkvpOTcK5Y_e0T1sTXA6CN4jnmxVA5Hk-NlGow3G-7e4iRg7994JCHGkbl_eGE7gvR5x2-ad'
    }
  ];
  
  const handleIncrement = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };
  
  const handleDecrement = (itemId) => {
    if (selectedItems[itemId] > 0) {
      setSelectedItems(prev => ({
        ...prev,
        [itemId]: prev[itemId] - 1
      }));
    }
  };
  
  const handleViewCart = () => {
    let total = 0;
    
    Object.entries(selectedItems).forEach(([itemId, quantity]) => {
      if (quantity > 0) {
        const item = stationeryItems.find(item => item.id === itemId);
        if (item) {
          total += item.price * quantity;
        }
      }
    });
    
    setOrderTotal(total);
    setShowCart(true);
  };
  
  const handleBookStationary = async () => {
    if (!user || !user.uid) {
      console.error("User is not logged in or user ID is missing.");
      return;
    }
  
    // Prepare selected items with quantity > 0 and valid item data
    const itemsToOrder = Object.entries(selectedItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => {
        const item = stationeryItems.find(item => item.id === itemId);
        if (!item) return null;
        return {
          itemId,
          name: item.name,
          price: item.price,
          quantity,
          total: +(item.price * quantity).toFixed(2),
        };
      })
      .filter(Boolean); // remove null entries
  
    if (itemsToOrder.length === 0) {
      console.error("No valid items selected to order.");
      return;
    }
  
    // Calculate GST and total
    const gstAmount = +(orderTotal * 0.18).toFixed(2);
    const totalAmountWithGst = +(orderTotal + gstAmount).toFixed(2);
  
    try {
      // Get user document from 'voyagers'
      const q = query(collection(db, "voyagers"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.error("User document not found in 'voyagers' collection.");
        return;
      }
  
      const userDocRef = querySnapshot.docs[0].ref;
      const userData = querySnapshot.docs[0].data();
      const currentExpense = userData.expenses || 0;
  
      // Update user's total expenses
      await updateDoc(userDocRef, {
        expenses: +(currentExpense + totalAmountWithGst).toFixed(2),
      });
  
      // Create new order document
      await addDoc(collection(db, "orders"), {
        uid: user.uid,
        cabin: user.cabin ,
        orderType: "Stationery Order",
        orderCategory: "stationary",
        orderDetails: {
          items: itemsToOrder,
          subtotal: +orderTotal.toFixed(2),
          gst: gstAmount,
          price: totalAmountWithGst,
        },
        status: "Confirmed",
        createdAt: serverTimestamp(),
      });
  
      // UI feedback
      showConfirmation(
        "Order Placed",
        `Your stationery order of ₹ ${totalAmountWithGst.toFixed(2)} has been placed successfully and will be delivered shortly to your cabin.`,
        () => {
          setSelectedItems({});
          setShowCart(false);
        }
      );
  
    } catch (error) {
      console.error("Error placing stationery order:", error);
    }
  };  
  
  const totalItems = Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);
  
  return (
    <div className="stationery-page">
      <div className="stationery-content">
        <h1 className="section-title">Stationery Items</h1>
        <p className="section-subtitle">Order stationery items delivered directly to your cabin</p>
        
        <div className="stationery-grid">
          {stationeryItems.map(item => (
            <div key={item.id} className="stationery-item">
              <div className="item-image">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
              </div>
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-price">₹ {item.price.toFixed(2)}</div>
              </div>
              <div className="item-actions">
                <div className="quantity-control">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleDecrement(item.id)}
                    disabled={!selectedItems[item.id]}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="quantity-value">{selectedItems[item.id] || 0}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="order-summary">
          <button 
            className="order-button"
            onClick={handleViewCart}
            disabled={totalItems === 0}
          >
            <ShoppingCart size={18} />
            <span>View Cart ({totalItems})</span>
          </button>
        </div>
      </div>
      
      {showCart && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Your Cart</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCart(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="cart-items">
                {Object.entries(selectedItems).map(([itemId, quantity]) => {
                  if (quantity <= 0) return null;
                  
                  const item = stationeryItems.find(item => item.id === itemId);
                  if (!item) return null;
                  
                  return (
                    <div key={itemId} className="cart-item">
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">₹ {item.price.toFixed(2)}</div>
                      </div>
                      <div className="cart-item-quantity">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleDecrement(itemId)}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => handleIncrement(itemId)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="cart-item-total">
                        ₹ {(item.price * quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="cart-summary">
                <div className="cart-total">
                  <span>Subtotal:</span>
                  <span>₹ {orderTotal.toFixed(2)}</span>
                </div>
                <div className="cart-total">
                  <span>GST (18%):</span>
                  <span>₹ {(orderTotal * 0.18).toFixed(2)}</span>
                </div>
                <hr className="cart-divider" /> 
                <div className="cart-summary-line cart-total">
                  <strong>Total:</strong>
                  <strong>₹ {(orderTotal * 1.18).toFixed(2)}</strong>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
              <button 
                className="btn-primary"
                onClick={handleBookStationary}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .stationery-page {
          padding: 24px;
        }
        
        .stationery-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .stationery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }
        
        .stationery-item {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
        }
        
        .item-image {
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f9f9f9;
          padding: 16px;
        }
        
        .item-image img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
        
        .item-details {
          padding: 16px;
          flex-grow: 1;
        }
        
        .item-name {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .item-description {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }
        
        .item-price {
          font-weight: 600;
          color: var(--primary);
          font-size: 18px;
        }
        
        .item-actions {
          padding: 16px;
          border-top: 1px solid var(--border-color);
        }
        
        .quantity-control {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        
        .quantity-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid var(--border-color);
          background: none;
          cursor: pointer;
        }
        
        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .quantity-value {
          font-weight: 500;
          min-width: 20px;
          text-align: center;
        }
        
        .order-summary {
          margin-top: 24px;
          display: flex;
          justify-content: flex-end;
        }
        
        .order-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 12px 24px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .order-button:hover {
          background-color: var(--primary-dark);
        }
        
        .order-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
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
        
        .modal {
          background-color: white;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
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
          padding: 16px;
          max-height: 60vh;
          overflow-y: auto;
        }
        
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background-color: #f9f9f9;
          border-radius: 6px;
        }
        
        .cart-item-info {
          flex: 1;
        }
        
        .cart-item-name {
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .cart-item-price {
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .cart-item-quantity {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 16px;
        }
        
        .cart-item-total {
          font-weight: 600;
          color: var(--primary);
        }
        
        .cart-summary {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }
        
        .cart-total {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          font-size: 18px;
        }
        
        .cart-total span:last-child {
          color: var(--primary);
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
          padding: 10px 16px;
          font-weight: 500;
          cursor: pointer;
        }
        
        .btn-secondary {
          background-color: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          border-radius: 6px;
          padding: 10px 16px;
          font-weight: 500;
          cursor: pointer;
        }
      `}</style>

    </div>
  );
};

export default StationeryItems;