import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Image, Select, Icon } from 'semantic-ui-react'

import logo from '../../../assets/logos/logo_fRojo.jpg'

const ContentHistoryModal = ({
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
  numLicencia
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
    idPersona: ''
  })

  useEffect(() => {
    console.log('Recibiendo ID:', id)
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
      idPersona: id || ''
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
    numLicencia
  ])

  const [selectedLicenciaDe, setSelectedLicenciaDe] = useState(null)
  const [selectedTipoLicencia, setSelectedTipoLicencia] = useState(null)

  const [duracionLicencia, setDuracionLicencia] = useState(null)
  const [fechaVencimientoCalc, setFechaVencimiento] = useState('')
  const [success, setSuccess] = useState('')

  const [numLicenciaG, setNumLicencia] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
  }
  //   const [selectedTipoLicencia, setSelectedTipoLicencia] = useState(tipoLicencia || '')
  const tipoLicencias = [
    { key: 'a', value: 'a', text: 'A' },
    { key: 'b', value: 'b', text: 'B' },
    { key: 'c', value: 'c', text: 'C' },
    { key: 'd', value: 'd', text: 'D' },
    { key: 'e', value: 'e', text: 'E' },
    { key: 'f', value: 'f', text: 'F' }
  ]

  const licenciasDeOptions = [
    { key: 'automovilista', value: 'automovilista', text: 'Automovilista' },
    { key: 'motociclista', value: 'motociclista', text: 'Motociclista' },
    { key: 'chofer', value: 'chofer', text: 'Chofer' },
    { key: 'choferservpub', value: 'choferservpub', text: 'Chofer de Servicio Público' },
    { key: 'choferpart', value: 'choferpart', text: 'Chofer Particular' }
  ]

  const duracionLicenciaOptions = [
    { key: '3', value: '3', text: '3 años' },
    { key: '5', value: '5', text: '5 años' }
  ]

  // Calcula la fecha de vencimiento sumando los años seleccionados a la fecha actual
  const calculateFechaVencimiento = (years) => {
    const today = new Date()
    today.setFullYear(today.getFullYear() + parseInt(years, 10)) // Sumar años
    return today.toISOString().split('T')[0] // Formato "aaaa-mm-dd"
  }

  // Maneja el cambio de selección en "Licencia De"
  const handleLicenciaDeChange = (_, data) => {
    const licenciaSeleccionada = data.value
    setSelectedLicenciaDe(licenciaSeleccionada)
    setFormData({ ...formData, licenciaDe: licenciaSeleccionada })

    // Establece la duración predeterminada para las opciones específicas
    if (licenciaSeleccionada === 'choferservpub') {
      setDuracionLicencia('3')
      setFechaVencimiento(calculateFechaVencimiento(3))
    } else if (licenciaSeleccionada === 'choferpart') {
      setDuracionLicencia('5') // 5 años para "choferpart"
      setFechaVencimiento(calculateFechaVencimiento(5))
    } else {
      setDuracionLicencia(null) // Limpia la duración para las otras opciones
      setFechaVencimiento('')
    }
  }
  const handrleTipoLicencia = (_, data) => {
    const tipoLicenciaSeleccionada = data.value
    setSelectedTipoLicencia(tipoLicenciaSeleccionada)
    setFormData({ ...formData, tipoLicencia: tipoLicenciaSeleccionada })
  }
  // Maneja el cambio en la duración seleccionada
  const handleDuracionChange = (_, data) => {
    const duration = data.value
    setDuracionLicencia(duration)
    setFechaVencimiento(calculateFechaVencimiento(duration))
    setFormData({ ...formData, fechaVencimiento: calculateFechaVencimiento(duration) })
  }

  const handleGenerarLicencia = async () => {
    console.log('ID', id)
    try {
      if (!id) {
        setError('El ID de la licencia no está definido.')
        return
      }

      // Llamar al handler 'generar-licencia' con el id de la licencia
      const generatedNumLicencia = await window.api.addLicencia(id)
      // setNumLicencia(generatedNumLicencia)
      // setFormData({...formData, numLicencia: generatedNumLicencia})
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

  const handleGuardar = async () => {
    try {
      // Enviar los datos al proceso principal para insertar en la base de datos
      console.log(formData)
      console.log('PRESIONADO')
      const result = await window.api.historyLicencia(formData)
      await window.api.updateLicenciaFirst(
        formData.id,
        formData.fechaExpedicion,
        formData.fechaVencimiento,
        formData.licenciaDe,
        formData.tipoLicencia
      )

      if (result.success) {
        setError('')
        setSuccess(`Licencia guardada exitosamente con ID: ${result.insertId}`)
        // Opcional: Puedes limpiar el formulario o mantener los datos
        // setFormData({
        //   ...formData,
        //   numLicencia: '' // O mantener el número generado
        // });
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
        <Form className="flex flex-row bg-white gap-36 justify-center flex-grow ">
          <div className="flex flex-col gap-3 w-5/12 bg-white">
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
                readOnly
              />
            </div>

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
                readOnly
              />
            </div>

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
                readOnly
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Fecha de Nacimiento
              </label>
              <div>
                <Form.Input
                  className="font-kanit-medium text-xl"
                  placeholder="Seleccione la fecha de nacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  //   disabled
                  readOnly
                  onChange={handleChange}
                />
              </div>
            </div>

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
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Licencia De:
              </label>
              <div className="relative">
                <Form.Input
                  // className="w-full font-kanit-medium text-xl pr-10"
                  className="font-kanit-medium text-xl"
                  // icon={null}
                  // placeholder="Selecciona de que es la licencia"
                  // options={licenciasDeOptions}
                  // disabled
                  readOnly
                  value={formData.licenciaDe.toUpperCase()}
                  // onChange={handleLicenciaDeChange}
                />
                {/* <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                  <Icon name="angle down" className="text-gray-600" />
                </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Tipo De Licencia:
              </label>
              <div className="relative">
                <Form.Input
                  // icon={null}
                  // className="w-full font-kanit-medium text-xl pr-10"
                  // placeholder="Tipo de licencia"
                  // options={tipoLicencias}
                  className="font-kanit-medium text-xl"
                  value={formData.tipoLicencia}
                  readOnly
                  // onChange={handrleTipoLicencia}
                />
                {/* <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                  <Icon name="angle down" className="text-gray-600" />
                </div> */}
              </div>
            </div>
            {(selectedLicenciaDe === 'automovilista' ||
              selectedLicenciaDe === 'motociclista' ||
              selectedLicenciaDe === 'chofer') && (
              <div className="flex flex-col gap-1">
                <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                  Duración de licencia:
                </label>
                <div className="relative">
                  <Select
                    className="w-full font-kanit-medium text-xl pr-10"
                    icon={null}
                    placeholder="Duración de licencia"
                    options={duracionLicenciaOptions}
                    onChange={handleDuracionChange}
                  />
                  <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                    <Icon name="angle down" className="text-gray-600" />
                  </div>
                </div>
              </div>
            )}
            {(selectedLicenciaDe === 'choferservpub' || selectedLicenciaDe === 'choferpart') && (
              <div className="flex flex-col gap-1">
                <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                  Duración de licencia:
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${duracionLicencia} Años`} // Muestra la duración predeterminada
                  className="border border-gray-300 rounded px-2 py-1"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Fecha de Vencimiento
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                readOnly
                editable={false}
                placeholder="Fecha de Vencimiento"
                value={formData.fechaVencimiento}
              />
            </div>
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
            <Button disabled color="blue" type="button" onClick={handleGenerarLicencia}>
              Generar Número de Licencia
            </Button>
          </div>

          <div className="flex flex-col bg-white w-4/12 justify-around">
            <div className="flex flex-col w-10/12 bg-white h-2/6 items-center justify-center">
              <label className="font-kanit-regular text-pantoneCoolGray11C text-2xl mb-1">
                Fotografía del interesado
              </label>

              {/* <Image src={`http://192.168.1.64:3000/uploads/${fotografia}`} className="object-contain max-w-full max-h-full" /> */}
              <Image
                src={`http://192.168.1.64:3000/uploads/${fotografia}`}
                // src={`http://192.168.0.109:3000/uploads/${fotografia}`}
                className="object-contain max-w-full max-h-full"
              />
            </div>

            <div className="flex flex-col w-10/12 bg-white h-2/6 items-center justify-center">
              <label className="font-kanit-regular text-pantoneCoolGray11C text-2xl mb-1">
                Firma del interesado
              </label>

              {/* <Image src={`http://192.168.1.64:3000/uploads/${firma}`} className="object-contain max-w-full max-h-full" /> */}
              <Image
                src={`http://192.168.1.64:3000/uploads/${firma}`}
                // src={`http://192.168.0.109:3000/uploads/${firma}`}
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
                disabled
              >
                <p className="text-white font-kanit-light text-2xl">Guardar</p>
              </Form.Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ContentHistoryModal
