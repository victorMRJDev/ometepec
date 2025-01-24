import React from 'react'

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
    rolUsuario: ''
  })

  const sexoOptions = [
    { key: 'm', text: 'Masculino', value: 'masculino' },
    { key: 'f', text: 'Femenino', value: 'femenino' },
    { key: 'o', text: 'Otro', value: 'otro' }
  ]

  const rol = [
    { key: 'm', text: 'Administrador', value: 'administrador' },
    { key: 'f', text: 'Usuario', value: 'usuario' }
  ]
  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)
    const userData = { ...formData }

    try {
      const response = await window.api.addUserSystem(userData, 'Administrador')
      if (response.success) {
        alert('Usuario registrado correctamente. ID: ' + response.id)
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
          rolUsuario: ''
        })
        handleClearSignature()
      } else {
        alert('Error al registrar al usuario: ' + response.error)
      }
    } catch (error) {
      console.log('Error al enviar los datos: ' + error)
      alert('Ocurrió un error al enviar los datos. Por favor, intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4 px-2">
      <From>
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-6 bg-white w-full max-w-7xl p-6 rounded-lg
        shadow-lg"
        <div className="flex flex-col gap-4 w-full md:w-1/2">
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
                value={formData.genero}
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
                value={formData.rolUsuario}
                onChange={handleChange}
              />
              <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                <Icon name="angle down" className="text-gray-600" />
              </div>
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
        </div>
      </From>
    </div>
  )
}

export default AddUser
