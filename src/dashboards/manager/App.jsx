import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import MovieBookings from "./pages/MovieBookings";
import SalonBookings from "./pages/SalonBookings";
import FitnessBookings from "./pages/FitnessBookings";
import PartyHallBookings from "./pages/PartyHallBookings";
import Profile from "./pages/Profile";

import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header"; // Import the new Header component

function App() {
  return (
    <UserProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />

          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/movie-bookings" element={<MovieBookings />} />
              <Route path="/salon-bookings" element={<SalonBookings />} />
              <Route path="/fitness-bookings" element={<FitnessBookings />} />
              <Route path="/party-hall-bookings" element={<PartyHallBookings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
