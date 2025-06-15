import { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';

import { useUser } from "../context/UserContext"; // To get user information
import { db } from "../../../firebase/firebaseConfig.js"; // Assuming you have firebase.js configured with Firestore
import { collection, addDoc, doc, getDocs, updateDoc, where, query, serverTimestamp } from "firebase/firestore"; // Firestore functions


const FitnessCenter = ({ showConfirmation }) => {

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const { user } = useUser();
  
  const fitnessClasses = [
    {
      id: 'yoga',
      name: 'Yoga Class',
      description: 'Relaxing yoga session for all experience levels',
      instructor: 'Sarah Johnson',
      duration: '60 min',
    },
    {
      id: 'hiit',
      name: 'HIIT Workout',
      description: 'High-intensity interval training to boost your metabolism',
      instructor: 'Mike Peterson',
      duration: '45 min',
    },
    {
      id: 'pilates',
      name: 'Pilates',
      description: 'Core-strengthening exercises for improved posture and flexibility',
      instructor: 'Emma Roberts',
      duration: '60 min',
    },
    {
      id: 'zumba',
      name: 'Zumba',
      description: 'Fun dance workout combining Latin and international music',
      instructor: 'Carlos Mendez',
      duration: '45 min',
    },
    {
      id: 'Gym',
      name: 'Gym',
      description: 'Dynamic high-energy gym workout.',
      instructor: 'Sam Lee',
      duration: '60 min',
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
    '08:00 AM',
    '10:00 AM',
    '01:00 PM',
    '03:00 PM',
    '05:00 PM'
  ];
  
  const handleClassSelect = (fitnessClass) => {
    setSelectedClass(fitnessClass);
    setSelectedDate('');
    setSelectedTime('');
  };
  
  // const handleBookClass = () => {
  //   if (selectedClass && selectedDate && selectedTime) {
  //     showConfirmation(
  //       'Booking Confirmation',
  //       `Your ${selectedClass.name} has been booked for ${selectedDate} at ${selectedTime}.`,
  //       () => {
  //         setSelectedClass(null);
  //         setSelectedDate('');
  //         setSelectedTime('');
  //       }
  //     );
  //   }
  // };

  const handleBookFitness = async () => {
    console.log("User object:", user);
  
    if (selectedClass && selectedDate && selectedTime) {
      if (!user || !user.uid) {
        console.error("User is not logged in or user ID is missing.");
        return;
      }
  
      console.log(user.uid);
  
      try {
  
        // Fetch user's current expense from the 'voyagers' collection
        const q = query(collection(db, "voyagers"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          console.error("User document not found in 'voyagers' collection.");
          return;
        }
  
        // const userDocRef = querySnapshot.docs[0].ref;
        // const userData = querySnapshot.docs[0].data();
  
        await addDoc(collection(db, "orders"), {
          uid: user.uid,
          orderType: "Fitness Center Booking", 
          orderCategory: "fitness",
          orderDetails: {
            className: selectedClass.name,
            date: selectedDate,
            time: selectedTime,
            duration: selectedClass.duration,
            price : 0,
          },
          status: "Confirmed",
          createdAt: serverTimestamp(),  // <- use serverTimestamp() instead of new Date()
        });
  
        // Show confirmation
        showConfirmation(
          'Booking Confirmation',
          `Your ${selectedClass.name} has been booked for ${selectedDate} at ${selectedTime}`,
          () => {
            setSelectedClass(null);
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
    <div className="fitness-page">
      <div className="fitness-content">
        <h1 className="section-title">Fitness Center</h1>
        <p className="section-subtitle">Book fitness classes or reserve gym time during your cruise</p>
        
        <div className="tabs">          
          <div className="tab-content">
            <div className="classes-container">
              <div className="classes-list">
                {fitnessClasses.map(fitnessClass => (
                  <div 
                    key={fitnessClass.id} 
                    className={`class-card ${selectedClass?.id === fitnessClass.id ? 'selected' : ''}`}
                    onClick={() => handleClassSelect(fitnessClass)}
                  >
                    <h3 className="class-name">{fitnessClass.name}</h3>
                    <p className="class-description">{fitnessClass.description}</p>
                    <div className="class-details">
                      <div className="class-detail">
                        <User size={14} />
                        <span>{fitnessClass.instructor}</span>
                      </div>
                      <div className="class-detail">
                        <Clock size={14} />
                        <span>{fitnessClass.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedClass && (
                <div className="booking-panel">
                  <h3 className="booking-title">Book {selectedClass.name}</h3>
                  
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
                    
                    <button 
                      className="book-button"
                      disabled={!selectedDate || !selectedTime}
                      onClick={handleBookFitness}
                    >
                      Book Class
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .fitness-page {
          padding: 24px;
        }
        
        .fitness-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .tabs {
          margin-top: 24px;
        }
        
        .tab-list {
          display: flex;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 24px;
        }
        
        .tab {
          padding: 12px 24px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          font-weight: 500;
          cursor: pointer;
        }
        
        .tab.active {
          border-bottom-color: var(--primary);
          color: var(--primary);
        }
        
        .classes-container {
          display: grid;
          gap: 24px;
        }
        
        .classes-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        
        .class-card {
          background-color: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }
        
        .class-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .class-card.selected {
          border-color: var(--primary);
          background-color: var(--primary-light);
        }
        
        .class-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .class-description {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 12px;
        }
        
        .class-details {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }
        
        .class-detail {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .class-availability {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
        
        .availability-label {
          color: var(--text-secondary);
        }
        
        .availability-value {
          font-weight: 500;
        }
        
        .booking-panel {
          background-color: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-top: 24px;
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
        
        .book-button {
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 12px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 8px;
        }
        
        .book-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .gym-container {
          display: grid;
          gap: 24px;
        }
        
        .gym-info {
          background-color: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .gym-info h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        
        .gym-info p {
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        
        .gym-hours {
          background-color: #f9f9f9;
          padding: 16px;
          border-radius: 6px;
        }
        
        .gym-hours h4 {
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .hours-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        
        .reservation-form {
          background-color: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .time-slots {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 8px;
          margin-top: 8px;
        }
        
        .time-slot {
          padding: 8px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .time-slot:hover {
          background-color: var(--primary-light);
          border-color: var(--primary);
          color: var(--primary);
        }
        
        @media (min-width: 768px) {
          .classes-container {
            grid-template-columns: 2fr 1fr;
            align-items: start;
          }
          
          .booking-panel {
            margin-top: 0;
          }
          
          .gym-container {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default FitnessCenter;