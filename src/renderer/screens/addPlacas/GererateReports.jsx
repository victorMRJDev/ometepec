import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import logogro from '../../../assets/estadogro.png'
import ssplogo from '../../../assets/ssp_logo.png'
import logoome from '../../../assets/Ometepec/PNG/logo_vBlancoOme.png'
import cinta from '../../../assets//cintaSuperior.png'

import pagado from '../../../assets//pagado.png'

const GenerateReports = () => {
  const [permisos, setPermisos] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const response = await window.api.getPermisos()
        console.log('Respuesta de getPermisos:', response) // Para depuración

        if (response && Array.isArray(response.data)) {
          setPermisos(response.data)
        } else {
          console.error('La respuesta no contiene un arreglo bajo la clave "data":', response)
          setError('Los datos de permisos no tienen el formato esperado.')
          setPermisos([]) // Opcional: establece permisos como un arreglo vacío
        }
      } catch (err) {
        setError('Error al obtener los permisos')
        console.error(err)
      }
    }

    fetchPermisos()
  }, [])
  const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.setAttribute('crossOrigin', 'anonymous')

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL('image/png')
        resolve(dataURL)
      }

      img.onerror = (error) => {
        console.error('Error cargando la imagen:', url, error)
        reject(new Error(`No se pudo cargar la imagen: ${url}`))
      }

      console.log('Cargando imagen:', url)
      img.src = url
    })
  }

  const formatearFecha = (fecha) => {
    if (!fecha) return ''

    const date = new Date(fecha)
    const opciones = { day: 'numeric', month: 'long', year: 'numeric' }
    const fechaFormateada = date.toLocaleDateString('es-ES', opciones)
    return fechaFormateada.toUpperCase()
  }
  // Función auxiliar para agregar texto centrado
  const agregarTextoCentrado = (doc, texto, y, fontSize = 12, color = '#000000') => {
    const pageWidth = doc.internal.pageSize.getWidth()
    doc.setFontSize(fontSize)
    doc.setTextColor(color)
    doc.text(texto, pageWidth / 2, y, { align: 'center' })
  }
  // Función auxiliar para agregar texto justificado
  function addJustifiedText(doc, text, x, y, maxWidth, lineHeight = 14) {
    const words = text.split(' ')
    let line = ''
    let lines = []

    // Formar líneas que no excedan maxWidth
    words.forEach((word) => {
      const testLine = line + word + ' '
      const testWidth = doc.getTextWidth(testLine)
      if (testWidth > maxWidth && line !== '') {
        lines.push(line.trim())
        line = word + ' '
      } else {
        line = testLine
      }
    })
    if (line) {
      lines.push(line.trim())
    }

    // Justificar cada línea
    lines.forEach((ln, index) => {
      if (index === lines.length - 1) {
        // La última línea se alinea a la izquierda
        doc.text(ln, x, y + index * lineHeight, { align: 'left' })
      } else {
        const wordsInLine = ln.split(' ')
        if (wordsInLine.length === 1) {
          doc.text(ln, x, y + index * lineHeight, { align: 'left' })
          return
        }
        const numSpaces = wordsInLine.length - 1
        const lineWithoutSpaces = ln.replace(/ /g, '')
        const totalSpaceWidth = maxWidth - doc.getTextWidth(lineWithoutSpaces)
        const spaceWidth = totalSpaceWidth / numSpaces

        let currentX = x
        wordsInLine.forEach((word, wIndex) => {
          doc.text(word, currentX, y + index * lineHeight)
          currentX += doc.getTextWidth(word)
          if (wIndex < wordsInLine.length - 1) {
            currentX += spaceWidth
          }
        })
      }
    })
  }

  const formatoFechaDos =(fecha) => {

  }
  const handleGeneratePDF = async (type, permiso) => {
    try {
      // Crear una nueva instancia de jsPDF
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter'
      })

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()

      // Cargar imágenes necesarias
      // const fondo = await getBase64Image('assets/imagen_fondo.png') // Reemplaza con la ruta correcta
      const logoIzquierda = await getBase64Image(logogro)
      const logoDerecha = await getBase64Image(ssplogo)
      const logoCentral = await getBase64Image(logoome)
      const cintaSup = await getBase64Image(cinta)

      // const qrImage = await getBase64Image('../../../../assets//omevr.png')

      // Añadir fondo
      // doc.addImage(fondo, 'PNG', pageWidth / 4, 50, pageWidth / 2, pageHeight / 2)

      // Añadir la tira superior
      const pageWidthS = doc.internal.pageSize.getWidth()

      // doc.setFillColor('#000000') // Color de la tira, ajusta según tu diseño
      // doc.rect(0, 0, pageWidth, 50, 'F') // Tira de 50 pt de alto
      doc.addImage(cintaSup, 'PNG', 20, 25, pageWidthS - 50, 20)

      // Añadir logos
      const logoWidth = 100
      const logoHeight = 50
      doc.addImage(logoIzquierda, 'PNG', 20, 60, logoWidth, logoHeight)
      doc.addImage(logoDerecha, 'PNG', pageWidth - logoWidth - 20, 60, logoWidth, logoHeight)

      // Añadir textos principales
      doc.setFontSize(16)
      doc.setFont('Helvetica', 'bold')
      doc.setTextColor('#800000')
      doc.text('PERMISO PROVISIONAL PARA CIRCULAR SIN PLACAS', pageWidth / 2, 130, {
        align: 'center'
      })

      doc.setFontSize(30)
      doc.setFont('Helvetica', 'normal')
      doc.text('VÁLIDO POR 30 DÍAS', pageWidth / 2, 160, { align: 'center', marginbottom: 20 })

      // Añadir 3 columnas
      const columnY = 180
      const columnWidth = pageWidth / 3

      doc.setFontSize(30)
      doc.setTextColor('#000000')
      doc.text('OMETEPEC', columnWidth / 2, columnY + 25, { align: 'center' })

      doc.setFontSize(10)
      doc.text('"Convicción De Servir" 2021-2024', columnWidth / 2, columnY + 45, {
        align: 'center'
      })

      // Segunda columna - Logo central
      doc.addImage(logoCentral, 'PNG', pageWidth / 2 - 50, columnY - 10, 50, 50)
      const desplazamientoX = 30 // Puedes ajustar este valor según tus necesidades

      // const thirdColumnX = 2 * columnWidth + columnWidth / 2
      const thirdColumnX = 2 * columnWidth + columnWidth / 2 - desplazamientoX

      // Línea 1
      doc.setFontSize(8)
      doc.text('ASUNTO: PERMISO TEMPORAL PARA CIRCULAR SIN PLACAS', thirdColumnX, columnY + 10, {
        align: 'center'
      })
      // Línea 2
      doc.text('POR TRÁMITE DE EMPLACAMIENTO', thirdColumnX, columnY + 30, { align: 'center' })

      // Línea 3
      // doc.text('FOLIO ÚNICO', thirdColumnX, columnY + 20, { align: 'center',margintop:40 })
      doc.text(`FOLIO ÚNICO: ${permiso.folioUnico}`, thirdColumnX, columnY + 20, {
        align: 'center'
      })

      // Línea 4
      doc.text(
        `OMETEPEC, GRO A ${formatearFecha(permiso.fechaExpedicion)}`,
        thirdColumnX,
        columnY + 40,
        { align: 'center' }
      )

      // Sección de autoridades
      let authY = columnY + 80
      const auths = [
        'C. AUTORIDADES FEDERALES DE LA FISCALÍA GENERAL DE LA REPÚBLICA',
        'C. AUTORIDADES ESTATALES DE SEGURIDAD PÚBLICA',
        'C. AUTORIDADES MUNICIPALES DE SEGURIDAD PÚBLICA',
        'P R E S E N T E S'
      ]

      doc.setFontSize(10)
      auths.forEach((auth, index) => {
        doc.text(auth, 40, authY + index * 12)
      })

      // Texto de facultades
      const facultades = `En ejercicio de la facultad que me confieren los artículos 28 de la ley de Transporte y Vialidad del Estado de Guerrero así como el 26, 119 y 122 del Reglamento de la Ley de Transporte y Vialidad del Estado de Guerrero me permito informarles que el vehículo que a continuación se describe, se le ha expedido y al mismo tiempo autorizado un permiso temporal para circular sin placas, durante el periodo comprendido del:`

      doc.text(facultades, 40, authY + 65, { maxWidth: pageWidth - 80 })
      // agregarTextoCentrado(doc, facultades, authY + 65, { maxWidth: pageWidth - 80 }, '#000000')

      // Fechas de expedición y vencimiento
      doc.setFont('Helvetica', 'bold')
      doc.setFontSize(16)
      doc.text(
        `${formatearFecha(permiso.fechaExpedicion)} AL ${formatearFecha(permiso.fechaVencimiento)}`,
        pageWidth / 2,
        authY + 140,
        { align: 'center' }
      )

      // Texto de agradecimiento
      const agradecimiento = `Por lo cual agradeceré a ustedes brinden todas las facilidades necesarias a su conductor para circular todos los días y en cualquier horario, por el periodo señalado.`
      doc.setFont('Helvetica', 'normal')
      doc.setFontSize(10)
      doc.text(agradecimiento, 40, authY + 170, { maxWidth: pageWidth - 80 })

      // Sección de características del vehículo y QR
      const vehiculoY = authY + 220
      doc.setFontSize(14)
      doc.setFont('Helvetica', 'bold')
      doc.text('CARACTERÍSTICAS DEL VEHÍCULO', 80, vehiculoY)

      doc.setFontSize(12)
      doc.setFont('Helvetica', 'normal')
      const caracteristicas = [
        `NÚMERO DE SERIE: ${permiso.numSerie}`,
        `NÚMERO DE MOTOR: ${permiso.numMotor}`,
        `MARCA: ${permiso.marca}`,
        `AÑO/MODELO: ${permiso.yearModelo}`,
        // `LÍNEA: ${permiso.linea}`,
        `COLOR: ${permiso.color}`,
        `CONTRIBUYENTE: ${permiso.nombres} ${permiso.apellidoPaterno} ${permiso.apellidoMaterno} `
      ]

      caracteristicas.forEach((item, index) => {
        doc.text(item, 80, vehiculoY + 20 + index * 15)
      })

      // Columna derecha con QR y año
      // doc.addImage(qrImage, 'PNG', pageWidth - 150, vehiculoY, 100, 100)
      doc.setFontSize(30)
      doc.text(`${new Date().getFullYear()}`, pageWidth - 100, vehiculoY + 110, {
        align: 'center'
      })

      // // Firma
      // const firmaY = vehiculoY + 140
      // doc.setFontSize(12)
      // doc.text('Atentamente,', 80, firmaY)
      // doc.text('CMTE. SABAD GARCÍA PRUDENTE', 80, firmaY + 20)
      // doc.text('DIRECTOR DE TRÁNSITO MUNICIPAL DE JUCHITAN, GRO.', 80, firmaY + 40)
      const firmaY = vehiculoY + 140
      doc.setFontSize(12)

      agregarTextoCentrado(doc, 'Atentamente,', firmaY + 40, 12)
      agregarTextoCentrado(doc, 'CMTE. SABAD GARCÍA PRUDENTE', firmaY + 80, 12)
      agregarTextoCentrado(doc, 'DIRECTOR DE TRÁNSITO MUNICIPAL DE OMETEPEC, GRO.', firmaY + 93, 12)

      // Guardar o descargar el PDF
      doc.save(`Permiso_Provisional_${permiso.folioUnico}.pdf`)
    } catch (error) {
      console.error('Error al generar el PDF:', error)
      alert('Hubo un error al generar el PDF. Por favor, intenta nuevamente.')
    }
  }

  const handleGenratePermisoPagado = async (type, permiso) => {
    if (!permiso) return

    const doc = new jsPDF()
    // Encabezado
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('H. AYUNTAMIENTO MUNICIPAL', 105, 20, { align: 'center' })
    doc.text('OMETEPEC, GRO.', 105, 30, { align: 'center' })
    const pageWidth = doc.internal.pageSize.getWidth() // Ancho de la página

    // Cargar imágenes en Base64
    const loadImage = async (url) => {
      const response = await fetch(url)
      const blob = await response.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    }

    const leftImageData = await loadImage(logogro)
    const rightImageData = await loadImage(logoome)
    const rightImageData1 = await loadImage(ssplogo)
    const rightImageData2 = await loadImage(pagado)

    const imgWidth = 50 // Ancho de las imágenes gro
    const imgHeight = 15 // Alto de las imágenes gro

    const imgWidth1 = 20 // Alto de las imágenes gro

    // Agregar imagen izquierda (x=10, y=10)
    doc.addImage(leftImageData, 'PNG', 10, 15, imgWidth, imgHeight)

    // Agregar imagen derecha (x=ancho_pagina - ancho_imagen - margen, y=10)
    doc.addImage(rightImageData, 'PNG', pageWidth - imgWidth - 5, 15, imgWidth1, imgHeight)
    doc.addImage(rightImageData1, 'PNG', pageWidth - imgWidth + 20, 15, imgWidth1, imgHeight)

    doc.addImage(rightImageData2, 'PNG', 70, 30, 80, 80)

    // Título
    doc.setFontSize(14)
    doc.text('Permiso provisional para circular sin placas por 30 días', 105, 50, {
      align: 'center'
    })

    // Información principal
    doc.setFontSize(12)
    const startY = 55 // Posición Y inicial
    const col1X = 20 // Posición X de la primera tabla
    const col2X = 60 // Posición X de la segunda tabla
    const col3X = 125 // Posición X de la tercera tabla
    const cellWidth1 = 40 // Ancho de cada celda
    const cellWidth2 = 65 // Ancho de cada celda
    const cellWidth3 = 65 // Ancho de cada celda
    const cellHeight = 10 // Alto de cada celda

    // Dibujar celdas manualmente con rectángulos
    doc.rect(col1X, startY, cellWidth1, cellHeight)
    doc.rect(col2X, startY, cellWidth2, cellHeight)
    doc.rect(col3X, startY, cellWidth3, cellHeight)

    // Primera tabla (Folio)
    doc.setFont('helvetica', 'bold')
    doc.text('Folio: ', col1X + 2, startY + 6)
    doc.setFont('helvetica', 'normal')
    doc.text(`${permiso.folioUnico}`, col1X + 15, startY + 6)

    // Segunda tabla (fecha)
    doc.setFont('helvetica', 'bold')
    doc.text('Fecha Expedición: ', col2X + 2, startY + 6)
    doc.setFont('helvetica', 'normal')
    doc.text(new Date(permiso.fechaExpedicion).toLocaleDateString('es-MX'), col2X + 40, startY + 6)

    // Tercera tabla (fecha)
    doc.setFont('helvetica', 'bold')
    doc.text('Fecha Vencimiento: ', col3X + 2, startY + 6)
    doc.setFont('helvetica', 'normal')
    doc.text(new Date(permiso.fechaVencimiento).toLocaleDateString('es-MX'), col3X + 43, startY + 6)

    const startY2 = 65 // Posición Y inicial
    const col1X2 = 20 // Posición X de la primera tabla
    const col2X2 = 125 // Posición X de la tercera tabla
    const cellWidth12 = 105 // Ancho de cada celda
    const cellWidth22 = 65 // Ancho de cada celda
    const cellHeight2 = 10 // Alto de cada celda

    // Dibujar celdas manualmente con rectángulos
    doc.rect(col1X2, startY2, cellWidth12, cellHeight2)
    doc.rect(col2X2, startY2, cellWidth22, cellHeight2)

    // Primera tabla (solicitante)
    doc.setFont('helvetica', 'bold')
    doc.text('Solicitante: ', col1X2 + 2, startY2 + 6)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`${permiso.nombres} ${permiso.apellidoPaterno} ${permiso.apellidoMaterno}`, col1X2 + 25, startY2 + 6)
    doc.setFontSize(12)

    // Segunda tabla (rfc)
    doc.setFont('helvetica', 'bold')
    doc.text('RFC: ', col2X2 + 2, startY2 + 6)
    doc.setFont('helvetica', 'normal')
    doc.text(`${permiso.rfcSolicitante}`, col2X2 + 13, startY2 + 6)

    const startY3 = 75 // Posición Y inicial
    const col1X3 = 20 // Posición X de la primera tabla
    const cellWidth13 = 170 // Ancho de cada celda
    const cellHeight3 = 10 // Alto de cada celda

    // Dibujar celdas manualmente con rectángulos
    doc.rect(col1X3, startY3, cellWidth13, cellHeight3)

    // Primera tabla (domicilio)
    doc.setFont('helvetica', 'bold')
    doc.text('Domicilio: ', col1X3 + 2, startY3 + 6)
    doc.setFont('helvetica', 'normal')
    doc.text(`${permiso.domicilio}`, col1X3 + 23, startY3 + 6)

    const startY4 = 85 // Posición Y inicial
    const col1X4 = 20 // Posición X de la primera tabla
    const cellWidth14 = 170 // Ancho de cada celda
    const cellHeight4 = 10 // Alto de cada celda

    // Dibujar celdas manualmente con rectángulos
    doc.rect(col1X4, startY4, cellWidth14, cellHeight4)

    // Primera tabla (domicilio)
    doc.setFont('helvetica', 'bold')
    doc.text('Importe: ', col1X4 + 2, startY4 + 6)
    doc.setFont('helvetica', 'normal')
    doc.text(`$ ${permiso.importe}`, col1X4 + 19, startY4 + 6)

    // Fundamento legal
    const fundamento = `Con fundamento en lo dispuesto por los artículos 115 fracciones II y III, incisos h) e i) de la Constitución Política de los Estados Unidos Mexicanos; 20 fracción XXXI de la Ley Orgánica de la Administración Pública del Estado de Guerrero; 28 de la Ley de Transporte y Vialidad del Estado de Guerrero; 1° de la Ley de Ingresos del Estado de Guerrero, para el ejercicio fiscal 2014; 104 fracción VIII inciso b) párrafo segundo de la Ley de Hacienda del Estado de Guerrero número 428, y conforme al Anexo 2 del Convenio de Colaboración Administrativa en Materia Fiscal para la delegación de facultades de verificación del cumplimiento de obligaciones fiscales, con relación a los pagos del impuesto sobre tenencia o uso de vehículos y de los derechos por la expedición de placas, tarjeta de circulación y calcomanía de matrícula, de fecha 31 de octubre de 2012.

Véase en el portal de gobierno del estado, en Consejería Jurídica.`

    doc.setFontSize(10)
    const startX5 = 20 // Posición X de la celda
    const startY5 = 125 // Posición Y de la celda
    const cellWidth5 = 170 // Ancho de la celda
    const cellHeight5 = 6 // Alto de la celda
    // Configurar fuente en cursiva
    doc.setFont('helvetica', 'italic')
    // Dibujar la celda

    // Divide el texto en líneas ajustadas al ancho permitido
    doc.text(fundamento, startX5, startY5, { maxWidth: cellWidth5, align: 'justify' })

    // Footer
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('PAGADO', 105, 280, { align: 'center' })

    // Guardar PDF
    doc.save(`Recibo_Permiso_${permiso.folioUnico}.pdf`)
  }
  return (
    <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold">Lista de Permisos</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(permisos) && permisos.length > 0 ? (
          permisos.map((permiso) => (
            <div key={permiso.id} className="p-4 border rounded shadow bg-white">
              <h2 className="text-xl font-semibold">Folio: {permiso.folioUnico}</h2>
              <p>
                Solicitante:{' '}
                {`${permiso.nombres} ${permiso.apellidoPaterno} ${permiso.apellidoMaterno}`}
              </p>
              {/* <p>Fecha de Expedición: {new Date(permiso.fechaExpedicion).toLocaleDateString()}</p>
              <p>Fecha de Vencimiento: {new Date(permiso.fechaVencimiento).toLocaleDateString()}</p> */}
              <p>Fecha de Expedición: {formatearFecha(permiso.fechaExpedicion)}</p>
              <p>Fecha de Vencimiento: {formatearFecha(permiso.fechaVencimiento)}</p>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleGeneratePDF('Permiso', permiso)}
                  className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Generar Permiso
                </button>

                <button
                  onClick={() => handleGenratePermisoPagado('Permiso_pagado', permiso)}
                  className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Generar Recibo de pago
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay permisos disponibles.</p>
        )}
      </div>
    </div>
  )
}

