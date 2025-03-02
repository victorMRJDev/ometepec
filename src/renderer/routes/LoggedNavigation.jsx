import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HashRouter, Routes, Route } from 'react-router-dom'

import History from '../screens/historyLicen/History'
import ProfileUser from '../screens/profile/ProfileUser'
import Home from '../screens/Home'
import Listado from '../screens/ListPeticiones'
import Sidebar from '../components/sidebar/SideBar'
import AddLicencia from '../screens/solicitarLicencia/AddLicencia'
import  {ListUsers}  from '../screens/users/ListUsers'
import AddSolicitudPlacas from '../screens/addPlacas/AddSolicitudPlacas'
import GenerateReports from '../screens/addPlacas/GererateReports'
import AddUser from '../screens/registerUser/AddUser'
import HistoryPlacas from '../screens/addPlacas/HistoryPlacas'
import GenerateReportsLicenses from '../screens/historyLicen/GererateReportsLicenses'


const LoggedNavigation = () => {
  return (
    <HashRouter>
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Listado />} />
            <Route path="/addLicense" element={<AddLicencia />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<ProfileUser />} />
            <Route path="/usersystem" element={<ListUsers />} />
            <Route path="/placas/add" element={<AddSolicitudPlacas />} />
            <Route path="/placas/printPerm" element={<GenerateReports />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/generatereportlicenses" element={<GenerateReportsLicenses />} />
            <Route path="/placas/history" element={<HistoryPlacas />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}
export default LoggedNavigation
