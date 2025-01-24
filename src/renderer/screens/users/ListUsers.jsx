import React, { useEffect, useState } from 'react'
import { ListUsersComp } from '../../components/modalUsers/ListUsersComp'
import { Loader, Message } from 'semantic-ui-react'

export const ListUsers = () => {
  const [requestsData, setRequestsData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await window.api.getUsers()

      if (response.success) {
        const dataProcesada = response.data.map((users, index) => {
          return {
            ...users
          }
        })

        setRequestsData(dataProcesada)
      } else {
        setError(response.error || 'Error desconocido al obtener usuarios.')
      }
    } catch (err) {
      setError(err.message || 'Error inesperado al obtener usuarios.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="flex">
      {/* Contenido Principal */}
      <div className="flex-1 min-h-screen py-10 px-6 bg-gray-100">
        {isLoading ? (
          <Loader active inline="centered" content="Cargando usuarios..." />
        ) : error ? (
          <Message negative>
            <Message.Header>Error al Obtener Usuarios</Message.Header>
            <p>{error}</p>
          </Message>
        ) : (
          <ListUsersComp requests={requestsData} />
        )}
      </div>
    </div>
  )
}