export default GenerateReports
// // // GenerateReports.jsx
// // // import React, { useEffect, useState, useRef } from 'react'
// // // import html2pdf from 'html2pdf.js'

// // // import logogro from '../../../assets/estadogro.png'
// // // import ssplogo from '../../../assets/ssp_logo.png'
// // // import logoome from '../../../assets/Ometepec/PNG/logo_vBlancoOme.png'

// // // const GenerateReports = () => {
// // //   const [permisos, setPermisos] = useState([])
// // //   const [error, setError] = useState(null)
// // //   const pdfRef = useRef()

// // //   useEffect(() => {
// // //     const fetchPermisos = async () => {
// // //       try {
// // //         const response = await window.api.getPermisos()
// // //         console.log('Respuesta de getPermisos:', response) // Para depuración

// // //         if (response && Array.isArray(response.data)) {
// // //           setPermisos(response.data)
// // //         } else {
// // //           console.error('La respuesta no contiene un arreglo bajo la clave "data":', response)
// // //           setError('Los datos de permisos no tienen el formato esperado.')
// // //           setPermisos([]) // Opcional: establece permisos como un arreglo vacío
// // //         }
// // //       } catch (err) {
// // //         setError('Error al obtener los permisos')
// // //         console.error(err)
// // //       }
// // //     }

