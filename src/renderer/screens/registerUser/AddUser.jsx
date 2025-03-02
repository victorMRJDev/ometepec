import React, { useState, useEffect } from 'react'
import { Form, Dropdown, Input, Button, Icon } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {
  const [formData, setFormData] = React.useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    curp: '',
    numEmpleado: '',
    rfc: '',
    edad: '',
    domicilio: '',
    genero: '',
    rolUsuario: '',
    correo: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const sexoOptions = [
    { key: 'm', text: 'Masculino', value: 'masculino' },
    { key: 'f', text: 'Femenino', value: 'femenino' },
    { key: 'o', text: 'Otro', value: 'otro' }
  ]

  const rol = [
    { key: 'a', text: 'Administrador', value: 'administrador' },
    { key: 'u', text: 'Usuario', value: 'usuario' }
  ]
  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)
    const userData = { ...formData }
    console.log(formData)
    console.log(formData.rolUsuario)

    try {
      const response = await window.api.addUserSystem(formData)
      if (response.success) {
        // alert('Usuario registrado correctamente. ID: ' + response.id)
        setFormData({
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          curp: '',
          numEmpleado: '',
          rfc: '',
          edad: '',
          domicilio: '',
          genero: '',
          rolUsuario: '',
          correo: '',
          password: ''

        })
        // handleClearSignature()
      } else {
        console.log(response.error)
        // alert('Error al registrar al usuario: ' + response.error)
      }
    } catch (error) {
      console.log('Error al enviar los datos: ' + error)
      // alert('Ocurrió un error al enviar los datos. Por favor, intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-4 mb-10 px-2">
       <div>
        <Button onClick={() => navigate('/usersystem')} primary>
          Volver a la lista de usuarios
        </Button>
      </div>
      <Form
        onSubmit={handleSubmit}
        className="flex flex-row md:flex-row gap-6 bg-white mb-10 w-full max-w-7xl p-8 rounded-lg max-h-screen shadow-lg overflow-auto"
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="nombre" className="font-calibri-bold">
              Nombres
            </label>
            <Form.Input
              id="nombre"
              placeholder="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fluid
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

          {/* Apellido Materno */}
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
            <label htmlFor="curp" className="font-calibri-bold">
              CURP
            </label>
            <Form.Input
              id="curp"
              placeholder="CURP"
              name="curp"
              value={formData.curp}
              onChange={handleChange}
              fluid
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="numEmpleado" className="font-calibri-bold">
              Num. Empleado
            </label>
            <Form.Input
              id="numEmpleado"
              placeholder="Num. Empleado"
              name="numEmpleado"
              value={formData.numEmpleado}
              onChange={handleChange}
              fluid
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="rfc" className="font-calibri-bold">
              RFC
            </label>
            <Form.Input
              id="rfc"
              placeholder="RFC"
              name="rfc"
              value={formData.rfc}
              onChange={handleChange}
              fluid
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="rfc" className="font-calibri-bold">
              Edad
            </label>
            <Form.Input
              id="edad"
              placeholder="Edad"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              fluid
            />
          </div>

        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/2 lg:w-1/2">
        <div className="flex flex-col gap-1">
            <label htmlFor="domicilio" className="font-calibri-bold">
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
            <label htmlFor="genero" className="font-calibri-bold">
              Sexo
            </label>
            <div className="relative">
              <Dropdown
                id="genero"
                placeholder="Selecciona Sexo"
                fluid
                selection
                options={sexoOptions}
                name="genero"
                icon={null}
                value={formData.genero }
                onChange={handleChange}
              />
              <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                <Icon name="angle down" className="text-gray-600" />
              </div>
            </div>
          </div>

        <div className="flex flex-col gap-1">
            <label htmlFor="rolUsuario" className="font-calibri-bold">
              Rol de Usuario
            </label>
            <div className="relative">
              <Dropdown
                id="rolUsuario"
                placeholder="Selecciona rol de Usuario"
                fluid
                selection
                options={rol}
                name="rolUsuario"
                icon={null}
                value={formData.rolUsuario }
                onChange={handleChange}
              />
              <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                <Icon name="angle down" className="text-gray-600" />
              </div>
            </div>

          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="domicilio" className="font-calibri-bold">
              Agregue un correo o un usuario
            </label>
            <Form.Input
              id="correo"
              placeholder="Ejemplo: usuario123"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              fluid
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="domicilio" className="font-calibri-bold">
              Agregue una contraseña
            </label>
            <Form.Input
              id="password"
              placeholder="Agregue una contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type='password'
              fluid
            />
          </div>
          <div className="flex justify-center mt-6 w-full">
              <Button
                type="submit"
                color="blue"
                loading={isSubmitting}
                disabled={isSubmitting}
                icon
                labelPosition="left"
              >
                <Icon name="save" />
                Enviar Datos
              </Button>
            </div>
        </div>
        <div className='h-5'></div>
        <div></div>
      </Form>
    </div>
  )
}

export default AddUser
