import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logoGro from '../../../assets/logos/logo_fRojo.jpg'

import { useUser } from '../../hooks/UserContext'

const { App } = window

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [showPlacas, setShowPlacas] = useState(false) // estado para el submenú

  const toggleSidebar = () => setIsOpen(!isOpen)

  const navigate = useNavigate()

  const { user, setUser } = useUser()

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="flex h-screen ">
      {/* Botón de toggle */}
      <button
        className="absolute top-4 left-4 z-10 p-2 bg-blue-600 text-white rounded-md sm:hidden max-sm:hidden lg:hidden"
        onClick={toggleSidebar}
      >
        {/* <FaBars size={20} /> */}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-pantone207C text-white flex flex-col transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 lg:translate-x-0 lg:static w-64`}
      >
        <div className="h-48 flex items-center justify-center text-xl font-bold bg-">
          <img src={logoGro} alt="logo" className="w-11/12 h-4/6" />
        </div>
        <nav className="flex-1 mt-4">
          <ul className="flex flex-col gap-4 px-4">
            <li
              onClick={() => navigate('/')}
              className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-pantone465C-60 cursor-pointer"
            >
              {/* <FaHome size={20} /> */}
              <span>Inicio</span>
            </li>
            <li
              onClick={() => navigate('/addLicense')}
              // onClick={() => console.log('PRESIONADO')}
              className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-pantone465C-60 cursor-pointer"
            >
              {/* <FaHome size={20} /> */}
              <span>Dar de alta</span>
            </li>
            <li
              onClick={() => navigate('/history')}
              className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-pantone465C-60 cursor-pointer"
            >
              {/* <FaHistory size={20} /> */}
              <span>Historial de licencias</span>
            </li>
            <li
              onClick={() => navigate('/profile')}
              className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-pantone465C-60 cursor-pointer"
            >
              {/* <FaUserAlt size={20} /> */}
              <span>Perfil</span>
            </li>
            {user?.rolUsuario === 'administrador' && (
              <li
                onClick={() => navigate('/usersystem')}
                className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-pantone465C-60 cursor-pointer"
              >
                {/* <FaCog size={20} /> */}
                <span>Usuarios del sistema</span>
              </li>
            )}

            <li className="flex flex-col gap-0">
              <div
                onClick={() => setShowPlacas(!showPlacas)}
                className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-pantone465C-60 cursor-pointer"
              >
                <span>Placas</span>
              </div>
              {showPlacas && (
                <ul className="ml-6">
                  <li
                    onClick={() => navigate('/placas/add')}
                    className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-pantone465C-60 cursor-pointer"
                  >
                    <span>Agregar</span>
                  </li>
                  <li
                    onClick={() => navigate('/placas/printPerm')}
                    className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-pantone465C-60 cursor-pointer"
                  >
                    <span>Descargar Permisos</span>
                  </li>
                  <li
                    onClick={() => navigate('/placas/history')}
                    className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-pantone465C-60 cursor-pointer"
                  >
                    <span>Historial</span>
                  </li>
                </ul>
              )}
            </li>
            <li
              onClick={handleLogout}
              className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-pantone465C-60 cursor-pointer"
            >
              <span>Cerrar sesión</span>
            </li>
          </ul>
        </nav>
        <div className="h-16 flex items-center justify-center bg-pantone207C">
          <p className="text-sm">Ages 2024</p>
        </div>
      </aside>

      {/* Contenido principal */}
      {/* <main className="flex-1 bg-white p-8">
        <Listado />
      </main> */}
    </div>
  )
}

export default Sidebar
