import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Image, Select, Icon } from 'semantic-ui-react'

const DetailHistoryPlacas = ({
  id,
  nombres,
  apellidoPaterno,
  apellidoMaterno,
  fechaExpedicion,
  fechaVencimiento,
  numSerie,
  numMotor,
  marca,
  yearModelo,
  color,
  rfcSolicitante,
  domicilio,
  importe,
  status,
  idUser
}) => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaExpedicion: '',
    fechaVencimiento: '',
    numSerie: '',
    numMotor: '',
    marca: '',
    yearModelo: '',
    color: '',
    rfcSolicitante: '',
    domicilio: '',
    importe: '',
    status: '',
    idUser: ''
  })

  useEffect(() => {
    setFormData({
      id: id || '',
      nombres: nombres || '',
      apellidoPaterno: apellidoPaterno || '',
      apellidoMaterno: apellidoMaterno || '',
      fechaExpedicion: fechaExpedicion || '',
      fechaVencimiento: fechaVencimiento || '',
      numSerie: numSerie || '',
      numMotor: numMotor || '',
      marca: marca || '',
      yearModelo: yearModelo || '',
      color: color || '',
      rfcSolicitante: rfcSolicitante || '',
      domicilio: domicilio || '',
      importe: importe || '',
      status: status || '',
      idUser: idUser || ''
    })
  }, [
    id,
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    fechaExpedicion,
    fechaVencimiento,
    numSerie,
    numMotor,
    marca,
    yearModelo,
    color,
    rfcSolicitante,
    domicilio,
    importe,
    status
  ])

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
                name="nombres"
                value={formData.nombres}
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
                Fecha de Expedición
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                name="fechaExpedicion"
                value={formData.fechaExpedicion}
                readOnly
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Fecha de Vencimiento
              </label>
              <div>
                <Form.Input
                  className="font-kanit-medium text-xl"
                  name="fechaVencimiento"
                  type="date"
                  value={formData.fechaVencimiento}
                  readOnly
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Número de Serie
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                readOnly
                type="text"
                value={formData.numSerie}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Numero de Motor
              </label>
              <div className="relative">
                <Form.Input
                  className="font-kanit-medium text-xl"
                  readOnly
                  value={formData.numMotor.toUpperCase()}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Marca
              </label>
              <div className="relative">
                <Form.Input className="font-kanit-medium text-xl" value={formData.marca} readOnly />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Año del Modelo
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                readOnly
                value={formData.yearModelo}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Color
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                readOnly
                value={formData.color}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">RFC</label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                readOnly
                value={formData.rfcSolicitante}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Importe
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                readOnly
                value={formData.importe}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
                Estatus
              </label>
              <Form.Input
                className="font-kanit-medium text-xl"
                type="text"
                readOnly
                value={formData.status}
              />
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default DetailHistoryPlacas