// // //     fetchPermisos()
// // //   }, [])

// // //   const formatearFecha = (fecha) => {
// // //     if (!fecha) return ''

// // //     const date = new Date(fecha)
// // //     const opciones = { day: 'numeric', month: 'long', year: 'numeric' }
// // //     const fechaFormateada = date.toLocaleDateString('es-ES', opciones)
// // //     return fechaFormateada.toUpperCase()
// // //   }

// // //   // Función para generar el PDF usando html2pdf
// // //   const handleGeneratePDF = (permiso) => {
// // //     const element = pdfRef.current
// // //     const opt = {
// // //       margin:       10,
// // //       filename:     `Permiso_Provisional_${permiso.folioUnico}.pdf`,
// // //       image:        { type: 'jpeg', quality: 0.98 },
// // //       html2canvas:  { scale: 2 },
// // //       jsPDF:        { unit: 'pt', format: 'letter', orientation: 'portrait' }
// // //     }

// // //     html2pdf().set(opt).from(element).save()
// // //   }

// // //   return (
// // //     <div className="p-4 space-y-4">
// // //       <h1 className="text-2xl font-bold">Lista de Permisos</h1>
// // //       {error && <p className="text-red-500">{error}</p>}
// // //       <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
// // //         {Array.isArray(permisos) && permisos.length > 0 ? (
// // //           permisos.map((permiso) => (
// // //             <div key={permiso.id} className="p-4 border rounded shadow bg-white">
// // //               <h2 className="text-xl font-semibold">Folio: {permiso.folioUnico}</h2>
// // //               <p>
// // //                 Solicitante: {`${permiso.nombres} ${permiso.apellidoPaterno} ${permiso.apellidoMaterno}`}
// // //               </p>
// // //               <p>Fecha de Expedición: {formatearFecha(permiso.fechaExpedicion)}</p>
// // //               <p>Fecha de Vencimiento: {formatearFecha(permiso.fechaVencimiento)}</p>

