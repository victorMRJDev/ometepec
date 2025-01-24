import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Input, Dropdown, Form, Button, Image, Segment, Icon } from 'semantic-ui-react'
import Webcam from 'react-webcam'

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
    numLicencia: ''
  })

  const [isCameraActive, setIsCameraActive] = useState(false)
  const webcamRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
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
  const handleClearSignature = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setFormData((prev) => ({ ...prev, firma: '' }))
  }, [])
  const handleSaveSignature = useCallback(() => {
    const canvas = canvasRef.current
    const signatureDataURL = canvas.toDataURL('image/png')

    setFormData((prev) => ({ ...prev, firma: signatureDataURL }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.curp) {
      console.log('Ingresa la CURP')
      return
    }

    setIsSubmitting(true)
    const licenciaData = { ...formData }

    try {
      const response = await window.api.insertLicencia(licenciaData)
      if (response.success) {
        alert('Licencia registrada exitosamente. ID: ' + response.id)
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
          numLicencia: '' || null
        })
        handleClearSignature()
      } else {
        console.log('Error al registrar la licencia: ' + response.error)
        // alert('Error al registrar la licencia: ' + response.error)
      }
    } catch (error) {
      console.log('Error al enviar los datos: ' + error)
      // alert('Ocurrió un error al enviar los datos. Por favor, intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4 px-2">
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-6 bg-white w-full max-w-7xl p-6 rounded-lg shadow-lg"
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
          )}
          <div className="mt-4">
            <label className="font-calibri-bold">Firma del Conductor</label>
            <canvas
              ref={canvasRef}
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
    </div>
  )
}

export default AddLicencia
