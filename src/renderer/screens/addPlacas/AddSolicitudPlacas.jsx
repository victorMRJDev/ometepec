import React, { useState, useEffect, useRef } from 'react'

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
    importe: '',
    rutaIne: '',
    rutaEstSanguineo: '',
    rutaConstSitFiscal: ''
  })

  const [pdf1, setPdf1] = useState(null)
  const [pdf2, setPdf2] = useState(null)
  const [pdf3, setPdf3] = useState(null)

  const pdf1Ref = useRef(null)
  const pdf2Ref = useRef(null)
  const pdf3Ref = useRef(null)
  // const [pdf4, setPdf4] = useState(null)

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
      // 1) Subir los 4 PDFs a tu backend NodeJS en la ruta /subir
      const uploadData = new FormData()

      uploadData.append('tipo', 'empresa')
      uploadData.append('identificador', formData.rfcSolicitante)
      // Agregamos los archivos (si se seleccionaron)
      if (pdf1) uploadData.append('pdfs', pdf1)
      if (pdf2) uploadData.append('pdfs', pdf2)
      if (pdf3) uploadData.append('pdfs', pdf3)
      // if (pdf4) uploadData.append('pdfs', pdf4)

      // Llamada a tu backend NodeJS
      const uploadResponse = await fetch('http://192.168.0.109:3000/subir', {
        method: 'POST',
        body: uploadData
      })

      const data = await uploadResponse.json()

      if (!data.ok) {
        // alert('Error al subir documentos: ' + data.mensaje)
        return
      }
      const archivos = data.archivos

      console.log(data)

      const updateFormData = {
        ...formData,
        rutaIne: archivos[0]?.rutaCompleta || '',
        rutaEstSanguineo: archivos[1]?.rutaCompleta || '',
        rutaConstSitFiscal: archivos[2]?.rutaCompleta || ''
      }

      console.log('Datos enviados', updateFormData)

      // console.log(data)

      const response = await window.api.addPermiso(updateFormData)

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
          importe: '',
          rutaIne: '',
          rutaEstSanguineo: '',
          rutaConstSitFiscal: ''
        }))

        if (pdf1Ref.current) pdf1Ref.current.value = ''
        if (pdf2Ref.current) pdf2Ref.current.value = ''
        if (pdf3Ref.current) pdf3Ref.current.value = ''

        setPdf1(null)
        setPdf2(null)
        setPdf3(null)
      } else {
        alert('Error al registrar la licencia: ' + response.error)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4 px-2 overflow-auto max-h-screen overflow-y-auto">
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
          {/* Campos para subir los 4 archivos PDF */}
          <div className="flex flex-col gap-1">
            <label className="font-calibri-bold">Seleccione PDF del INE</label>
            <Form.Input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf1(e.target.files[0])}
              ref={pdf1Ref}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-calibri-bold">Seleccione PDF del Estudio Sanguíneo</label>
            <Form.Input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf2(e.target.files[0])}
              ref={pdf2Ref}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-calibri-bold">Seleccione Constancia de Situación Fiscal</label>
            <Form.Input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf3(e.target.files[0])}
              ref={pdf3Ref}
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

// import React, { useState, useEffect } from 'react'

// import { Form, Button, Icon, Dropdown, Input } from 'semantic-ui-react'

// const AddSolicitudPlacas = () => {
//   const [formData, setFormData] = useState({
//     folioUnico: '',
//     fechaExpedicion: '',
//     fechaVencimiento: '',
//     numSerie: '',
//     numMotor: '',
//     marca: '',
//     yearModelo: '',
//     color: '',
//     solicitante: '',
//     rfcSolicitante: '',
//     domicilio: '',
//     nombres: '',
//     apellidoPaterno: '',
//     apellidoMaterno: '',
//     status: '',
//     importe: ''
//   })

//   const getCurrentDate = () => {
//     const today = new Date()
//     const year = today.getFullYear()
//     const month = String(today.getMonth() + 1).padStart(2, '0')
//     const day = String(today.getDate()).padStart(2, '0')
//     return `${year}-${month}-${day}`
//   }

//   useEffect(() => {
//     const fechaExpedicionToday = getCurrentDate()

//     const vencimiento = new Date(fechaExpedicionToday)
//     vencimiento.setDate(vencimiento.getDate() + 30)

//     setFormData((prev) => ({
//       ...prev,
//       fechaExpedicion: fechaExpedicionToday,
//       fechaVencimiento: vencimiento.toISOString().split('T')[0]
//     }))
//   }, [])

//   const handleChange = (e, { name, value }) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log('Form data:', formData)

//     try {
//       const response = await window.api.addPermiso(formData)

