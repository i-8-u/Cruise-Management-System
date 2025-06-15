import { useState, useEffect } from "react"
import { Utensils, FileText, Users, Film, Scissors, Dumbbell, PartyPopper } from "lucide-react"
import Header from "../components/Header"
import StatCard from "../components/StatCard"
import ServiceCard from "../components/ServiceCard"
import ActionCard from "../components/ActionCard"
import "../index.css"

// Firebase
import { db } from '../../../firebase/firebaseConfig.js'; // Adjust the import path if needed
import { collection, getDocs, query, where } from 'firebase/firestore';

const Dashboard = ({ user }) => {
  const [totalVoyagers, setTotalVoyagers] = useState(0);
  const [totalStationaryOrders, setStationaryOrders] = useState(0)
  const [totalCateringOrders, setCateringOrders] = useState(0)
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get total voyagers
        const voyagersSnapshot = await getDocs(collection(db, 'voyagers'));
        setTotalVoyagers(voyagersSnapshot.size);
  
        const ordersRef = collection(db, "orders");
  
        // Get total stationary orders
        const stationaryQuery = query(ordersRef, where("orderCategory", "==", "stationary"));
        const stationarySnapshot = await getDocs(stationaryQuery);
        setStationaryOrders(stationarySnapshot.size);
        console.log("Stationary orders:", stationarySnapshot.size);
  
        // Get total catering orders
        const cateringQuery = query(ordersRef, where("orderCategory", "==", "catering"));
        const cateringSnapshot = await getDocs(cateringQuery);
        setCateringOrders(cateringSnapshot.size);
        console.log("Catering orders:", cateringSnapshot.size);
  
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    fetchData();
  }, []);
  
  


  return (
    <div>
      <Header
        title="Welcome to Voyager Admin Dashboard"
        subtitle="Manage your cruise ship services and voyagers"
        user={user}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Catering Items"
          count={totalCateringOrders}
          description="Total menu items available"
          icon={<Utensils className="w-6 h-6" />}
          linkText="View all items"
          linkTo="/admin/catering"
        />
        <StatCard
          title="Stationery Items"
          count={totalStationaryOrders}
          description="Total stationery products"
          icon={<FileText className="w-6 h-6" />}
          linkText="View all stationery items"
          linkTo="/admin/stationery"
        />
        <StatCard
          title="Registered Voyagers"
          count={totalVoyagers}
          description="Active voyagers on cruise"
          icon={<Users className="w-6 h-6" />}
          linkText="View all voyagers"
          linkTo="/admin/voyagers"
        />
      </div>

      {/* Services Management */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Services Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ServiceCard
          title="Movie Tickets"
          description="Manage movie screenings and ticket availability"
          icon={<Film className="w-6 h-6" />}
          linkTo="/admin/movie-tickets"
        />
        <ServiceCard
          title="Beauty Salon"
          description="Manage salon services and appointment slots"
          icon={<Scissors className="w-6 h-6" />}
          linkTo="/admin/beauty-salon"
        />
        <ServiceCard
          title="Fitness Center"
          description="Manage gym sessions and fitness classes"
          icon={<Dumbbell className="w-6 h-6" />}
          linkTo="/admin/fitness-center"
        />
        <ServiceCard
          title="Party Hall"
          description="Manage party hall bookings and events"
          icon={<PartyPopper className="w-6 h-6" />}
          linkTo="/admin/party-hall"
        />
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard 
          title="Add New Catering Item" 
          description="Create a new menu item" 
          linkTo="/admin/catering/add" 
        />
        <ActionCard
          title="Add New Stationery Item"
          description="Create a new stationery product"
          linkTo="/admin/stationery/add"
        />
        <ActionCard
          title="Register New Voyager"
          description="Add a new passenger to the system"
          linkTo="/admin/voyagers/add"
        />
      </div>

    </div>
  )
}

export default Dashboard
