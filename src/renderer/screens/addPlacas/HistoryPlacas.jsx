import React, { useState, useEffect } from 'react'
import ListadoPlacas from '../../components/placas/ListadoPlacas'
import { Message, Loader } from 'semantic-ui-react'

const HistoryPlacas = () => {
  const [requestsData, setRequestsData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const convertirFecha = (fecha) => {
    if (!fecha) return 'No especificada'

    let fechaStr

    if (typeof fecha === 'string') {
      fechaStr = fecha
    } else if (fecha instanceof Date) {
      // Convertir el objeto Date a 'YYYY-MM-DD'
      const year = fecha.getFullYear()
      const month = String(fecha.getMonth() + 1).padStart(2, '0') // Los meses en JavaScript van de 0 a 11
      const day = String(fecha.getDate()).padStart(2, '0')
      // fechaStr = `${day}-${month}-${year}`
      fechaStr = `${year}-${month}-${day}`
    } else {
      return 'Formato inválido'
    }

    const partes = fechaStr.split('-')
    if (partes.length !== 3) {
      return 'Formato inválido'
    }

    // const [dia, mes, anio] = partes
    const [anio, mes, dia] = partes

    // Validar que anio, mes y dia sean números válidos
    if (
      isNaN(anio) ||
      isNaN(mes) ||
      isNaN(dia) ||
      anio.length !== 4 ||
      mes.length !== 2 ||
      dia.length !== 2
    ) {
      return 'Formato inválido'
    }

    return `${anio}-${mes}-${dia}`
  }

  const fetchLicencias = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await window.api.getPermisos()

      if (response.success) {
        const dataProcesada = response.data.map((permiso, index) => {
          const fechaConvertida = convertirFecha(permiso.fechaExpedicion)
          const fechaVen = convertirFecha(permiso.fechaVencimiento)

          return {
            ...permiso,
            fechaExpedicion: fechaConvertida,
            fechaVencimiento: fechaVen
          }
        })

        setRequestsData(dataProcesada)
      } else {
        setError(response.error || 'Error desconocido al obtener los permisos.')
      }
    } catch (err) {
      setError(err.message || 'Error inesperado al obtener los permisos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLicencias()
  }, [])

  return (
    <div className="flex">
      {/* Contenido Principal */}
      <div className="flex-1 min-h-screen py-10 px-6 bg-gray-100">
        {isLoading ? (
          <Loader active inline="centered" content="Cargando licencias..." />
        ) : error ? (
          <Message negative>
            <Message.Header>Error al Obtener los Permisos</Message.Header>
            <p>{error}</p>
          </Message>
        ) : (
          <ListadoPlacas requests={requestsData} />
        )}
      </div>
    </div>
  )
}

export default HistoryPlacas
