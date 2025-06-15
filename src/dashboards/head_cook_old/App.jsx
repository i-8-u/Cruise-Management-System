import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import BreakfastOrders from "./components/BreakfastOrders"
import LunchOrders from "./components/LunchOrders"
import DinnerOrders from "./components/DinnerOrders"
import DrinkOrders from "./components/DrinkOrders"
import PartyOrders from "./components/PartyOrders"
import OrderDetails from "./components/OrderDetails"
import Profile from "./components/Profile"
import AllOrders from "./components/AllOrders"
import './index.css'

// Logout component
const Logout = () => {
  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-pink-500 mb-4">Logging Out...</h1>
      <p className="text-gray-600 mb-6">You will be redirected to the login page.</p>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
  )
}

function HeadCookApp() {
  return (
      <Routes>
        <Route path="/" element={ <Layout> <Dashboard /> </Layout>}/>
        <Route path="/all-orders" element={ <Layout> <AllOrders /> </Layout>}/>
        <Route path="/breakfast-orders" element={ <Layout> <BreakfastOrders /> </Layout>}/>
        <Route path="/lunch-orders" element={ <Layout> <LunchOrders /> </Layout>}/>
        <Route path="/dinner-orders" element={ <Layout> <DinnerOrders /> </Layout>}/>
        <Route path="/drink-orders" element={ <Layout> <DrinkOrders /> </Layout>}/>
        <Route path="/party-orders" element={ <Layout> <PartyOrders /> </Layout>}/>
        <Route path="/order/:id" element={ <Layout> <OrderDetails /> </Layout>}/>
        <Route path="/profile" element={ <Layout> <Profile /> </Layout>}/>
        <Route path="/logout" element={ <Layout> <Logout /> </Layout>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  )
}

export default HeadCookApp
