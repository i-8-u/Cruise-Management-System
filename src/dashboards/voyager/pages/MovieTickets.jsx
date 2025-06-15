import { useState } from 'react';
import { Clock, Star } from 'lucide-react';

import { useUser } from "../context/UserContext"; // To get user information
import { db } from "../../../firebase/firebaseConfig.js"; // Assuming you have firebase.js configured with Firestore
import { collection, addDoc, doc, getDocs, updateDoc, where, query, serverTimestamp } from "firebase/firestore"; // Firestore functions

const MovieTickets = ({ showConfirmation }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);

  const { user } = useUser();
  
  const movies = [
    {
      id: 'the-accountant-2',
      title: "The Accountant 2",
      genre: 'Action/Thriller',
      image: 'https://m.media-amazon.com/images/M/MV5BYjFiY2I0NTEtNjdjNy00MTljLThkOWYtMzNiYjYyMDcxYjhkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      rating: 7.2,
      duration: '2h 5m',
      showtimes: ['10:00 AM', '5:00 PM'],
      screen: 'S-2'
    },
    {
      id: 'dune-part-2',
      title: 'Dune Part-2',
      genre: 'Sci-fi/Adventure',
      image: 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      rating: 8.5,
      duration: '2h 46m',
      showtimes: ['11:30 AM', '3:00 PM'],
      screen: 'S-1'
    },
    {
      id: 'chhavva',
      title: 'Chhavva',
      genre: 'Adventure/Drama',
      image: 'https://m.media-amazon.com/images/M/MV5BMDMyZjFmZTctNDAxYi00MWM3LWJiYmItM2VhNWZiM2IwNjNlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      rating: 7.4,
      duration: '2h 35m',
      showtimes: ['09:00 AM', '4:15 PM'],
      screen: 'S-2'
    }
  ];
  
  const handleViewShowtimes = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };
  
  const handleSelectShowtime = (showtime) => {
    setSelectedShowtime(showtime);
  };
  
  const handleBookMovie = async () => {
    console.log("User object:", user);
  
    if (selectedMovie && selectedShowtime) {
      if (!user || !user.uid) {
        console.error("User is not logged in or user ID is missing.");
        return;
      }
  
      console.log(user.uid);
  
      try {
        const gstAmount = ((selectedMovie.price * 18) / 100);
        const totalAmount = selectedMovie.price + gstAmount;
  
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
          uid: user.uid,
          orderType: "Movie Booking", 
          orderCategory: "movie",
          orderDetails: {
            movieId: selectedMovie.id,
            movieName: selectedMovie.title,
            time: selectedShowtime,
            duration: selectedMovie.duration,
            price: 0,
            ticketCount: ticketCount,
            screen : selectedMovie.screen,
            date: new Date().toLocaleDateString(),
          },
          status: "Confirmed",
          createdAt: serverTimestamp(),
        });
  
        // Show confirmation
        showConfirmation(
          'Booking Confirmation',
          `${selectedMovie.ticketCount} tickets for ${selectedMovie.name} has been booked today at ${selectedShowtime}`,
          () => {
            setSelectedMovie(null);
            setSelectedShowtime('');
            setTicketCount('');
          }
        );
      } catch (error) {
        console.error("Error booking party hall:", error);
      }
    } else {
      console.error("Please select a service, date, and time before booking.");
    }
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} fill="#FFD700" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="half-star">
          <Star size={16} fill="#FFD700" />
          <Star size={16} className="empty-half" />
        </div>
      );
    }
    
    return stars;
  };
  
  return (
    <div className="movie-tickets-page">
      <div className="movie-content">
        <h1 className="section-title">Movie Theater</h1>
        <p className="section-subtitle">Book tickets for the latest movies at our onboard cinema</p>
        
        <div className="movies-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                <div className="rating-badge">{movie.rating_code}</div>
                <img src={movie.image} alt={movie.title} />
              </div>
              <div className="movie-details">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-meta">
                  <span className="movie-genre">{movie.genre}</span>
                  <div className="movie-duration">
                    <Clock size={14} />
                    <span>{movie.duration}</span>
                  </div>
                </div>
                <div className="movie-rating">
                  <div className="stars">{renderStars(movie.rating)}</div>
                  <span className="rating-value">{movie.rating}</span>
                </div>
                <button 
                  className="view-showtimes-btn"
                  onClick={() => handleViewShowtimes(movie)}
                >
                  View Showtimes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showModal && selectedMovie && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedShowtime 
                  ? `Select Tickets for ${selectedMovie.title}` 
                  : `Showtimes for ${selectedMovie.title}`}
              </h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowModal(false);
                  setSelectedShowtime(null);
                  setTicketCount(1);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {!selectedShowtime ? (
                <div className="showtimes-container">
                  <h4>Available Showtimes for Today</h4>
                  <div className="showtimes-grid">
                    {selectedMovie.showtimes.map(time => (
                      <button
                        key={time}
                        className="showtime-btn"
                        onClick={() => handleSelectShowtime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="ticket-selection">
                  <h4>Select Number of Tickets</h4>
                  <div className="ticket-count">
                    <button 
                      className="ticket-count-btn"
                      onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="ticket-count-value">{ticketCount}</span>
                    <button 
                      className="ticket-count-btn"
                      onClick={() => setTicketCount(prev => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="ticket-summary">
                    <div className="summary-row">
                      <span>Movie:</span>
                      <span>{selectedMovie.title}</span>
                    </div>
                    <div className="summary-row">
                      <span>Showtime:</span>
                      <span>{selectedShowtime}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {selectedShowtime ? (
                <>
                  <button 
                    className="btn-secondary"
                    onClick={() => setSelectedShowtime(null)}
                  >
                    Back
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={handleBookMovie}
                  >
                    Book Tickets
                  </button>
                </>
              ) : (
                <button 
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      
      <style jsx>{`
        .movie-tickets-page {
          padding: 24px;
        }
        
        .movie-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .movies-grid {
          display: grid;
          gap: 24px;
          margin-top: 24px;
        }
        
        .movie-card {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .movie-poster {
          position: relative;
          height: 200px;
          background-color: #f0f0f0;
        }
        
        .movie-poster img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .rating-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: var(--primary);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .movie-details {
          padding: 16px;
        }
        
        .movie-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .movie-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .movie-duration {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .movie-description {
          margin-bottom: 12px;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        
        .movie-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .stars {
          display: flex;
        }
        
        .half-star {
          position: relative;
          display: inline-block;
        }
        
        .empty-half {
          position: absolute;
          top: 0;
          left: 0;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
          color: #e0e0e0;
        }
        
        .rating-value {
          font-weight: 600;
        }
        
        .view-showtimes-btn {
          width: 100%;
          padding: 10px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .view-showtimes-btn:hover {
          background-color: var(--primary-dark);
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
          font-size: 24px;
          cursor: pointer;
          color: var(--text-secondary);
        }
        
        .modal-body {
          padding: 24px;
        }
        
        .modal-body h4 {
          margin-bottom: 16px;
          font-weight: 600;
        }
        
        .showtimes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .showtime-btn {
          padding: 10px;
          background-color: var(--primary-light);
          color: var(--primary);
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .showtime-btn:hover {
          background-color: var(--primary);
          color: white;
        }
        
        .ticket-count {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .ticket-count-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--primary-light);
          color: var(--primary);
          border: none;
          border-radius: 50%;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .ticket-count-btn:hover {
          background-color: var(--primary);
          color: white;
        }
        
        .ticket-count-value {
          font-size: 18px;
          font-weight: 600;
        }
        
        .ticket-summary {
          background-color: #f9f9f9;
          padding: 16px;
          border-radius: 8px;
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
        
        @media (min-width: 768px) {
          .movies-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default MovieTickets;