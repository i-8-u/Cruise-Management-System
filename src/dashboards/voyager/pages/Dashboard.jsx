import { Link } from 'react-router-dom';
import { Scissors, Dumbbell, PartyPopper, ArrowRight, NotebookPen, Utensils, Clapperboard } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        <h1 className="section-title">Welcome to Your Voyager Dashboard</h1>
        <h2 className="section-subtitle">Enjoy your cruise experience with our premium services</h2>
        
        <div className="dashboard-grid">

          {/* Order Catering Items */}
          <Link to="/voyager/catering" className="service-card">
            <div className="service-icon">
              <Utensils size={24} />
            </div>
            <h3 className="service-title">Order Catering Items</h3>
            <p className="service-description">
              Order delicious meals and snacks delivered to your cabin.
              Enjoy gourmet dining at your convenience.
            </p>
            <div className="service-link">
              <span>Book Now</span>
              <ArrowRight size={16} />
            </div>
          </Link>
          
          {/* Order Stationary Items */}
          <Link to="/voyager/stationery" className="service-card">
            <div className="service-icon">
              <NotebookPen size={24} />
            </div>
            <h3 className="service-title">Order Stationery Items</h3>
            <p className="service-description">
              Request notebooks, pens, and other stationery items. Perfect
              for journaling your voyage.
            </p>
            <div className="service-link">
              <span>Book Now</span>
              <ArrowRight size={16} />
            </div>
          </Link>
          
          {/* Book Movie Tickets */}
          <Link to="/voyager/movies" className="service-card">
            <div className="service-icon">
              <Clapperboard size={24} />
            </div>
            <h3 className="service-title">Book Movie Tickets</h3>
            <p className="service-description">
              Book tickets for the latest movies at our onboard cinema.
              Experience blockbusters at sea.
            </p>
            <div className="service-link">
              <span>Book Now</span>
              <ArrowRight size={16} />
            </div>
          </Link>
          
          {/* Book Beauty Salon */}
          <Link to='/voyager/beauty' className="service-card">
            <div className="service-icon">
              <Scissors size={24} />
            </div>
            <h3 className="service-title">Book Beauty Salon</h3>
            <p className="service-description">
              Schedule appointments for hair styling, manicures, and more.
              Look your best for special evenings.
            </p>
            <div className="service-link">
              <span>Book Now</span>
              <ArrowRight size={16} />
            </div>
          </Link>
          
          {/* Book Fitness Center */}
          <Link to='/voyager/fitness' className="service-card">
            <div className="service-icon">
              <Dumbbell size={24} />
            </div>
            <h3 className="service-title">Book Fitness Center</h3>
            <p className="service-description">
              Reserve time slots for gym sessions or fitness classes. Stay
              active while cruising.
            </p>
            <div className="service-link">
              <span>Book Now</span>
              <ArrowRight size={16} />
            </div>
          </Link>
          
          {/* Book Party Hall */}
          <Link to='/voyager/party' className="service-card">
            <div className="service-icon">
              <PartyPopper size={24} />
            </div>
            <h3 className="service-title">Book Party Hall</h3>
            <p className="service-description">
              Book our party hall for celebrations and special events.
              Create unforgettable memories.
            </p>
            <div className="service-link">
              <span>Book Now</span>
              <ArrowRight size={16} />
            </div>
          </Link>

        </div>
      </div>
      
      <style jsx>{`
        .dashboard-page {
          padding: 24px;
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
          background-color: var(--card-bg);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          height: 100%;
        }
        
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .service-icon {
          color: var(--primary);
          margin-bottom: 16px;
        }
        
        .service-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        
        .service-description {
          color: var(--text-secondary);
          margin-bottom: 16px;
          font-size: 14px;
          line-height: 1.5;
          flex-grow: 1;
        }
        
        .service-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--primary);
          font-weight: 500;
          font-size: 14px;
          margin-top: auto;
        }
        
        .service-link:hover {
          text-decoration: underline;
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