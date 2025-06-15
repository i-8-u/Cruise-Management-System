import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { OrderProvider } from "./context/OrderContext"
import Dashboard from "./pages/Dashboard"
import AllOrders from "./pages/AllOrders"
import BreakfastOrders from "./pages/BreakfastOrders"
import LunchOrders from "./pages/LunchOrders"
import DinnerOrders from "./pages/DinnerOrders"
import DrinkOrders from "./pages/DrinkOrders"
import PartyHallOrders from "./pages/PartyHallOrders"
import OrderDetails from "./pages/OrderDetails"
import Profile from "./pages/Profile"

import { UserProvider } from "./context/UserContext.jsx";

function HeadCookApp() {
  return (
    <UserProvider>
      <OrderProvider>
          <Routes>
            <Route path="/" element={<Navigate to="headCook/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-orders" element={<AllOrders />} />
            <Route path="/breakfast-orders" element={<BreakfastOrders />} />
            <Route path="/lunch-orders" element={<LunchOrders />} />
            <Route path="/dinner-orders" element={<DinnerOrders />} />
            <Route path="/drink-orders" element={<DrinkOrders />} />
            <Route path="/party-hall-orders" element={<PartyHallOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/headCook/dashboard" replace />} />
          </Routes>
      </OrderProvider>
    </UserProvider>
  )
}

export default HeadCookApp
