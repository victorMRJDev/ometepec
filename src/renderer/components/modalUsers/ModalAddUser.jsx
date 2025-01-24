import React, { useEffect, useState } from 'react'
import { Form, Dropdown, Input, Button, Icon } from 'semantic-ui-react'

export const ModaAddUser = () => {
  const [formData, setFormData] = React.useState({
    id: '',
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
    { key: 'a', text: 'Administrador', value: 'administrador' },
    { key: 'f', text: 'Usuario', value: 'usuario' }
  ]

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      <div className="flex flex-col h-auto">
        <Form className="flex flex-row bg-white gap-36 justify-center flex-grow ">
          <div className="flex flex-col gap-3 w-5/12 bg-white">
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Nombre
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={formData.nombre}
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
              />
            </div>
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
                Número de Empleado
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                placeholder="Número de Empleado"
                value={formData.numEmpleado}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">Edad</label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                placeholder="Edad"
                name="edad"
                value={formData.curp}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Domicilio
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                placeholder="Domicilio"
                name="domicilio"
                value={formData.curp}
                onChange={handleChange}
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
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}
