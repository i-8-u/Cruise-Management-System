import { Routes, Route } from "react-router-dom"

import AdminApp from './dashboards/admin/App.jsx'
import HeadCookApp from './dashboards/head_cook/App.jsx'
import ManagerApp from './dashboards/manager/App.jsx'
import SupervisorApp from './dashboards/supervisor/App.jsx'
import VoyagerApp from './dashboards/voyager/App.jsx'
import WelcomeApp from './dashboards/welcome/App.jsx'

import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/headCook/*" element={<HeadCookApp />} />
        <Route path="/manager/*" element={<ManagerApp />} />
        <Route path="/supervisor/*" element={<SupervisorApp />} />
        <Route path="/voyager/*" element={<VoyagerApp />} />
        <Route path="/*" element={<WelcomeApp />} />
      </Routes>
      <Analytics/>
    </>
  )
}

export default App
