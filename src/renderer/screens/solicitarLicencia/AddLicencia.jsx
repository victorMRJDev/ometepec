import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Input, Dropdown, Form, Button, Image, Segment, Icon } from 'semantic-ui-react'
import Webcam from 'react-webcam'
import ModalMessages from '../../components/modal/ModalMessages'

const AddLicencia = () => {
  const [formData, setFormData] = useState({
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
    status: 'aprobada',
    fotografia: '',
    firma: '',
    fechaExpedicion: '',
    fechaVencimiento: '',
    licenciaDe: '',
    tipoLicencia: '',
    numLicencia: '',
    rutaIne: '',
    rutaEstSanguineo: '',
    condonacion: '',
    observacionCondona: ''
  })

  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false)
  const [modalTypeRegister, setModalTypeRegister] = useState('success')
  const [modalMesageRegister, setModalMessageRegister] = useState('')
  const [showMotivoCondonacion, setShowMotivoCondonacion] = useState(false)

  const [isCameraActive, setIsCameraActive] = useState(false)
  const webcamRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)
  const fileInputFirmaRef = useRef(null)
  const [signatureKey, setSignatureKey] = useState(0)
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)

  const sexoOptions = [
    { key: 'm', text: 'Masculino', value: 'masculino' },
    { key: 'f', text: 'Femenino', value: 'femenino' },
    { key: 'o', text: 'Otro', value: 'otro' }
  ]

  const donadorOrganosOptions = [
    { key: 'si', text: 'Sí', value: 'si' },
    { key: 'no', text: 'No', value: 'no' }
  ]
  const condonacionOptions = [
    { key: 'si', text: 'Sí', value: 'si' },
    { key: 'no', text: 'No', value: 'no' }
  ]

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
  }
  const handleCondonacionChange = (e, { value }) => {
    setFormData({ ...formData, condonacion: value })
    setShowMotivoCondonacion(value === 'si')
  }

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    if (imageSrc) {
      setFormData({ ...formData, fotografia: imageSrc })
      setIsCameraActive(false)
    }
  }

  const recapture = () => {
    setFormData({ ...formData, fotografia: '' })
    setIsCameraActive(false)
  }

  const activateCamera = () => {
    setIsCameraActive(true)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.style.touchAction = 'none'

    const ctx = canvas.getContext('2d')
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#000000'

    const getPointerPos = (e) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handlePointerDown = (e) => {
      e.preventDefault()
      isDrawingRef.current = true
      ctx.beginPath()
      const pos = getPointerPos(e)
      ctx.moveTo(pos.x, pos.y)
    }
    const handlePointerMove = (e) => {
      if (!isDrawingRef.current) return
      e.preventDefault()
      const pos = getPointerPos(e)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }

    const handlePointerUp = (e) => {
      e.preventDefault()
      isDrawingRef.current = false
      ctx.closePath()
    }
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerup', handlePointerUp)
    canvas.addEventListener('pointerleave', handlePointerUp)
    canvas.addEventListener('pointercancel', handlePointerUp)

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerup', handlePointerUp)
      canvas.removeEventListener('pointerleave', handlePointerUp)
      canvas.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [])

  const handleCanvasRef = useCallback((node) => {

    canvasRef.current = node;
    if (node) {
      // El canvas se montó, configura sus listeners
      node.style.touchAction = 'none'
      const ctx = node.getContext('2d')
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#000000'

      const getPointerPos = (e) => {
        const rect = node.getBoundingClientRect()
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }
      }

      const handlePointerDown = (e) => {
        e.preventDefault()
        isDrawingRef.current = true
        ctx.beginPath()
        const pos = getPointerPos(e)
        ctx.moveTo(pos.x, pos.y)
      }
      const handlePointerMove = (e) => {
        if (!isDrawingRef.current) return
        e.preventDefault()
        const pos = getPointerPos(e)
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke()
      }
      const handlePointerUp = (e) => {
        e.preventDefault()
        isDrawingRef.current = false
        ctx.closePath()
      }

      node.addEventListener('pointerdown', handlePointerDown)
      node.addEventListener('pointermove', handlePointerMove)
      node.addEventListener('pointerup', handlePointerUp)
      node.addEventListener('pointerleave', handlePointerUp)
      node.addEventListener('pointercancel', handlePointerUp)
      return () => {
        canvas.removeEventListener('pointerdown', handlePointerDown)
        canvas.removeEventListener('pointermove', handlePointerMove)
        canvas.removeEventListener('pointerup', handlePointerUp)
        canvas.removeEventListener('pointerleave', handlePointerUp)
        canvas.removeEventListener('pointercancel', handlePointerUp)
      }
    }
  }, [])
  const handleClearSignature = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setFormData((prev) => ({ ...prev, firma: '' }))
  }, [])
  const handleSaveSignature = useCallback(() => {
    const canvas = canvasRef.current
    const signatureDataURL = canvas.toDataURL('image/png')

    setFormData((prev) => ({ ...prev, firma: signatureDataURL }))
  }, [])

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, fotografia: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleFileUploadFirma = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, firma: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const [pdf1, setPdf1] = useState(null)
  const [pdf2, setPdf2] = useState(null)

  const pdf1Ref = useRef(null)
  const pdf2Ref = useRef(null)
  const [imagePhoto, setImagePhoto] = useState(null)
  const [imageFirma, setImageFirma] = useState(null)

  function dataURLtoFile(dataURL, fileName) {
    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], fileName, { type: mime })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.curp) {
      console.log('Ingresa la CURP')
      return
    }

    setIsSubmitting(true)
    const licenciaData = { ...formData }

    try {
      const fotoBlob = dataURLtoFile(formData.fotografia, 'fotografia.png')
      const firmaBlob = dataURLtoFile(formData.firma, 'firma.png')

      const uploadDataPersona = new FormData()

      uploadDataPersona.append('tipo', 'persona')
      uploadDataPersona.append('identificador', formData.curp)

      if (pdf1) uploadDataPersona.append('pdfs', pdf1)
      if (pdf2) uploadDataPersona.append('pdfs', pdf2)
      uploadDataPersona.append('images', fotoBlob)
      uploadDataPersona.append('images', firmaBlob)

      //OMETEPEC
      const uploadResponse = await fetch('http://192.168.1.64:3000/subir', {
      // const uploadResponse = await fetch('http://192.168.0.109:3000/subir', {
      // const uploadResponse = await fetch('http://192.168.50.185:3000/subir', {
        

        //local
        method: 'POST',
        body: uploadDataPersona
      })

      const data = await uploadResponse.json()

      const archivos = data.archivos

      const updateFormData = {
        ...formData,
        rutaIne: archivos[0]?.rutaCompleta || '',
        rutaEstSanguineo: archivos[1]?.rutaCompleta || '',
        fotografia: archivos[2]?.rutaCompleta || '',
        firma: archivos[3]?.rutaCompleta || ''
      }

      const response = await window.api.insertLicencia(updateFormData)
      console.log(response)

      console.log('DATOS FORMULARIO', updateFormData)
      if (response.success) {
        setModalTypeRegister('success')
        setModalMessageRegister('Solicitud de licencia generada correctamente')
        setIsModalRegisterOpen(true)

        handleClearSignature()
        setSignatureKey((prev) => prev + 1)
        setFormData({
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
          status: 'aprobada',
          fotografia: '',
          firma: '',
          fechaExpedicion: '' || null,
          fechaVencimiento: '' || null,
          licenciaDe: '' || null,
          tipoLicencia: '' || null,
          numLicencia: '' || null,
          rutaIne: '',
          rutaEstSanguineo: '',
          condonacion: '',
          observacionCondona: ''
        })

        if (pdf1Ref.current) pdf1Ref.current.value = ''
        if (pdf2Ref.current) pdf2Ref.current.value = ''
        setPdf1(null)
        setPdf2(null)
      } else {
        setModalTypeRegister('error')
        setModalMessageRegister('Error al registrar la solicitud de licencia')
        setIsModalRegisterOpen(true)
        console.log('Error al registrar la licencia: ' + response.error)
      }
    } catch (error) {
      console.log('Error al enviar los datos: ' + error)
      setModalTypeRegister('error')
      setModalMessageRegister('Error al enviar los datos. Por favor, intente de nuevo')
      setIsModalRegisterOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100 py-4 px-2 overflow-auto">
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-6 bg-white w-full p-6 rounded-lg shadow-lg max-h-[95vh] overflow-y-auto"
      >
        <div className="flex flex-col gap-4 w-full md:w-1/3">
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
            <label htmlFor="telefono" className="font-calibri-bold">
              Telefono/Celular
            </label>
            <Form.Input
              id="telefono"
              placeholder="Telefono/Celular"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              fluid
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="sexo" className="font-calibri-bold">
              Sexo
            </label>
            <div className="relative">
              <Dropdown
                id="sexo"
                placeholder="Selecciona Sexo"
                fluid
                selection
                options={sexoOptions}
                name="sexo"
                icon={null}
                value={formData.sexo}
                onChange={handleChange}
              />
              <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                <Icon name="angle down" className="text-gray-600" />
              </div>
            </div>
          </div>
          <div>
            <Form.Input
              label="Fecha de Nacimiento"
              placeholder="Seleccione la fecha de nacimiento"
              name="fechaNacimiento"
              type="date"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="curp" className="font-calibri-bold">
              Curp
            </label>
            <Form.Input
              id="curp"
              placeholder="Curp"
              name="curp"
              value={formData.curp}
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
            <label htmlFor="condonacion" className="font-calibri-bold">
              ¿Realizará condonación?
            </label>
            <div className="relative">
              <Dropdown
                id="condonacion"
                placeholder="Selecciona una opción"
                fluid
                icon={null}
                selection
                options={condonacionOptions}
                name="condonacion"
                value={formData.condonacion}
                onChange={handleCondonacionChange}
              />
              <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                <Icon name="angle down" className="text-gray-600" />
              </div>
            </div>
          </div>
          {showMotivoCondonacion && (
            <div className="flex flex-col gap-1 mt-2 mb-8">
              <label htmlFor="observacionCondona" className="font-calibri-bold">
                Motivo de condonación
              </label>
              <Form.Input
                id="observacionCondona"
                placeholder="Ingresa el motivo"
                name="observacionCondona"
                value={formData.observacionCondona}
                onChange={handleChange}
                fluid
              />
            </div>
          )}
          <br />
        </div>

        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="flex flex-col gap-1">
            <label htmlFor="tipoSangre" className="font-calibri-bold">
              Tipo de sangre
            </label>
            <Form.Input
              id="tipoSangre"
              placeholder="Tipo de Sangre"
              name="tipoSangre"
              value={formData.tipoSangre}
              onChange={handleChange}
              fluid
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="alergias" className="font-calibri-bold">
              Alergias
            </label>
            <Form.Input
              id="alergias"
              placeholder="Alergias"
              name="alergias"
              value={formData.alergias}
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
            <label htmlFor="contactoEmergencia" className="font-calibri-bold">
              Contacto de emergencia
            </label>
            <Form.Input
              id="contactoEmergencia"
              placeholder="Contacto de Emergencia"
              name="contactoEmergencia"
              value={formData.contactoEmergencia}
              onChange={handleChange}
              fluid
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="donadorOrganos" className="font-calibri-bold">
              Donador de órganos
            </label>
            <div className="relative">
              <Dropdown
                id="donadorOrganos"
                placeholder="Selecciona una opción"
                fluid
                selection
                icon={null}
                options={donadorOrganosOptions}
                name="donadorOrganos"
                value={formData.donadorOrganos}
                onChange={handleChange}
              />
              <div className="absolute top-0 right-2 h-full flex items-center pointer-events-none">
                <Icon name="angle down" className="text-gray-600" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="restricMedica" className="font-calibri-bold">
              Restricción Médica
            </label>
            <Form.Input
              id="restricMedica"
              placeholder="Restricción Médica"
              name="restricMedica"
              value={formData.restricMedica}
              onChange={handleChange}
              fluid
            />
          </div>
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
        </div>

        <div className="flex flex-col justify-center gap-4 w-full md:w-1/3">
          <label className="font-calibri-bold">Fotografía del Conductor</label>
          {formData.fotografia ? (
            <div className="flex flex-col items-center">
              <Image src={formData.fotografia} size="medium" rounded />
              <Button type="button" color="red" className="mt-2" onClick={recapture}>
                <Icon name="redo" /> Re-capturar Foto
              </Button>
            </div>
          ) : isCameraActive ? (
            <div className="flex flex-col items-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-lg border-2 border-gray-300"
                videoConstraints={{
                  width: 300,
                  height: 300,
                  facingMode: 'user'
                }}
                onUserMediaError={() =>
                  alert('No se pudo acceder a la cámara. Por favor, verifica los permisos.')
                }
              />
              <div className="flex gap-2 mt-2">
                <Button type="button" color="green" onClick={capture}>
                  <Icon name="camera" /> Capturar Foto
                </Button>
                <Button type="button" color="grey" onClick={() => setIsCameraActive(false)}>
                  <Icon name="close" /> Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Button
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #ab0033',
                  borderColor: '#ab0033'
                }}
                type="button"
                color="white"
                onClick={activateCamera}
              >
                <Icon name="camera retro" /> Activar Cámara
              </Button>
              <Button
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #ab0033',
                  borderColor: '#ab0033'
                }}
                type="button"
                color="white"
                onClick={() => fileInputRef.current.click()}
              >
                <Icon name="upload" /> Subir Foto
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </div>
          )}
          <div className="mt-4">
            <label className="font-calibri-bold">Firma del Conductor</label>
            {formData.firma ? (
              <div className="flex flex-col items-center mt-3">
                <label className="text-gray-700 font-semibold mb-2">Previsualización:</label>
                <Image
                  src={formData.firma}
                  size="medium"
                  alt="Firma"
                  bordered
                  style={{ backgroundColor: '#f1f1f1' }}
                />
                {/* <Button type="button" color="red" className="mt-2" onClick={handleClearSignature}>
                  <Icon name="redo" /> Re-capturar Firma
                </Button> */}
              </div>
            ) : (
              <>
                <canvas
                  key={signatureKey}
                  // ref={canvasRef}
                  ref={handleCanvasRef}
                  width={400}
                  height={150}
                  className="border border-gray-300 rounded mt-2"
                ></canvas>

                <div className="flex justify-between mt-2">
                  <Button type="button" color="red" onClick={handleClearSignature}>
                    <Icon name="eraser" /> Limpiar
                  </Button>
                  <Button type="button" color="green" onClick={handleSaveSignature}>
                    <Icon name="save" /> Guardar Firma
                  </Button>
                </div>

                {formData.firma && (
                  <div className="flex flex-col items-center mt-3">
                    <label className="text-gray-700 font-semibold mb-2">Previsualización:</label>
                    <Image
                      src={formData.firma}
                      size="medium"
                      alt="Firma"
                      bordered
                      style={{ backgroundColor: '#f1f1f1' }}
                    />
                  </div>
                )}

                <div className="mt-3">
                  <Button
                    type="button"
                    color="blue"
                    onClick={() => fileInputFirmaRef.current.click()}
                  >
                    <Icon name="upload" /> Subir Firma
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputFirmaRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUploadFirma}
                  />
                </div>
              </>
            )}
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
      </Form>
      <ModalMessages
        isOpen={isModalRegisterOpen}
        onClose={() => setIsModalRegisterOpen(false)}
        type={modalTypeRegister}
        message={modalMesageRegister}
      />
    </div>
  )
}

export default AddLicencia
