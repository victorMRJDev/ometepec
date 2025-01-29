import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Image, Select, Icon } from 'semantic-ui-react'
// import { useUser } from '../../hooks/UserContext'

import logo from '../../../assets/logos/logo_fRojo.jpg'

const ModalContent = ({
  id,
  nombres,
  apellidoPaterno,
  apellidoMaterno,
  telefono,
  sexo,
  fechaNacimiento,
  curp,
  rfc,
  tipoSangre,
  alergias,
  domicilio,
  contactoEmergencia,
  donadorOrganos,
  restricMedica,
  status,
  fotografia,
  created_at,
  updated_at,
  firma,
  fechaExpedicion,
  fechaVencimiento,
  licenciaDe,
  tipoLicencia,
  numLicencia,

  idPersona,
  costo,
  tipoTramite,
  duracion,
  rutaIne,
  rutaEstSanguineo
}) => {
  const [formData, setFormData] = useState({
    id: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    sexo: '',
    fechaNacimiento: '',
    curp: '',
    rfc: '',
    tipoSangre: '',
    alergias: '',
    domicilio: '',
    contactoEmergencia: '',
    donadorOrganos: '',
    restricMedica: '',
    status: '',
    fotografia: '',
    created_at: '',
    updated_at: '',
    firma: '',
    fechaExpedicion: '',
    fechaVencimiento: '',
    licenciaDe: '',
    tipoLicencia: '',
    numLicencia: '',
    idPersona: '',
    costo: '',
    tipoTramite: '',
    duracion: '',
    rutaIne: '',
    rutaEstSanguineo: ''
  })

  // Estado para manejar el Dropdown principal (6 opciones)
  const [opcionTramite, setOpcionTramite] = useState('')
  // Estado para manejar el Dropdown de duración (3 o 5 años) cuando aplique
  // const [duracion, setDuracion] = useState('')
  // Estado para manejar la categoría (Chofer, Automovilista, Motociclista, Duplicado) para "Por expedición o reposición"
  const [categoriaExpedicion, setCategoriaExpedicion] = useState('')
  // Estado para el costo en UMAs
  // const [costo, setCosto] = useState('')
  // Estado para la fecha de vencimiento
  const [fechaVencimientoCalc, setFechaVencimientoCalc] = useState('')
  // Estado para mensajes de éxito/error
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [selectedTipoLicencia, setSelectedTipoLicencia] = useState(tipoLicencia || '')
  // const userId = user?.id

  useEffect(() => {
    // Inicializa el estado con los props recibidos
    setFormData({
      id: id || '',
      nombres: nombres || '',
      apellidoPaterno: apellidoPaterno || '',
      apellidoMaterno: apellidoMaterno || '',
      telefono: telefono || '',
      sexo: sexo || '',
      fechaNacimiento: fechaNacimiento || '',
      curp: curp || '',
      rfc: rfc || '',
      tipoSangre: tipoSangre || '',
      alergias: alergias || '',
      domicilio: domicilio || '',
      contactoEmergencia: contactoEmergencia || '',
      donadorOrganos: donadorOrganos || '',
      restricMedica: restricMedica || '',
      status: status || '',
      fotografia: fotografia || '',
      created_at: created_at || '',
      updated_at: updated_at || '',
      firma: firma || '',
      fechaExpedicion: fechaExpedicion || '',
      fechaVencimiento: fechaVencimiento || '',
      licenciaDe: licenciaDe || '',
      tipoLicencia: tipoLicencia || '',
      numLicencia: numLicencia || '',
      idPersona: id || '',
      costo: costo || '',
      tipoTramite: tipoTramite || '',
      duracion: duracion || '',
      rutaIne: rutaIne || '',
      rutaEstSanguineo: rutaEstSanguineo || ''
    })


  }, [
    id,
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    telefono,
    sexo,
    fechaNacimiento,
    curp,
    rfc,
    tipoSangre,
    alergias,
    domicilio,
    contactoEmergencia,
    donadorOrganos,
    restricMedica,
    status,
    fotografia,
    created_at,
    updated_at,
    firma,
    fechaExpedicion,
    fechaVencimiento,
    licenciaDe,
    tipoLicencia,
    numLicencia,
    idPersona,
    costo,
    tipoTramite,
    duracion,
    rutaIne,
    rutaEstSanguineo
  ])

  console.log(formData.firma)
  console.log(formData.fotografia)
  const opcionesTramite = [
    {
      key: 'serv-particular-1anio',
      value: 'serv-particular-1anio',
      text: 'Para conductores o conductoras el servicio particular con vigencia de un año'
    },
    {
      key: 'expedicion-reposicion',
      value: 'expedicion-reposicion',
      text: 'Por expedición o reposición'
    },
    {
      key: 'provisional-30dias',
      value: 'provisional-30dias',
      text: 'Licencia provisional para manejar por treinta días'
    },
    {
      key: '6meses-menores',
      value: '6meses-menores',
      text: 'Licencia por seis meses para menores de 18 años y mayores de 16'
    },
    {
      key: 'serv-publico',
      value: 'serv-publico',
      text: 'Conductores o conductoras del servicio público'
    },
    {
      key: 'maquinas-especializadas',
      value: 'maquinas-especializadas',
      text: 'operadores de máquinas especializadas'
    }
  ]

  const duracionOptions = [
    { key: '3', value: '3', text: '3 años' },
    { key: '5', value: '5', text: '5 años' }
  ]

  const categoriasExpedicionOptions = [
    { key: 'chofer', value: 'chofer', text: 'Chofer' },
    { key: 'automovilista', value: 'automovilista', text: 'Automovilista' },
    { key: 'motociclista', value: 'motociclista', text: 'Motociclista, motonetas o similares' },
    { key: 'duplicado', value: 'duplicado', text: 'Duplicado de licencia' }
  ]
  const tipoLicencias = [
    { key: 'a', value: 'A', text: 'A' },
    { key: 'b', value: 'B', text: 'B' },
    { key: 'c', value: 'C', text: 'C' },
    { key: 'd', value: 'D', text: 'D' },
    { key: 'e', value: 'E', text: 'E' },
    { key: 'f', value: 'F', text: 'F' }
  ]
  // Función para calcular la fecha de vencimiento
  const calcularFechaVencimiento = (anios = 0, meses = 0, dias = 0) => {
    const hoy = new Date()
    if (anios) hoy.setFullYear(hoy.getFullYear() + anios)
    if (meses) hoy.setMonth(hoy.getMonth() + meses)
    if (dias) hoy.setDate(hoy.getDate() + dias)

    return hoy.toISOString().split('T')[0] // Formato yyyy-mm-dd
  }

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleOpcionTramiteChange = (_, { value }) => {
    setOpcionTramite(value)

    setFormData((prev) => ({
      ...prev,
      tipoTramite: value,
      duracion: '',
      licenciaDe: '',
      costo: ''
    }))

    setFechaVencimientoCalc('')
    switch (value) {
      case 'serv-particular-1anio':
        setFormData((prev) => ({
          ...prev,
          costo: '120.97',
          duracion: '1 año'
        }))
        setFechaVencimientoCalc(calcularFechaVencimiento(1, 0, 0))
        break

      case 'provisional-30dias':
        setFormData((prev) => ({
          ...prev,
          costo: '85.65',
          duracion: '30 días'
        }))
        setFechaVencimientoCalc(calcularFechaVencimiento(0, 0, 30))
        break

      case '6meses-menores':
        setFormData((prev) => ({
          ...prev,
          costo: '334.84',
          duracion: '6 meses'
        }))
        setFechaVencimientoCalc(calcularFechaVencimiento(0, 6, 0))
        break

      case 'maquinas-especializadas':
        setFormData((prev) => ({
          ...prev,
          costo: '120.97',
          duracion: '1 año'
        }))
        setFechaVencimientoCalc(calcularFechaVencimiento(1, 0, 0))
        break

      case 'expedicion-reposicion':
      case 'serv-publico':
      default:
        break
    }
  }
  const handleDuracionChange = (_, { value }) => {
    setFormData((prev) => ({
      ...prev,
      duracion: value
    }))

    setFechaVencimientoCalc(calcularFechaVencimiento(parseInt(value, 10)))

    if (formData.tipoTramite === 'serv-publico') {
      const costoPublico = value === '3' ? '231.29' : '318.39'
      setFormData((prev) => ({
        ...prev,
        costo: costoPublico
      }))
      return
    }

    if (formData.tipoTramite === 'expedicion-reposicion') {
      if (formData.licenciaDe) {
        calcularCostoExpedicion(value, formData.licenciaDe)
      }
    }
  }

  const handleCategoriaExpedicionChange = (_, { value }) => {
    setFormData((prev) => ({
      ...prev,
      licenciaDe: value
    }))
    // Si ya tenemos duracion, recalculamos
    if (formData.duracion) {
      calcularCostoExpedicion(formData.duracion, value)
    }
  }

  const calcularCostoExpedicion = (dur, cat) => {
    // Ejemplo de costos
    const costos3 = {
      chofer: '231.29',
      automovilista: '171.77',
      motociclista: '103.06',
      duplicado: '118.55'
    }
    const costos5 = {
      chofer: '318.39',
      automovilista: '246.78',
      motociclista: '135.48',
      duplicado: '160.65'
    }

    let costoCalculado = ''
    if (dur === '3') {
      costoCalculado = costos3[cat] || ''
    } else if (dur === '5') {
      costoCalculado = costos5[cat] || ''
    }

    setFormData((prev) => ({
      ...prev,
      costo: costoCalculado
    }))
  }
  // Generar número de licencia (ejemplo de tu lógica)
  const handleGenerarLicencia = async () => {
    try {
      if (!id) {
        setError('El ID de la licencia no está definido.')
        return
      }
      const generatedNumLicencia = await window.api.addLicencia(id)
      setFormData((prev) => ({
        ...prev,
        numLicencia: generatedNumLicencia
      }))
      setError('')
      alert(`Número de Licencia Generado: ${generatedNumLicencia}`)
    } catch (err) {
      console.error('Error al generar numLicencia:', err)
      setError(err.message || 'Error al generar el número de licencia.')
      alert(`Error: ${err.message || 'Error al generar el número de licencia.'}`)
    }
  }
  const handrleTipoLicencia = (_, data) => {
    const tipoLicenciaSeleccionada = data.value
    setSelectedTipoLicencia(tipoLicenciaSeleccionada)
    setFormData({ ...formData, tipoLicencia: tipoLicenciaSeleccionada })
  }

  const handleGuardar = async () => {
    try {
      // Prepara la data final
      const finalData = {
        ...formData,
        fechaVencimiento: fechaVencimientoCalc,
        status: 'generado'
      }

      console.log('Datos a guardar', finalData)
      const result = await window.api.historyLicencia(finalData)
      // const result = finalData
      // console.log(result)

      console.log('Final data:', finalData)
      console.log('FormData data:', formData)

      await window.api.updateLicenciaFirst(
        finalData.id,
        finalData.status,
        finalData.fechaExpedicion,
        finalData.fechaVencimiento,
        finalData.licenciaDe,
        finalData.tipoLicencia,
        finalData.idPersona,
        finalData.costo,
        finalData.tipoTramite,
        finalData.duracion
      )

      if (result.success) {
        setError('')
        setSuccess(`Licencia guardada exitosamente con ID: ${result.insertId}`)
      } else {
        setError(`Error al guardar la licencia: ${result.error}`)
        setSuccess('')
      }
    } catch (err) {
      console.error('Error al guardar la licencia:', err)
      setError('Error al guardar la licencia.')
      setSuccess('')
    }
  }

  return (
    <>
      <div className="flex flex-col h-auto">
        <Form className="flex flex-row bg-white gap-36 justify-center flex-grow">
          {/* Columna Izquierda */}
          <div className="flex flex-col gap-3 w-5/12 bg-white">
            {/* CURP */}
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">CURP</label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                placeholder="CURP"
                name="curp"
                value={formData.curp}
                onChange={handleChange}
              />
            </div>

            {/* Apellido Paterno */}
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Apellido Paterno
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                placeholder="Apellido Paterno"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleChange}
              />
            </div>

            {/* Apellido Materno */}
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Apellido Materno
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                placeholder="Apellido Materno"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleChange}
              />
            </div>

            {/* Nombres */}
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Nombre
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                placeholder="Nombre"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
              />
            </div>

            {/* Fecha Nacimiento */}
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Fecha de Nacimiento
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                placeholder="Seleccione la fecha de nacimiento"
                name="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </div>

            {/* Fecha de Expedición (readOnly) */}
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Fecha de Expedición
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                readOnly
                type="text"
                placeholder="Fecha de Expedición"
                value={formData.fechaExpedicion}
              />
            </div>

            {/* Dropdown Principal (6 opciones) */}
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Seleccione el Trámite:
              </label>
              <div className="relative">
                <Select
                  className="w-full font-kanit-medium text-xl pr-10"
                  icon={null}
                  placeholder="Seleccione una opción"
                  options={opcionesTramite}
                  value={formData.tipoTramite}
                  onChange={handleOpcionTramiteChange}
                />
                <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                  <Icon name="angle down" className="text-gray-600" />
                </div>
              </div>
            </div>

            {/* Si el trámite es "Por expedición o reposición" => mostrar dropdown de 3 o 5 años + categoría */}
            {opcionTramite === 'expedicion-reposicion' && (
              <>
                {/* Duración */}
                <div className="flex flex-col gap-1">
                  <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                    Duración de la licencia:
                  </label>
                  <div className="relative">
                    <Select
                      className="w-full font-kanit-medium text-xl pr-10"
                      icon={null}
                      placeholder="Seleccione años"
                      options={duracionOptions}
                      value={formData.duracion}
                      onChange={handleDuracionChange}
                    />
                    <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                      <Icon name="angle down" className="text-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Tipo de licencia (A, B, C.) */}
                <div className="flex flex-col gap-1">
                  <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                    Tipo de Licencia:
                  </label>
                  <div className="relative">
                    <Select
                      className="w-full font-kanit-medium text-xl pr-10"
                      icon={null}
                      placeholder="Seleccione categoría"
                      options={tipoLicencias}
                      value={formData.tipoLicencia}
                      onChange={handrleTipoLicencia}
                    />
                    <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                      <Icon name="angle down" className="text-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Categoría (Chofer, Automovilista, etc.) */}
                <div className="flex flex-col gap-1">
                  <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                    Categoría:
                  </label>
                  <div className="relative">
                    <Select
                      className="w-full font-kanit-medium text-xl pr-10"
                      icon={null}
                      placeholder="Seleccione categoría"
                      options={categoriasExpedicionOptions}
                      value={formData.licenciaDe}
                      onChange={handleCategoriaExpedicionChange}
                    />
                    <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                      <Icon name="angle down" className="text-gray-600" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Si el trámite es "Conductores o conductoras del servicio público" => mostrar dropdown de 3 o 5 años */}
            {opcionTramite === 'serv-publico' && (
              <div className="flex flex-col gap-1">
                <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                  Duración de la licencia:
                </label>
                <div className="relative">
                  <Select
                    className="w-full font-kanit-medium text-xl pr-10"
                    icon={null}
                    placeholder="Seleccione años"
                    options={duracionOptions}
                    value={formData.duracion}
                    onChange={handleDuracionChange}
                  />
                  <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                    <Icon name="angle down" className="text-gray-600" />
                  </div>
                </div>
              </div>
            )}

            {/* Fecha de Vencimiento Calculada */}
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Fecha de Vencimiento
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                readOnly
                placeholder="Fecha de Vencimiento"
                value={fechaVencimientoCalc}
              />
            </div>

            {/* Costo/Precio */}
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Costo
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                readOnly
                placeholder="Costo"
                value={formData.costo}
              />
            </div>

            {/* Número de Licencia */}
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Número de Licencia
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                placeholder="Número de Licencia"
                value={formData.numLicencia}
                readOnly
              />
            </div>

            {/* Botón Generar Número de Licencia */}
            <Button color="blue" type="button" onClick={handleGenerarLicencia}>
              Generar Número de Licencia
            </Button>
          </div>

          {/* Columna Derecha */}
          <div className="flex flex-col bg-white w-4/12 justify-around">
            <div className="flex flex-col w-10/12 bg-white h-2/6 items-center justify-center">
              <label className="font-kanit-regular text-pantoneCoolGray11C text-2xl mb-1">
                Fotografía del interesado
              </label>
              <Image
                src={`http://192.168.0.109:3000/uploads/${fotografia}`}
                className="object-contain max-w-full max-h-full"
              />
            </div>

            <div className="flex flex-col w-10/12 bg-white h-2/6 items-center justify-center">
              <label className="font-kanit-regular text-pantoneCoolGray11C text-2xl mb-1">
                Firma del interesado
              </label>
              <Image
                src={`http://192.168.0.109:3000/uploads/${firma}`}
                className="object-contain max-w-full max-h-full"
              />
            </div>

            <div className="flex justify-center items-center w-10/12 bg-white">
              <Form.Button
                fluid
                style={{ backgroundColor: '#ab0033' }}
                size="small"
                className="w-10/12"
                onClick={handleGuardar}
              >
                <p className="text-white font-kanit-light text-2xl">Guardar</p>
              </Form.Button>
            </div>
          </div>
        </Form>

        {/* Mostrar mensajes de éxito o error */}
        {success && <p className="text-green-600 font-bold mt-2">{success}</p>}
        {error && <p className="text-red-600 font-bold mt-2">{error}</p>}
      </div>
    </>
  )
}

export default ModalContent
