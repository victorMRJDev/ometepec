// import React, { createContext, useContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// // Proveedor del contexto
// export function UserProvider({ children }) {
//   // 1. Carga el usuario inicial desde localStorage (si existe)
//   const [user, setUserState] = useState(() => {
//     const storedUser = localStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // 2. Función para setear usuario y persistir en localStorage
//   const setUser = (userData) => {
//     setUserState(userData);
//     if (userData) {
//       // Si tenemos usuario, lo guardamos como string en localStorage
//       localStorage.setItem('user', JSON.stringify(userData));
//     } else {
//       // Si es null o undefined, significa “deslogueo”, así que limpiamos
//       localStorage.removeItem('user');
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// // Hook para usar el contexto
// export function useUser() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser debe ser utilizado dentro de UserProvider');
//   }
//   return context;
// }

import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

// Proveedor del contexto
export function UserProvider({ children }) {
  // Estado inicial seguro
  const [user, setUserState] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
      console.error('Error al parsear el usuario almacenado:', error)
      return null
    }
  })

  // Función para setear usuario y persistir en localStorage
  const setUser = (userData) => {
    setUserState(userData)
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  }

  // Sincronizar usuario con cambios en localStorage
  useEffect(() => {
    const syncUser = () => {
      try {
        const storedUser = localStorage.getItem('user')
        setUserState(storedUser ? JSON.parse(storedUser) : null)
      } catch (error) {
        console.error('Error al sincronizar usuario:', error)
      }
    }

    window.addEventListener('storage', syncUser)
    return () => window.removeEventListener('storage', syncUser)
  }, [])

  // Diagnóstico de cambios en el usuario
  useEffect(() => {
    console.log('Usuario actualizado:', user)
  }, [user])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

// Hook para usar el contexto
export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de UserProvider')
  }
  return context
}
