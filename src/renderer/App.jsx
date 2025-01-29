// import 'semantic-ui-css/semantic.min.css'
import React, { useState } from 'react'
import { UserProvider, useUser } from './hooks/UserContext'
// import Sidebar from './components/sidebar/SideBar'
import LoggedNavigation from './routes/LoggedNavigation'
import Home from './screens/Home'

// import './index.css'

function AppContent() {
  const { user } = useUser()

  if (user === 'undefined') return null
  console.log('user', user)

  return user ? <LoggedNavigation /> : <Home />
  // return user ? <LoggedNavigation /> : <h1>Welcome to Home Page</h1>
}

function App() {
  console.log('Rendering App Component')

  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}
export default App