// // //               <div className="mt-4 space-y-2">
// // //                 <button
// // //                   onClick={() => handleGeneratePDF(permiso)}
// // //                   className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
// // //                 >
// // //                   Generar Permiso
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <p>No hay permisos disponibles.</p>
// // //         )}
// // //       </div>

// // //       {/* Contenido para el PDF */}
// // //       <div ref={pdfRef} style={{ display: 'none' }}>
// // //         <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', padding: '20px' }}>
// // //           {/* Tira superior con colores y logos */}
// // //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#000', padding: '10px' }}>
// // //             <img src={logogro} alt="Logo Estado de Guerrero" style={{ width: '100px', height: 'auto' }} />
// // //             <img src={ssplogo} alt="Logo SSP" style={{ width: '100px', height: 'auto' }} />
// // //           </div>

// // //           {/* Título principal */}
// // //           <h1 style={{ textAlign: 'center', color: '#800000', marginTop: '20px' }}>
// // //             PERMISO PROVISIONAL PARA CIRCULAR SIN PLACAS
// // //           </h1>

// // //           <h2 style={{ textAlign: 'center', marginTop: '10px' }}>
// // //             VÁLIDO POR 30 DÍAS
// // //           </h2>

// // //           {/* Contenedor de columnas */}
// // //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
// // //             {/* Primera columna */}
// // //             <div style={{ width: '30%', textAlign: 'center' }}>
// // //               <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>JUCHITÁN</h3>
// // //               <p style={{ fontSize: '12px', marginBottom: '5px' }}>"Convicción De Servir" 2021-2024</p>
// // //               <p style={{ fontSize: '12px' }}>Otra línea de texto izquierda</p>
// // //             </div>

