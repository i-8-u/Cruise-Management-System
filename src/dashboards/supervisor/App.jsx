import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import StationeryOrders from "./pages/StationeryOrders"
import Profile from "./pages/Profile"

import { UserProvider } from "./contexts/UserContext";

function SupervisorApp() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StationeryOrders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
    </Routes>
    </UserProvider>
  )
}

export default SupervisorApp
