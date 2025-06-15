import { useState, useEffect } from 'react';
import { Clock, Users } from 'lucide-react';

// FIrebase
import { useUser } from "../context/UserContext"; // To get user information
import { db } from "../../../firebase/firebaseConfig.js"; // Assuming you have firebase.js configured with Firestore
import { collection, addDoc, doc, getDocs, updateDoc, where, query, serverTimestamp } from "firebase/firestore"; // Firestore functions

const PartyHall = ({ showConfirmation }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const { user } = useUser();
  
  const partyPackages = [
    {
      id: 'basic',
      name: 'Basic Celebration',
      description: 'Standard party hall setup with basic decorations and sound system',
      duration: '3 hours',
      price: 3000,
      maxGuests: 5
    },
    {
      id: 'premium',
      name: 'Premium Celebration',
      description: 'Enhanced decorations, premium sound system, and basic catering included',
      duration: '4 hours',
      price: 5000,
      maxGuests: 10
    },
    {
      id: 'deluxe',
      name: 'Deluxe Celebration',
      description: 'Luxury decorations, DJ, premium catering, and photography service',
      duration: '5 hours',
      price: 9000,
      maxGuests: 20,
    }
  ];
  
  const availableTimes = [
    '11:00 AM - 2:00 PM',
    '3:00 PM - 6:00 PM',
    '7:00 PM - 10:00 PM',
    '8:00 PM - 1:00 AM'
  ];
  
  // Function to generate available dates between checkIn and checkOut
  const generateAvailableDates = (checkIn, checkOut) => {
    const dates = [];
    let currentDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    
    while (currentDate <= endDate) {
      dates.push(currentDate.toLocaleDateString()); // Push formatted date string
      currentDate.setDate(currentDate.getDate() + 1); // Increment date by 1
    }
    
    return dates;
  };

  // Fetch available dates based on user's checkIn and checkOut
  const availableDates = user ? generateAvailableDates(user.checkIn, user.checkOut) : [];

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedDate('');
    setSelectedTime('');
  };
  
  const handleBookParty = async () => {
    console.log("User object:", user);
  
    if (selectedPackage && selectedDate && selectedTime) {
      if (!user || !user.uid) {
        console.error("User is not logged in or user ID is missing.");
        return;
      }
  
      console.log(user.uid);
  
      try {
        const gstAmount = ((selectedPackage.price * 18) / 100);
        const totalAmount = selectedPackage.price + gstAmount;
  
        // Fetch user's current expense from the 'voyagers' collection
        const q = query(collection(db, "voyagers"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          console.error("User document not found in 'voyagers' collection.");
          return;
        }
  
        const userDocRef = querySnapshot.docs[0].ref;
        const userData = querySnapshot.docs[0].data();
        const currentExpense = userData.expenses || 0;
  
        // Update user's expense
        await updateDoc(userDocRef, {
          expenses: currentExpense + totalAmount,
        });
  
        // Instead of partyBookings, add to the common orders collection
        await addDoc(collection(db, "orders"), {
          uid: user.uid,                // user id
          orderType: "Party Hall Booking", 
          orderCategory: "party",        // this will be "party" or "catering" or "stationary" etc.
          orderDetails: {
            packageName: selectedPackage.name,
            date: selectedDate,
            time: selectedTime,
            duration: selectedPackage.duration,
            guests: selectedPackage.maxGuests,
            gst : gstAmount,
            subTotal : selectedPackage.price,
            price: totalAmount, 
          },
          status: "Confirmed",
          createdAt: serverTimestamp(),  // <- use serverTimestamp() instead of new Date()
        });
  
        // Show confirmation
        showConfirmation(
          'Booking Confirmation',
          `Your ${selectedPackage.name} has been booked for ${selectedDate} at ${selectedTime}`,
          () => {
            setSelectedPackage(null);
            setSelectedDate('');
            setSelectedTime('');
          }
        );
      } catch (error) {
        console.error("Error booking party hall:", error);
      }
    } else {
      console.error("Please select a package, date, and time before booking.");
    }
  };

  return (
    <div className="party-page">
      <div className="party-content">
        <h1 className="section-title">Party Hall Booking</h1>
        <p className="section-subtitle">Book our party hall for celebrations and special events</p>
        
        <div className="party-container">
          <div className="packages-list">
            {partyPackages.map(pkg => (
              <div 
                key={pkg.id} 
                className={`package-card ${selectedPackage?.id === pkg.id ? 'selected' : ''}`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <div className="package-details">
                  <h3 className="package-name">{pkg.name}</h3>
                  <p className="package-description">{pkg.description}</p>
                  <div className="package-meta">
                    <div className="package-duration">
                      <Clock size={14} />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="package-capacity">
                      <Users size={14} />
                      <span>Up to {pkg.maxGuests} guests</span>
                    </div>
                  </div>
                  <div className="package-price">₹ {pkg.price}</div>
                </div>
              </div>
            ))}
          </div>
          
          {selectedPackage && (
            <div className="booking-panel">
              <h3 className="booking-title">Book {selectedPackage.name}</h3>
              
              <div className="booking-form">
                <div className="form-group">
                  <label>Select Date</label>
                  <select 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select a date</option>
                    {availableDates.map(date => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Select Time</label>
                  <select 
                    value={selectedTime} 
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="form-select"
                    disabled={!selectedDate}
                  >
                    <option value="">Select a time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                
                <div className="booking-summary">
                  <div className="summary-row">
                    <span>Package:</span>
                    <span>{selectedPackage.name}</span>
                  </div>
                  <div className="summary-row">
                    <span>Duration:</span>
                    <span>{selectedPackage.duration}</span>
                  </div>
                  <div className="summary-row">
                    <span>Base Price:</span>
                    <span>₹ {selectedPackage.price}</span>
                  </div>

                  <div className="summary-row">
                    <span>GST (18%)</span>
                    <span>₹ {((selectedPackage.price * 18) / 100).toFixed(2)}</span> {/* Calculating 18% GST */}
                  </div>

                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>₹ {((selectedPackage.price * 18) / 100 + selectedPackage.price).toFixed(2)}</span> {/* Base price + GST */}
                  </div>
                </div>
                
                <button 
                  className="book-button"
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleBookParty}
                >
                  Book Party Hall
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .party-page {
          padding: 24px;
        }
        
        .party-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .party-container {
          display: grid;
          gap: 24px;
          margin-top: 24px;
        }
        
        .packages-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        
        .package-card {
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }
        
        .package-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .package-card.selected {
          border-color: var(--primary);
          background-color: var(--primary-light);
        }
        
        .package-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .package-description {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 12px;
        }
        
        .package-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .package-duration, .package-capacity {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .package-price {
          font-weight: 600;
          color: var(--primary);
          font-size: 20px;
        }
        
        .booking-panel {
          background-color: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .booking-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .booking-form {
          display: grid;
          gap: 16px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-weight: 500;
        }
        
        .form-select, .form-control {
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 14px;
        }
        
        .guest-limit {
          font-size: 12px;
          color: var(--text-secondary);
        }
        
        .booking-summary {
          background-color: #f9f9f9;
          padding: 16px;
          border-radius: 6px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .summary-row.total {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
          font-weight: 600;
        }
        
        .summary-row.total span:last-child {
          color: var(--primary);
        }
        
        .book-button {
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 12px;
          font-weight: 500;
          cursor: pointer;
        }
        
        .book-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        @media (min-width: 768px) {
          .party-container {
            grid-template-columns: 2fr 1fr;
            align-items: start;
          }
        }
      `}</style>
    </div>
  );
};

export default PartyHall;