// // //             {/* Logo central */}
// // //             <div style={{ width: '30%', textAlign: 'center' }}>
// // //               <img src={logoome} alt="Logo Ometepec" style={{ width: '50px', height: '50px' }} />
// // //             </div>

// // //             {/* Tercera columna ajustada a la izquierda */}
// // //             <div style={{ width: '30%', textAlign: 'center' }}>
// // //               <p style={{ fontSize: '8px' }}>ASUNTO: PERMISO TEMPORAL PARA CIRCULAR SIN PLACAS</p>
// // //               <p style={{ fontSize: '8px' }}>POR TRÁMITE DE EMPLACAMIENTO</p>
// // //               <p style={{ fontSize: '8px' }}>FOLIO ÚNICO: {permiso.folioUnico}</p>
// // //               <p style={{ fontSize: '8px' }}>JUCHITAN, GRO A {formatearFecha(permiso.fechaExpedicion)}</p>
// // //               <p style={{ fontSize: '8px' }}>Otra línea de texto derecha</p>
// // //             </div>
// // //           </div>

// // //           {/* Sección de autoridades */}
// // //           <div style={{ marginTop: '40px' }}>
// // //             <p><strong>C. AUTORIDADES FEDERALES DE LA FISCALÍA GENERAL DE LA REPÚBLICA</strong></p>
// // //             <p><strong>C. AUTORIDADES ESTATALES DE SEGURIDAD PÚBLICA</strong></p>
// // //             <p><strong>C. AUTORIDADES MUNICIPALES DE SEGURIDAD PÚBLICA</strong></p>
// // //             <p><strong>P R E S E N T E S</strong></p>
// // //           </div>

