import { Link } from 'react-router-dom';
import { Scissors, Dumbbell, PartyPopper, ArrowRight, NotebookPen, Utensils, Clapperboard } from 'lucide-react';

import { useEffect, useState } from "react"
import {
  collection,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig.js"

const Dashboard = () => {

  const [counts, setCounts] = useState({
    movie: 0,
    beauty: 0,
    fitness: 0,
    party: 0,
    stationary: 0,
    catering: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const categoryQueries = {
          movie: query(ordersRef, where("orderCategory", "==", "movie")),
          beauty: query(ordersRef, where("orderCategory", "==", "beauty")),
          fitness: query(ordersRef, where("orderCategory", "==", "fitness")),
          party: query(ordersRef, where("orderCategory", "==", "party")),
          stationary: query(ordersRef, where("orderCategory", "==", "stationary")),
          catering: query(ordersRef, where("orderCategory", "==", "catering")),
        };

        const snapshots = await Promise.all(
          Object.entries(categoryQueries).map(([key, q]) =>
            getCountFromServer(q).then((snap) => [key, snap.data().count])
          )
        );

        const countsObj = Object.fromEntries(snapshots);
        setCounts(countsObj);
      } catch (error) {
        console.error("Error fetching booking counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        <h1 className="section-title">Welcome to Manager Dashboard</h1>
        <h2 className="section-subtitle">Monitor and manage all bookings across the cruise ship</h2>
        
        <div className="dashboard-grid">

          {/* Order Catering Items */}
          <Link to="/voyager/catering" className="service-card">
            <div className="service-icon">
              <Utensils size={24} />
            </div>
            <h3 className="service-title">Catering Item Bookings</h3>
            <div className="service-link">
              {counts.catering}
            </div>
          </Link>
          
          {/* Order Stationary Items */}
          <Link to="/voyager/stationery" className="service-card">
            <div className="service-icon">
              <NotebookPen size={24} />
            </div>
            <h3 className="service-title">Stationery Item Bookings</h3>
            <div className="service-link">
              {counts.stationary}
            </div>
          </Link>
          
          {/* Book Movie Tickets */}
          <Link to="/voyager/movies" className="service-card">
            <div className="service-icon">
              <Clapperboard size={24} />
            </div>
            <h3 className="service-title">Movie Ticket Bookings</h3>
            <div className="service-link">
              {counts.movie}
            </div>
          </Link>
          
          {/* Book Beauty Salon */}
          <Link to='/voyager/beauty' className="service-card">
            <div className="service-icon">
              <Scissors size={24} />
            </div>
            <h3 className="service-title">Beauty Salon Bookings</h3>
            <div className="service-link">
              {counts.beauty}
            </div>
          </Link>
          
          {/* Book Fitness Center */}
          <Link to='/voyager/fitness' className="service-card">
            <div className="service-icon">
              <Dumbbell size={24} />
            </div>
            <h3 className="service-title">Fitness Center Bookings</h3>
            <div className="service-link">
              {counts.fitness}
            </div>
          </Link>
          
          {/* Book Party Hall */}
          <Link to='/voyager/party' className="service-card">
            <div className="service-icon">
              <PartyPopper size={24} />
            </div>
            <h3 className="service-title">Party Hall Bookings</h3>
            <div className="service-link">
              {counts.party}
            </div>
          </Link>

        </div>
      </div>
      
      <style jsx>{`
        .dashboard-page {
          padding: 24px;
          background-color: #f9f9f9;
        }

        .dashboard-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }

        .service-card {
          background: linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          height: 220px;
          color: #333;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 4px solid var(--primary);
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          background: linear-gradient(135deg, #f7f7f7 0%, #ffffff 100%);
        }

        .service-icon {
          color: var(--primary);
          margin-bottom: 16px;
          font-size: 32px;
        }

        .service-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #333;
        }

        .service-link {
          display: flex;
          align-items: center;
          gap: 16px;
          color: var(--primary);
          font-weight: 600;
          font-size: 30px;
          margin-top: auto;
          padding: 10px 0;
          transition: transform 0.3s ease, font-size 0.3s ease, color 0.3s ease;
          text-decoration: none;
        }

        /* Grow the text when hovering over the whole card */
        .service-card:hover .service-link {
          color: var(--secondary);
          font-size: 42px;
          transform: translateX(10px);
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
    </div>
  );
};

export default Dashboard;