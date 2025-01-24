import React, { useState, useEffect } from 'react'

import { Form, Button, Icon, Dropdown, Input } from 'semantic-ui-react'

const AddSolicitudPlacas = () => {
  const [formData, setFormData] = useState({
    folioUnico: '',
    fechaExpedicion: '',
    fechaVencimiento: '',
    numSerie: '',
    numMotor: '',
    marca: '',
    yearModelo: '',
    color: '',
    solicitante: '',
    rfcSolicitante: '',
    domicilio: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    status: '',
    importe: ''
  })

  const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    const fechaExpedicionToday = getCurrentDate()

    const vencimiento = new Date(fechaExpedicionToday)
    vencimiento.setDate(vencimiento.getDate() + 30)

    setFormData((prev) => ({
      ...prev,
      fechaExpedicion: fechaExpedicionToday,
      fechaVencimiento: vencimiento.toISOString().split('T')[0]
    }))
  }, [])

  const handleChange = (e, { name, value }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form data:', formData)

    try {
      const response = await window.api.addPermiso(formData)

      if (response.success) {
        console.log('Permiso agregado:', response.data)
        setFormData((prev) => ({
          ...prev,
          folioUnico: '',
          numSerie: '',
          numMotor: '',
          marca: '',
          yearModelo: '',
          color: '',
          rfcSolicitante: '',
          domicilio: '',
          nombres: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          status: '',
          importe: ''
        }))
        // setFormData({
        //   folioUnico: '',
        //   fechaExpedicion: '',
        //   fechaVencimiento: '',
        //   numSerie: '',
        //   numMotor: '',
        //   marca: '',
        //   yearModelo: '',
        //   color: '',
        //   // solicitante: '',
        //   rfcSolicitante: '',
        //   domicilio: '',
        //   nombres: '',
        //   apellidoPaterno: '',
        //   apellidoMaterno: '',
        //   status: '',
        //   importe: ''
        // })
      } else {
        alert('Error al registrar la licencia: ' + response.error)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4 px-2">
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-6 bg-white w-full max-w-7xl p-6 rounded-lg shadow-lg"
      >
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex flex-col gap-1">
            <label htmlFor="nombres" className="font-calibri-bold">
              Nombres
            </label>
            <Form.Input
              id="nombres"
              placeholder="Nombre"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              // fluid
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="apellidoPaterno" className="font-calibri-bold">
              Apellido paterno
            </label>
            <Form.Input
              id="apellidoPaterno"
              placeholder="Apellido Paterno"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              fluid
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="apellidoMaterno" className="font-calibri-bold">
              Apellido materno
            </label>
            <Form.Input
              id="apellidoMaterno"
              placeholder="Apellido Materno"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              fluid
            />
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
              Fecha de vencimiento
            </label>
            <Form.Input
              className="font-kanit-medium text-xl"
              readOnly
              type="text"
              placeholder="Fecha de Vencimiento"
              value={formData.fechaVencimiento}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="apellidoMaterno" className="font-calibri-bold">
              Número de serie
            </label>
            <Form.Input
              id="numSerie"
              placeholder="Número de serie"
              name="numSerie"
              value={formData.numSerie}
              onChange={handleChange}
              fluid
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="apellidoMaterno" className="font-calibri-bold">
              Número de motor
            </label>
            <Form.Input
              id="numMotor"
              placeholder="Número de motor"
              name="numMotor"
              value={formData.numMotor}
              onChange={handleChange}
              fluid
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="apellidoMaterno" className="font-calibri-bold">
              Marca
            </label>
            <Form.Input
              id="marca"
              placeholder="Marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              fluid
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="apellidoMaterno" className="font-calibri-bold">
              Color
            </label>
            <Form.Input
              id="color"
              placeholder="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              fluid
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex flex-col gap-1">
            <label htmlFor="apellidoMaterno" className="font-calibri-bold">
              Año/Modelo
            </label>
            <Form.Input
              id="yearModelo"
              placeholder="Año/Modelo"
              name="yearModelo"
              value={formData.yearModelo}
              onChange={handleChange}
              fluid
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="apellidoMaterno" className="font-calibri-bold">
              RFC del Solicitante
            </label>
            <Form.Input
              id="rfcSolicitante"
              placeholder="RFC del Solicitante"
              name="rfcSolicitante"
              value={formData.rfcSolicitante}
              onChange={handleChange}
              fluid
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="apellidoMaterno" className="font-calibri-bold">
              Domicilio
            </label>
            <Form.Input
              id="domicilio"
              placeholder="Domicilio"
              name="domicilio"
              value={formData.domicilio}
              onChange={handleChange}
              fluid
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="apellidoMaterno" className="font-calibri-bold">
              Importe
            </label>
            <Form.Input
              id="importe"
              placeholder="Importe"
              name="importe"
              value={formData.importe}
              onChange={handleChange}
              fluid
            />
          </div>
          <div className="flex justify-center mt-6 w-full">
            <Button type="submit" color="blue" icon labelPosition="left">
              <Icon name="save" />
              Guardar
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default AddSolicitudPlacas