//       if (response.success) {
//         console.log('Permiso agregado:', response.data)
//         setFormData((prev) => ({
//           ...prev,
//           folioUnico: '',
//           numSerie: '',
//           numMotor: '',
//           marca: '',
//           yearModelo: '',
//           color: '',
//           rfcSolicitante: '',
//           domicilio: '',
//           nombres: '',
//           apellidoPaterno: '',
//           apellidoMaterno: '',
//           status: '',
//           importe: ''
//         }))
//       } else {
//         alert('Error al registrar la licencia: ' + response.error)
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4 px-2">
//       <Form
//         onSubmit={handleSubmit}
//         className="flex flex-col md:flex-row gap-6 bg-white w-full max-w-7xl p-6 rounded-lg shadow-lg"
//       >
//         <div className="flex flex-col gap-4 w-full md:w-1/2">
//           <div className="flex flex-col gap-1">
//             <label htmlFor="nombres" className="font-calibri-bold">
//               Nombres
//             </label>
//             <Form.Input
//               id="nombres"
//               placeholder="Nombre"
//               name="nombres"
//               value={formData.nombres}
//               onChange={handleChange}
//               // fluid
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="apellidoPaterno" className="font-calibri-bold">
//               Apellido paterno
//             </label>
//             <Form.Input
//               id="apellidoPaterno"
//               placeholder="Apellido Paterno"
//               name="apellidoPaterno"
//               value={formData.apellidoPaterno}
//               onChange={handleChange}
//               fluid
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label htmlFor="apellidoMaterno" className="font-calibri-bold">
//               Apellido materno
//             </label>
//             <Form.Input
//               id="apellidoMaterno"
//               placeholder="Apellido Materno"
//               name="apellidoMaterno"
//               value={formData.apellidoMaterno}
//               onChange={handleChange}
//               fluid
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
//               Fecha de Expedición
//             </label>
//             <Form.Input
//               className="font-kanit-medium text-xl"
//               readOnly
//               type="text"
//               placeholder="Fecha de Expedición"
//               value={formData.fechaExpedicion}
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="text-pantoneCoolGray11C font-kanit-regular text-[18px]">
//               Fecha de vencimiento
//             </label>
//             <Form.Input
//               className="font-kanit-medium text-xl"
//               readOnly
//               type="text"
//               placeholder="Fecha de Vencimiento"
//               value={formData.fechaVencimiento}
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="apellidoMaterno" className="font-calibri-bold">
//               Número de serie
//             </label>
//             <Form.Input
//               id="numSerie"
//               placeholder="Número de serie"
//               name="numSerie"
//               value={formData.numSerie}
//               onChange={handleChange}
//               fluid
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="apellidoMaterno" className="font-calibri-bold">
//               Número de motor
//             </label>
//             <Form.Input
//               id="numMotor"
//               placeholder="Número de motor"
//               name="numMotor"
//               value={formData.numMotor}
//               onChange={handleChange}
//               fluid
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="apellidoMaterno" className="font-calibri-bold">
//               Marca
//             </label>
//             <Form.Input
//               id="marca"
//               placeholder="Marca"
//               name="marca"
//               value={formData.marca}
//               onChange={handleChange}
//               fluid
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label htmlFor="apellidoMaterno" className="font-calibri-bold">
//               Color
//             </label>
//             <Form.Input
//               id="color"
//               placeholder="Color"
//               name="color"
//               value={formData.color}
//               onChange={handleChange}
//               fluid
//             />
//           </div>
//         </div>

//         <div className="flex flex-col gap-4 w-full md:w-1/2">
//           <div className="flex flex-col gap-1">
//             <label htmlFor="apellidoMaterno" className="font-calibri-bold">
//               Año/Modelo
//             </label>
//             <Form.Input
//               id="yearModelo"
//               placeholder="Año/Modelo"
//               name="yearModelo"
//               value={formData.yearModelo}
//               onChange={handleChange}
//               fluid
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="apellidoMaterno" className="font-calibri-bold">
//               RFC del Solicitante
//             </label>
//             <Form.Input
//               id="rfcSolicitante"
//               placeholder="RFC del Solicitante"
//               name="rfcSolicitante"
//               value={formData.rfcSolicitante}
//               onChange={handleChange}
//               fluid
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="apellidoMaterno" className="font-calibri-bold">
//               Domicilio
//             </label>
//             <Form.Input
//               id="domicilio"
//               placeholder="Domicilio"
//               name="domicilio"
//               value={formData.domicilio}
//               onChange={handleChange}
//               fluid
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="apellidoMaterno" className="font-calibri-bold">
//               Importe
//             </label>
//             <Form.Input
//               id="importe"
//               placeholder="Importe"
//               name="importe"
//               value={formData.importe}
//               onChange={handleChange}
//               fluid
//             />
//           </div>
//           <div className="flex justify-center mt-6 w-full">
//             <Button type="submit" color="blue" icon labelPosition="left">
//               <Icon name="save" />
//               Guardar
//             </Button>
//           </div>
//         </div>
//       </Form>
//     </div>
//   )
// }

// export default AddSolicitudPlacas