// // //           {/* Texto de facultades */}
// // //           <div style={{ marginTop: '20px', textAlign: 'justify', fontSize: '10px' }}>
// // //             <p>
// // //               En ejercicio de la facultad que me confieren los artículos 28 de la ley de Transporte y Vialidad del Estado de Guerrero así como el 26, 119 y 122 del Reglamento de la Ley de Transporte y Vialidad del Estado de Guerrero me permito informarles que el vehículo que a continuación se describe, se le ha expedido y al mismo tiempo autorizado un permiso temporal para circular sin placas, durante el periodo comprendido del:
// // //             </p>
// // //           </div>

// // //           {/* Fechas de expedición y vencimiento */}
// // //           <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', marginTop: '20px' }}>
// // //             {`${formatearFecha(permiso.fechaExpedicion)} AL ${formatearFecha(permiso.fechaVencimiento)}`}
// // //           </div>

// // //           {/* Texto de agradecimiento */}
// // //           <div style={{ marginTop: '20px', textAlign: 'justify', fontSize: '10px' }}>
// // //             <p>
// // //               Por lo cual agradeceré a ustedes brinden todas las facilidades necesarias a su conductor para circular todos los días y en cualquier horario, por el periodo señalado.
// // //             </p>
// // //           </div>

// // //           {/* Sección de características del vehículo */}
// // //           <div style={{ marginTop: '30px' }}>
// // //             <h3 style={{ textAlign: 'center', fontSize: '14px' }}>CARACTERÍSTICAS DEL VEHÍCULO</h3>
// // //             <ul style={{ listStyleType: 'none', padding: '0', fontSize: '12px' }}>
// // //               <li><strong>NÚMERO DE SERIE:</strong> {permiso.numSerie}</li>
// // //               <li><strong>NÚMERO DE MOTOR:</strong> {permiso.numMotor}</li>
// // //               <li><strong>MARCA:</strong> {permiso.marca}</li>
// // //               <li><strong>AÑO/MODELO:</strong> {permiso.yearModelo}</li>
// // //               <li><strong>COLOR:</strong> {permiso.color}</li>
// // //               <li><strong>CONTRIBUYENTE:</strong> {`${permiso.nombres} ${permiso.apellidoPaterno} ${permiso.apellidoMaterno}`}</li>
// // //             </ul>
// // //           </div>

// // //           {/* Año y QR (si es necesario) */}
// // //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
// // //             <div>
// // //               {/* Inserta el QR si lo tienes */}
// // //               {/* <img src={qrImage} alt="QR" style={{ width: '100px', height: '100px' }} /> */}
// // //             </div>
// // //             <div style={{ textAlign: 'center', fontSize: '30px' }}>
// // //               {new Date().getFullYear()}
// // //             </div>
// // //           </div>

// // //           {/* Firma centrada */}
// // //           <div style={{ marginTop: '60px', textAlign: 'center' }}>
// // //             <p style={{ fontSize: '12px' }}>Atentamente,</p>
// // //             <p style={{ fontSize: '12px', marginTop: '20px' }}>CMTE. SABAD GARCÍA PRUDENTE</p>
// // //             <p style={{ fontSize: '12px', marginTop: '5px' }}>DIRECTOR DE TRÁNSITO MUNICIPAL DE JUCHITAN, GRO.</p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default GenerateReports
// // // GenerateReports.jsx
// // // GenerateReports.jsx
// // import React, { useEffect, useState, useRef } from 'react'
// // import html2pdf from 'html2pdf.js'

// // import logogro from '../../../assets/estadogro.png'
// // import ssplogo from '../../../assets/ssp_logo.png'
// // import logoome from '../../../assets/Ometepec/PNG/logo_vBlancoOme.png'

// // const GenerateReports = () => {
// //   const [permisos, setPermisos] = useState([])
// //   const [error, setError] = useState(null)
// //   const [currentPermiso, setCurrentPermiso] = useState(null) // Estado para el permiso actual
// //   const pdfRef = useRef()

