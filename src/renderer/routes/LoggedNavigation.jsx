import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HashRouter, Routes, Route } from 'react-router-dom'

import History from '../screens/historyLicen/History'
import ProfileUser from '../screens/profile/ProfileUser'
import Home from '../screens/Home'
import Listado from '../screens/ListPeticiones'
import Sidebar from '../components/sidebar/SideBar'
import AddLicencia from '../screens/solicitarLicencia/AddLicencia'
import { ListUsers } from '../screens/users/ListUsers'
import AddSolicitudPlacas from '../screens/addPlacas/AddSolicitudPlacas'
import GenerateReports from '../screens/addPlacas/GererateReports'


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
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}
export default LoggedNavigation

// import React from 'react';
// import { HashRouter as Router, Routes, Route } from 'electron-router-dom';
// import Sidebar from '../components/sidebar/SideBar';
// import History from '../screens/historyLicen/History';
// import ProfileUser from '../screens/profile/ProfileUser';
// import Home from '../screens/Home';
// import Listado from '../screens/ListPeticiones';
// import AddLicencia from '../screens/solicitarLicencia/AddLicencia';
// import { ListUsers } from '../screens/users/ListUsers';
// import AddSolicitudPlacas from '../screens/addPlacas/AddSolicitudPlacas';
// import GenerateReports from '../screens/addPlacas/GererateReports';

// const LoggedNavigation = () => {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1">
//           <Routes>
//             <Route path="/" element={<Listado />} />
//             <Route path="/addLicense" element={<AddLicencia />} />
//             <Route path="/history" element={<History />} />
//             <Route path="/profile" element={<ProfileUser />} />
//             <Route path="/usersystem" element={<ListUsers />} />
//             <Route path="/placas/add" element={<AddSolicitudPlacas />} />
//             <Route path="/placas/printPerm" element={<GenerateReports />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default LoggedNavigation;
