import LicenseRequestList from '../components/listadoLicencias/Listado'
import Sidebar from '../components/sidebar/SideBar'

import React, { useEffect, useState } from 'react'
import { Message, Loader, Button } from 'semantic-ui-react'

const Listado = () => {
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

  const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0') // Mes de 0 a 11, ajustado
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Definir fetchLicencias fuera de useEffect
  const fetchLicencias = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await window.api.getLicencias()

      if (response.success) {
        const currentDate = getCurrentDate()
        const dataProcesada = response.data.map((licencia, index) => {
          const fechaConvertida = convertirFecha(licencia.fechaNacimiento)
          const fechaVencimConvert = convertirFecha(licencia.fechaVencimiento)
          return {
            ...licencia,
            fechaNacimiento: fechaConvertida,
            fechaExpedicion: currentDate,
            fechaVencimiento: fechaVencimConvert
          }
        })

        setRequestsData(dataProcesada)
      } else {
        setError(response.error || 'Error desconocido al obtener licencias.')
      }
    } catch (err) {
      setError(err.message || 'Error inesperado al obtener licencias.')
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
            <Message.Header>Error al Obtener Licencias</Message.Header>
            <p>{error}</p>
          </Message>
        ) : (
          <LicenseRequestList requests={requestsData} onDataChange={fetchLicencias} />
        )}
      </div>
    </div>
    // <div className="min-h-screen py-10">
    //   <LicenseRequestList requests={requestsData} />
    // </div>
  )
}

export default Listado