// //   useEffect(() => {
// //     const fetchPermisos = async () => {
// //       try {
// //         const response = await window.api.getPermisos()
// //         console.log('Respuesta de getPermisos:', response) // Para depuración

// //         if (response && Array.isArray(response.data)) {
// //           setPermisos(response.data)
// //         } else {
// //           console.error('La respuesta no contiene un arreglo bajo la clave "data":', response)
// //           setError('Los datos de permisos no tienen el formato esperado.')
// //           setPermisos([]) // Opcional: establece permisos como un arreglo vacío
// //         }
// //       } catch (err) {
// //         setError('Error al obtener los permisos')
// //         console.error(err)
// //       }
// //     }

// //     fetchPermisos()
// //   }, [])

// //   const formatearFecha = (fecha) => {
// //     if (!fecha) return ''

// //     const date = new Date(fecha)
// //     const opciones = { day: 'numeric', month: 'long', year: 'numeric' }
// //     const fechaFormateada = date.toLocaleDateString('es-ES', opciones)
// //     return fechaFormateada.toUpperCase()
// //   }

// //   // Función para generar el PDF usando html2pdf
// //   const handleGeneratePDF = (permiso) => {
// //     setCurrentPermiso(permiso) // Establecer el permiso actual
// //   }

// //   useEffect(() => {
// //     if (currentPermiso) {
// //       console.log('Generando PDF para:', currentPermiso) // Para depuración

// //       // Esperar a que el contenido se renderice completamente
// //       setTimeout(() => {
// //         const element = pdfRef.current
// //         const opt = {
// //           margin: 10,
// //           filename: `Permiso_Provisional_${currentPermiso.folioUnico}.pdf`,
// //           image: { type: 'jpeg', quality: 0.98 },
// //           html2canvas: { scale: 2 },
// //           jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
// //         }

// //         html2pdf().set(opt).from(element).save()
// //         setCurrentPermiso(null) // Limpiar después de la generación
// //       }, 1000) // Retraso de 1 segundo para asegurar el renderizado
// //     }
// //   }, [currentPermiso])

// //   return (
// //     <div className="p-4 space-y-4">
// //       <h1 className="text-2xl font-bold">Lista de Permisos</h1>
// //       {error && <p className="text-red-500">{error}</p>}
// //       <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
// //         {Array.isArray(permisos) && permisos.length > 0 ? (
// //           permisos.map((permiso) => (
// //             <div key={permiso.id} className="p-4 border rounded shadow bg-white">
// //               <h2 className="text-xl font-semibold">Folio: {permiso.folioUnico}</h2>
// //               <p>
// //                 Solicitante:{' '}
// //                 {`${permiso.nombres} ${permiso.apellidoPaterno} ${permiso.apellidoMaterno}`}
// //               </p>
// //               <p>Fecha de Expedición: {formatearFecha(permiso.fechaExpedicion)}</p>
// //               <p>Fecha de Vencimiento: {formatearFecha(permiso.fechaVencimiento)}</p>

// //               <div className="mt-4 space-y-2">
// //                 <button
// //                   onClick={() => handleGeneratePDF(permiso)}
// //                   className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
// //                 >
// //                   Generar Permiso
// //                 </button>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <p>No hay permisos disponibles.</p>
// //         )}
// //       </div>

// //       {/* Contenido para el PDF */}
// //       {currentPermiso && (
// //         <div
// //           ref={pdfRef}
// //           style={{
// //             position: 'absolute',
// //             top: '-10000px',
// //             left: '-10000px',
// //             width: '210mm', // Tamaño A4 estándar
// //             padding: '20px',
// //             fontFamily: 'Helvetica, Arial, sans-serif',
// //             backgroundColor: 'white' // Opcional: para ver el fondo
// //           }}
// //         >
// //           {/* Tira superior con colores y logos */}
// //           <div
// //             style={{
// //               display: 'flex',
// //               justifyContent: 'space-between',
// //               alignItems: 'center',
// //               backgroundColor: '#000',
// //               padding: '10px'
// //             }}
// //           >
// //             <img
// //               src={logogro}
// //               alt="Logo Estado de Guerrero"
// //               style={{ width: '100px', height: 'auto' }}
// //             />
// //             <img src={ssplogo} alt="Logo SSP" style={{ width: '100px', height: 'auto' }} />
// //           </div>

// //           {/* Título principal */}
// //           <h1 style={{ textAlign: 'center', color: '#800000', marginTop: '20px' }}>
// //             PERMISO PROVISIONAL PARA CIRCULAR SIN PLACAS
// //           </h1>

// //           <h2 style={{ textAlign: 'center', marginTop: '10px' }}>VÁLIDO POR 30 DÍAS</h2>

// //           {/* Contenedor de columnas */}
// //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
// //             {/* Primera columna */}
// //             <div style={{ width: '30%', textAlign: 'center' }}>
// //               <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>JUCHITÁN</h3>
// //               <p style={{ fontSize: '12px', marginBottom: '5px' }}>
// //                 "Convicción De Servir" 2021-2024
// //               </p>
// //               <p style={{ fontSize: '12px' }}>Otra línea de texto izquierda</p>
// //             </div>

