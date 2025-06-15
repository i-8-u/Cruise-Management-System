import { useState, useEffect } from "react"
import { Clock, ShoppingCart, X, AlertCircle } from "lucide-react"

import { db } from "../../../firebase/firebaseConfig.js";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { useUser } from "../context/UserContext"

const Orders = () => {
  const { user } = useUser();
  
  const [orders, setOrders] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.uid) return;

      try {
        const q = query(collection(db, "orders"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          };
        });
        ordersData.sort((a, b) => b.createdAt - a.createdAt);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  const handleCancelOrder = (order) => {
    console.log("User selected to cancel ", order)
    setSelectedOrder(order);
    setShowConfirmation(true);
  };

  const confirmCancelOrder = async () => {
    if (!selectedOrder) return;

    try {
      // Delete the order
      await deleteDoc(doc(db, "orders", selectedOrder.id));

      console.log("Confirmed cancel for:", selectedOrder.id);

      // Deduct from user's expenses
      const voyagerQuery = query(collection(db, "voyagers"), where("uid", "==", user.uid));
      const voyagerSnapshot = await getDocs(voyagerQuery);

      if (!voyagerSnapshot.empty) {
        const voyagerDocRef = voyagerSnapshot.docs[0].ref;
        const voyagerData = voyagerSnapshot.docs[0].data();
        const currentExpenses = voyagerData.expenses || 0;
        // console.log("Current Expenses", currentExpenses)

        await updateDoc(voyagerDocRef, {
          expenses: Math.max(currentExpenses - (selectedOrder.orderDetails.price || 0), 0), // prevent negative
        });
      }

      // Remove order from local state
      setOrders(prevOrders => prevOrders.filter(order => order.id !== selectedOrder.id));
      setShowConfirmation(false);
      setSelectedOrder(null);

      alert("Selected order is cancelled successfully !")

    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Error in cancelling the order !")
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Confirmed":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  function renderOrderDetails(order) {
    const formatLine = (label, value) => (
      <p><span className="order-label">{label}:</span> <span className="order-value">{value}</span></p>
    );
  
    switch (order.orderCategory) {
      case "party":
        return (
          <div className="order-items">
            <div className="order-item">
              <span className="item-name">Package: {order.orderDetails.packageName}</span>
            </div>
            <div className="order-info">
              {formatLine("Date", order.orderDetails.date)}
              {formatLine("Time", order.orderDetails.time)}
              {formatLine("Duration", order.orderDetails.duration)}
              {formatLine("Max Guests", order.orderDetails.guests)}
            </div>
            <div className="order-summary">
              <hr className="cart-divider" style={{margin: '10px 0', border: 'none', borderTop: '1px solid #ccc'}}/>
              {formatLine("Subtotal", `₹ ${order.orderDetails.subTotal.toFixed(2)}`)}
              {formatLine("GST (18%)", `₹ ${order.orderDetails.gst.toFixed(2)}`)}
            </div>
          </div>
        );
  
      case "fitness":
        return (
          <div className="order-items">
            <div className="order-info">
              {formatLine("Class", order.orderDetails.className)}
              {formatLine("Date", order.orderDetails.date)}
              {formatLine("Time", order.orderDetails.time)}
              {formatLine("Duration", order.orderDetails.duration)}
            </div>
          </div>
        );
  
      case "beauty":
        return (
          <div className="order-items">
            <div className="order-item">
              <span className="item-name">Service: {order.orderDetails.serviceName}</span>
            </div>
            <div className="order-info">
              {formatLine("Date", order.orderDetails.date)}
              {formatLine("Time", order.orderDetails.time)}
              {formatLine("Duration", order.orderDetails.duration)}
            </div>
          </div>
        );
  
      case "movie":
        return (
          <div className="order-items">
            <div className="order-item">
              <span className="item-name">Movie: {order.orderDetails.movieName}</span>
            </div>
            <div className="order-info">
              {formatLine("Time", `${order.orderDetails.time} Today`)}
              {formatLine("Duration", order.orderDetails.duration)}
              {formatLine("Screen", order.orderDetails.screen)}
              {formatLine("Ticket Count", order.orderDetails.ticketCount)}
            </div>
          </div>
        );
  
      case "stationary":
        return (
          <div className="order-items">
            {order.orderDetails.items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-name-qty">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty"> x {item.quantity}</span>
                </div>
                <div className="item-total">₹ {item.price.toFixed(2)} each</div>
              </div>
            ))}
            <div className="order-summary">
              <hr className="cart-divider" style={{margin: '10px 0', border: 'none', borderTop: '1px solid #ccc'}}/>
              {formatLine("Subtotal", `₹ ${order.orderDetails.subtotal.toFixed(2)}`)}
              {formatLine("GST (18%)", `₹ ${order.orderDetails.gst.toFixed(2)}`)}
            </div>
          </div>
        );
  
      case "catering":
        const itemsByCategory = order.orderDetails.itemsByCategory || {};
        const allItems = Object.values(itemsByCategory).flat();
      
        return (
          <div className="order-items">
            {allItems.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-name-qty">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty"> x {item.quantity}</span>
                </div>
                <div className="item-total">₹ {item.total.toFixed(2)}</div>
              </div>
            ))}
            <div className="order-summary">
              <hr className="cart-divider" style={{margin: '10px 0', border: 'none', borderTop: '1px solid #ccc'}} />
              {formatLine("Subtotal", `₹ ${order.orderDetails.subtotal.toFixed(2)}`)}
              {formatLine("GST (18%)", `₹ ${order.orderDetails.gst.toFixed(2)}`)}
            </div>
          </div>
        );        
  
      default:
        return (
          <div className="order-items">
            {order.items?.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-name-qty">
                  <span className="item-qty">{item.quantity} x</span>
                  <span className="item-name">{item.name}</span>
                </div>
                <div className="item-total">₹ {(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        );
    }
  }
  

  return (
    <div className="orders-page">
      <div className="orders-content">
        <h1 className="section-title">Your Orders</h1>
        <p className="section-subtitle">View and manage your orders</p>

        {orders.length === 0 ? (
          <div className="empty-state">
            <ShoppingCart size={48} className="text-gray-300" />
            <h3 className="empty-title">No orders yet</h3>
            <p className="empty-description">Your order history will appear here</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-id-date">
                    <h3 className="order-id">{order.orderType}</h3>
                    <p className="order-date">Order created on :- {formatDate(order.createdAt)}</p>
                  </div>
                  <div className={`order-status ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                {/* Render order details based on category */}
                {renderOrderDetails(order)}
                <hr className="cart-divider" style={{margin: '10px 0', border: 'none', borderTop: '1px solid #ccc'}}/>
                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">₹ {order.orderDetails.price}</span>
                  </div>

                  {(order.status === "Confirmed" || order.status === "Processing") && (
                    <button className="cancel-button" onClick={() => handleCancelOrder(order)}>
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Cancel Order</h3>
              <button className="modal-close" onClick={() => setShowConfirmation(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <AlertCircle size={24} className="text-red-500" />
              <p>Are you sure you want to cancel this order? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowConfirmation(false)}>
                Keep Order
              </button>
              <button className="btn-danger" onClick={confirmCancelOrder}>
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* General Styling for Orders */
        .orders-page {
          isolation: isolate;
          padding: 24px;
        }

        .orders-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .section-subtitle {
          color: var(--text-secondary, #666);
          margin-bottom: 24px;
        }

        /* Order Card */
        .order-card {
          background-color: white;
          border-radius: 8px;
          border: 1px solid var(--border-color, #eee);
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid var(--border-color, #eee);
        }

        .order-id-date {
          flex: 1;
        }

        .order-id {
          font-weight: 600;
        }

        .order-date {
          font-size: 14px;
          color: var(--text-secondary, #666);
        }

        .order-status {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .order-footer {
          padding: 16px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        /* Order Items */
        .order-items {
          padding: 16px;
        }

        .order-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .order-item:last-child {
          margin-bottom: 0;
        }

        .item-name {
          font-weight: 600;
        }

        .item-qty {
          color: var(--text-secondary, #666);
        }

        .item-total {
          font-weight: 500;
          color: #f43f5e;
        }

        .order-info {
          padding: 8px 0;
        }

        .order-summary {
          margin-top: 16px;
          font-weight: 600;
        }

        /* Total Amount */
        .order-total {
          display: flex;
          gap: 8px;
          font-weight: 600;
        }

        .total-amount {
          color: var(--primary, #ec4899);
          font-size: 16px;
        }

        /* Cancel Button */
        .cancel-button {
          background-color: transparent;
          border: 1px solid #f43f5e;
          color: #f43f5e;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-button:hover {
          background-color: #fff1f2;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background-color: white;
          border-radius: 8px;
          border: 1px solid var(--border-color, #eee);
          text-align: center;
        }

        .empty-title {
          font-size: 18px;
          font-weight: 600;
          margin: 16px 0 8px;
        }

        .empty-description {
          color: var(--text-secondary, #666);
        }

        /* Media Query for Mobile */
        @media (max-width: 768px) {
          .order-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .cancel-button {
            align-self: flex-end;
          }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5); /* Slightly dark background to dim content behind */
          display: flex;
          justify-content: center; /* Center horizontally */
          align-items: center; /* Center vertically */
          z-index: 50; /* Ensure it's above other content */
        }

        .modal {
          background-color: white;
          border-radius: 8px;
          padding: 24px;
          max-width: 500px; /* Maximum width for the modal */
          width: 90%; /* Ensure it is responsive */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Add some shadow for depth */
          z-index: 51; /* Ensure modal content is above overlay */
          display: flex;
          flex-direction: column;
          gap: 16px; /* Space between sections in the modal */
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-size: 18px;
          font-weight: bold;
        }

        .modal-close {
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }

        .modal-body {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .confirmation-message p {
          margin: 0;
          font-size: 16px;
          color: #333;
          display: inline-block;
        }

        .modal-footer {
          display: flex;
          justify-content: space-between;
          gap: 16px;
        }

        .modal-footer button {
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: bold;
          transition: all 0.2s;
        }

        .btn-secondary {
          background-color: #f0f0f0;
          color: #333;
          border: 1px solid #ccc;
        }

        .btn-secondary:hover {
          background-color: #e0e0e0;
        }

        .btn-danger {
          background-color: #f43f5e;
          color: white;
          border: none;
        }

        .btn-danger:hover {
          background-color: #e11d48;
        }

      `}</style>

    </div>
  )
}

export default Orders;
