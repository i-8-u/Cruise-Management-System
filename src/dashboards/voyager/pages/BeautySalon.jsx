import { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';

import { useUser } from "../context/UserContext"; // To get user information
import { db } from "../../../firebase/firebaseConfig.js"; // Assuming you have firebase.js configured with Firestore
import { collection, addDoc, doc, getDocs, updateDoc, where, query, serverTimestamp } from "firebase/firestore"; // Firestore functions

const BeautySalon = ({ showConfirmation }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const { user } = useUser();
  
  const beautyServices = [
    {
      id: 'haircut',
      name: 'Haircut & Styling',
      description: 'Professional haircut and styling by our expert stylists',
      duration: '60 min',
      price: 450
    },
    {
      id: 'manicure',
      name: 'Manicure',
      description: 'Nail care treatment including filing, shaping, and polish',
      duration: '45 min',
      price: 700
    },
    {
      id: 'pedicure',
      name: 'Pedicure',
      description: 'Foot care treatment including soak, exfoliation, and polish',
      duration: '60 min',
      price: 1000
    },
    {
      id: 'facial',
      name: 'Facial Treatment',
      description: 'Rejuvenating facial treatment customized for your skin type',
      duration: '75 min',
      price: 1400
    },
    {
      id: 'massage',
      name: 'Relaxing Massage',
      description: 'Therapeutic massage to relieve tension and promote relaxation',
      duration: '60 min',
      price: 2500
    }
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
  
  const availableTimes = [
    '09:00 AM',
    '10:30 AM',
    '12:00 PM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM'
  ];
  
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedDate('');
    setSelectedTime('');
  };
  
  const handleBookBeautySalon = async () => {
    console.log("User object:", user);
  
    if (selectedService && selectedDate && selectedTime) {
      if (!user || !user.uid) {
        console.error("User is not logged in or user ID is missing.");
        return;
      }
  
      console.log(user.uid);
  
      try {
        const gstAmount = ((selectedService.price * 18) / 100);
        const totalAmount = selectedService.price + gstAmount;
  
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
          orderType: "Beauty Salon Booking", 
          orderCategory: "beauty",        // this will be "party" or "catering" or "stationary" etc.
          orderDetails: {
            serviceName: selectedService.name,
            date: selectedDate,
            time: selectedTime,
            duration: selectedService.duration,
            price: totalAmount,
          },
          status: "Confirmed",
          createdAt: serverTimestamp(),  // <- use serverTimestamp() instead of new Date()
        });
  
        // Show confirmation
        showConfirmation(
          'Booking Confirmation',
          `Your ${selectedService.name} has been booked for ${selectedDate} at ${selectedTime}`,
          () => {
            setSelectedService(null);
            setSelectedDate('');
            setSelectedTime('');
          }
        );
      } catch (error) {
        console.error("Error booking party hall:", error);
      }
    } else {
      console.error("Please select a service, date, and time before booking.");
    }
  };
  
  return (
    <div className="beauty-page">
      <div className="beauty-content">
        <h1 className="section-title">Beauty Salon</h1>
        <p className="section-subtitle">Book beauty and spa services during your cruise</p>
        
        <div className="beauty-container">
          <div className="services-list">
            {beautyServices.map(service => (
              <div 
                key={service.id} 
                className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                onClick={() => handleServiceSelect(service)}
              >
                <div className="service-details">
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-meta">
                    <div className="service-duration">
                      <Clock size={14} />
                      <span>{service.duration}</span>
                    </div>
                    <div className="service-price">₹ {service.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selectedService && (
            <div className="booking-panel">
              <h3 className="booking-title">Book {selectedService.name}</h3>
              
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
                    <span>Service:</span>
                    <span>{selectedService.name}</span>
                  </div>
                  <div className="summary-row">
                    <span>Duration:</span>
                    <span>{selectedService.duration}</span>
                  </div>
                  <div className="summary-row">
                    <span>Price:</span>
                    <span>₹ {selectedService.price}</span>
                  </div>
                  <div className="summary-row">
                    <span>GST (18%)</span>
                    <span>₹ {((selectedService.price * 18) / 100).toFixed(2)}</span> {/* Calculating 18% GST */}
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>₹ {((selectedService.price * 18) / 100 + selectedService.price).toFixed(2)}</span> {/* Base price + GST */}
                  </div>
                </div>
                
                <button 
                  className="book-button"
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleBookBeautySalon}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .beauty-page {
          padding: 24px;
        }
        
        .beauty-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .beauty-container {
          display: grid;
          gap: 24px;
          margin-top: 24px;
        }
        
        .services-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        
        .service-card {
          background-color: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }
        
        .service-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .service-card.selected {
          border-color: var(--primary);
          background-color: var(--primary-light);
        }
        
        .service-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .service-description {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 12px;
        }
        
        .service-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .service-duration {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .service-price {
          font-weight: 600;
          color: var(--primary);
          font-size: 18px;
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
        
        .form-select {
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 14px;
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
        
        .summary-row:last-child {
          margin-bottom: 0;
          font-weight: 600;
        }
        
        .summary-row:last-child span:last-child {
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
          .beauty-container {
            grid-template-columns: 2fr 1fr;
            align-items: start;
          }
        }
      `}</style>
    </div>
  );
};

export default BeautySalon;