// //             {/* Logo central */}
// //             <div style={{ width: '30%', textAlign: 'center' }}>
// //               <img src={logoome} alt="Logo Ometepec" style={{ width: '50px', height: '50px' }} />
// //             </div>

// //             {/* Tercera columna ajustada a la izquierda */}
// //             <div style={{ width: '30%', textAlign: 'center' }}>
// //               <p style={{ fontSize: '8px' }}>ASUNTO: PERMISO TEMPORAL PARA CIRCULAR SIN PLACAS</p>
// //               <p style={{ fontSize: '8px' }}>POR TRÁMITE DE EMPLACAMIENTO</p>
// //               <p style={{ fontSize: '8px' }}>FOLIO ÚNICO: {currentPermiso.folioUnico}</p>
// //               <p style={{ fontSize: '8px' }}>
// //                 JUCHITAN, GRO A {formatearFecha(currentPermiso.fechaExpedicion)}
// //               </p>
// //               <p style={{ fontSize: '8px' }}>Otra línea de texto derecha</p>
// //             </div>
// //           </div>

// //           {/* Sección de autoridades */}
// //           <div style={{ marginTop: '40px' }}>
// //             <p>
// //               <strong>C. AUTORIDADES FEDERALES DE LA FISCALÍA GENERAL DE LA REPÚBLICA</strong>
// //             </p>
// //             <p>
// //               <strong>C. AUTORIDADES ESTATALES DE SEGURIDAD PÚBLICA</strong>
// //             </p>
// //             <p>
// //               <strong>C. AUTORIDADES MUNICIPALES DE SEGURIDAD PÚBLICA</strong>
// //             </p>
// //             <p>
// //               <strong>P R E S E N T E S</strong>
// //             </p>
// //           </div>

// //           {/* Texto de facultades */}
// //           <div style={{ marginTop: '20px', textAlign: 'justify', fontSize: '10px' }}>
// //             <p>
// //               En ejercicio de la facultad que me confieren los artículos 28 de la ley de Transporte
// //               y Vialidad del Estado de Guerrero así como el 26, 119 y 122 del Reglamento de la Ley
// //               de Transporte y Vialidad del Estado de Guerrero me permito informarles que el vehículo
// //               que a continuación se describe, se le ha expedido y al mismo tiempo autorizado un
// //               permiso temporal para circular sin placas, durante el periodo comprendido del:
// //             </p>
// //           </div>

// //           {/* Fechas de expedición y vencimiento */}
// //           <div
// //             style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', marginTop: '20px' }}
// //           >
// //             {`${formatearFecha(currentPermiso.fechaExpedicion)} AL ${formatearFecha(currentPermiso.fechaVencimiento)}`}
// //           </div>

// //           {/* Texto de agradecimiento */}
// //           <div style={{ marginTop: '20px', textAlign: 'justify', fontSize: '10px' }}>
// //             <p>
// //               Por lo cual agradeceré a ustedes brinden todas las facilidades necesarias a su
// //               conductor para circular todos los días y en cualquier horario, por el periodo
// //               señalado.
// //             </p>
// //           </div>

// //           {/* Sección de características del vehículo */}
// //           <div style={{ marginTop: '30px' }}>
// //             <h3 style={{ textAlign: 'center', fontSize: '14px' }}>CARACTERÍSTICAS DEL VEHÍCULO</h3>
// //             <ul style={{ listStyleType: 'none', padding: '0', fontSize: '12px' }}>
// //               <li>
// //                 <strong>NÚMERO DE SERIE:</strong> {currentPermiso.numSerie}
// //               </li>
// //               <li>
// //                 <strong>NÚMERO DE MOTOR:</strong> {currentPermiso.numMotor}
// //               </li>
// //               <li>
// //                 <strong>MARCA:</strong> {currentPermiso.marca}
// //               </li>
// //               <li>
// //                 <strong>AÑO/MODELO:</strong> {currentPermiso.yearModelo}
// //               </li>
// //               <li>
// //                 <strong>COLOR:</strong> {currentPermiso.color}
// //               </li>
// //               <li>
// //                 <strong>CONTRIBUYENTE:</strong>{' '}
// //                 {`${currentPermiso.nombres} ${currentPermiso.apellidoPaterno} ${currentPermiso.apellidoMaterno}`}
// //               </li>
// //             </ul>
// //           </div>

// //           {/* Año y QR (si es necesario) */}
// //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
// //             <div>
// //               {/* Inserta el QR si lo tienes */}
// //               {/* <img src={qrImage} alt="QR" style={{ width: '100px', height: '100px' }} /> */}
// //             </div>
// //             <div style={{ textAlign: 'center', fontSize: '30px' }}>{new Date().getFullYear()}</div>
// //           </div>

// //           {/* Firma centrada */}
// //           <div style={{ marginTop: '60px', textAlign: 'center' }}>
// //             <p style={{ fontSize: '12px' }}>Atentamente,</p>
// //             <p style={{ fontSize: '12px', marginTop: '20px' }}>CMTE. SABAD GARCÍA PRUDENTE</p>
// //             <p style={{ fontSize: '12px', marginTop: '5px' }}>
// //               DIRECTOR DE TRÁNSITO MUNICIPAL DE JUCHITAN, GRO.
// //             </p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }
