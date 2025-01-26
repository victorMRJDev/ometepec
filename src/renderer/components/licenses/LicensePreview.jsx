// import React, { useRef, useState, useEffect } from 'react'
// import html2canvas from 'html2canvas'
// import { jsPDF } from 'jspdf'
// import LicenseCard from '../licenses/LicenseCard'

// const LicensePreview = ({
//   id,
//   nombres,
//   apellidoPaterno,
//   apellidoMaterno,
//   telefono,
//   sexo,
//   fechaNacimiento,
//   curp,
//   rfc,
//   tipoSangre,
//   alergias,
//   domicilio,
//   contactoEmergencia,
//   donadorOrganos,
//   restricMedica,
//   status,
//   fotografia,
//   created_at,
//   updated_at,
//   firma,
//   fechaExpedicion,
//   fechaVencimiento,
//   licenciaDe,
//   tipoLicencia,
//   numLicencia
// }) => {
//   const licenseRef = useRef(null)

//   const [formData, setFormData] = useState({
//     id: '',
//     nombres: '',
//     apellidoPaterno: '',
//     apellidoMaterno: '',
//     telefono: '',
//     sexo: '',
//     fechaNacimiento: '',
//     curp: '',
//     rfc: '',
//     tipoSangre: '',
//     alergias: '',
//     domicilio: '',
//     contactoEmergencia: '',
//     donadorOrganos: '',
//     restricMedica: '',
//     status: '',
//     fotografia: '',
//     created_at: '',
//     updated_at: '',
//     firma: '',
//     fechaExpedicion: '',
//     fechaVencimiento: '',
//     licenciaDe: '',
//     tipoLicencia: '',
//     numLicencia: '',
//     idPersona: ''
//   })

//   useEffect(() => {
//     console.log('Props recibidas en LicensePreview', {
//       nombres,
//       curp,
//       rfc
//     })
//     setFormData({
//       id: id || '',
//       nombres: nombres || '',
//       apellidoPaterno: apellidoPaterno || '',
//       apellidoMaterno: apellidoMaterno || '',
//       telefono: telefono || '',
//       sexo: sexo || '',
//       fechaNacimiento: fechaNacimiento || '',
//       curp: curp || '',
//       rfc: rfc || '',
//       tipoSangre: tipoSangre || '',
//       alergias: alergias || '',
//       domicilio: domicilio || '',
//       contactoEmergencia: contactoEmergencia || '',
//       donadorOrganos: donadorOrganos || '',
//       restricMedica: restricMedica || '',
//       status: status || '',
//       fotografia: fotografia || '',
//       created_at: created_at || '',
//       updated_at: updated_at || '',
//       firma: firma || '',
//       fechaExpedicion: fechaExpedicion || '',
//       fechaVencimiento: fechaVencimiento || '',
//       licenciaDe: licenciaDe || '',
//       tipoLicencia: tipoLicencia || '',
//       numLicencia: numLicencia || '',
//       idPersona: id || ''
//     })
//   }, [
//     id,
//     nombres,
//     apellidoPaterno,
//     apellidoMaterno,
//     telefono,
//     sexo,
//     fechaNacimiento,
//     curp,
//     rfc,
//     tipoSangre,
//     alergias,
//     domicilio,
//     contactoEmergencia,
//     donadorOrganos,
//     restricMedica,
//     status,
//     fotografia,
//     created_at,
//     updated_at,
//     firma,
//     fechaExpedicion,
//     fechaVencimiento,
//     licenciaDe,
//     tipoLicencia,
//     numLicencia
//   ])

//   /**
//    * Generar PNG
//    */
//   const handleDownloadPNG = async () => {
//     if (!licenseRef.current) return

//     // 1. Renderizamos la sección en un canvas con html2canvas
//     const canvas = await html2canvas(licenseRef.current)
//     // 2. Lo convertimos a base64
//     const dataURL = canvas.toDataURL('image/png')
//     // 3. Creamos un enlace <a> para forzar la descarga
//     const link = document.createElement('a')
//     link.href = dataURL
//     link.download = `licencia-${request.id}.png`
//     link.click()
//   }

//   /**
//    * Generar PDF
//    */
//   const handleDownloadPDF = async () => {
//     if (!licenseRef.current) return

//     // 1. Renderizamos la sección en un canvas
//     const canvas = await html2canvas(licenseRef.current)
//     // 2. Convertimos a base64 (image/png)
//     const imgData = canvas.toDataURL('image/png')
//     // 3. Iniciamos jsPDF (orientación 'p', unidades 'pt' -puntos-, formato 'letter' o el que prefieras)
//     const pdf = new jsPDF('p', 'pt', 'letter')

//     // Opcional: podrías calcular posiciones para centrar la imagen en la hoja
//     // Por ejemplo: escalado para que quepa en una página letter
//     const pdfWidth = pdf.internal.pageSize.getWidth()
//     const pdfHeight = pdf.internal.pageSize.getHeight()

//     // Ajustamos la imagen para que quepa en la página
//     // (canvas.width y canvas.height son en px; podrías calcular escalado según DPI deseado)
//     const imgWidth = canvas.width
//     const imgHeight = canvas.height

//     // Escala la imagen para ajustarla al ancho del PDF si es mayor al ancho de la hoja
//     let ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
//     let finalWidth = imgWidth * ratio
//     let finalHeight = imgHeight * ratio

//     // 4. Agregamos la imagen al PDF en la posición (x=0, y=0). Ajusta si quieres centrar
//     pdf.addImage(
//       imgData,
//       'PNG',
//       (pdfWidth - finalWidth) / 2, // centrado horizontal
//       20, // margen top
//       finalWidth,
//       finalHeight
//     )

//     // 5. Guardar el PDF
//     pdf.save(`licencia-${request.id}.pdf`)
//   }

//   /**
//    * Imprimir (abre el diálogo de impresión del navegador)
//    */
//   const handlePrint = () => {
//     window.print()
//   }

//   return (
//     <div>
//       {/* Contenedor que se convertirá en imagen */}
//       <div ref={licenseRef} className="inline-block">
//         <LicenseCard
//           id={formData.id}
//           nombres={formData.nombres}
//           apellidoPaterno={formData.apellidoPaterno}
//           apellidoMaterno={formData.apellidoMaterno}
//           telefono={formData.telefono}
//           sexo={formData.sexo}
//           fechaNacimiento={formData.fechaNacimiento}
//           curp={formData.curp}
//           rfc={formData.rfc}
//           tipoSangre={formData.tipoSangre}
//           alergias={formData.alergias}
//           domicilio={formData.domicilio}
//           contactoEmergencia={formData.contactoEmergencia}
//           donadorOrganos={formData.donadorOrganos}
//           restricMedica={formData.restricMedica}
//           status={formData.status}
//           fotografia={formData.fotografia}
//           created_at={formData.created_at}
//           updated_at={formData.updated_at}
//           firma={formData.firma}
//           fechaExpedicion={formData.fechaExpedicion}
//           fechaVencimiento={formData.fechaVencimiento}
//           licenciaDe={formData.licenciaDe}
//           tipoLicencia={formData.tipoLicencia}
//           numLicencia={formData.numLicencia}
//         />
//       </div>

//       {/* Botones para generar PNG, PDF o imprimir */}
//       <div className="mt-9 flex space-x-2">
//         <button
//           onClick={handleDownloadPNG}
//           className="px-4 py-2 font-encodesans-medium bg-pantone465C text-white rounded hover:bg-pantone468C"
//         >
//           Descargar PNG
//         </button>

//         <button
//           onClick={handleDownloadPDF}
//           className="px-4 py-2 bg-pantone465C font-encodesans-medium text-white rounded hover:bg-pantone468C"
//         >
//           Descargar PDF
//         </button>

//         <button
//           onClick={handlePrint}
//           className="px-4 py-2 bg-pantone465C font-encodesans-medium text-white rounded hover:bg-pantone468C"
//         >
//           Imprimir
//         </button>
//       </div>
//     </div>
//   )
// }

// export default LicensePreview
import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import LicenseCardFront from '../licenses/LicenseCardFront';
import LicenseCardBack from '../licenses/LicenseCardBack';

const LicensePreview = ({
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
  numLicencia,
  duracion,
}) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);

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
    idPersona: '',
    duracion: ''
  });

  useEffect(() => {
    console.log('Props recibidas en LicensePreview', {
      nombres,
      curp,
      rfc
    });
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
      idPersona: id || '',
      duracion: duracion || ''
    });
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
    numLicencia,
    duracion
  ]);

 
  const handleDownloadPNG = async () => {
    if (!frontRef.current || !backRef.current) {
      console.error('Una de las referencias está vacía');
      return;
    }

    if (!formData.id) {
      console.error('formData.id no está definido');
      return;
    }

    try {
      const canvasFront = await html2canvas(frontRef.current);
      const dataURLFront = canvasFront.toDataURL('image/png');

      const linkFront = document.createElement('a');
      linkFront.href = dataURLFront;
      linkFront.download = `licencia-frontal-${formData.id}.png`;
      document.body.appendChild(linkFront);
      linkFront.click();
      document.body.removeChild(linkFront);

      const canvasBack = await html2canvas(backRef.current);
      const dataURLBack = canvasBack.toDataURL('image/png');

      const linkBack = document.createElement('a');
      linkBack.href = dataURLBack;
      linkBack.download = `licencia-trasera-${formData.id}.png`;
      document.body.appendChild(linkBack);
      linkBack.click();
      document.body.removeChild(linkBack);
    } catch (error) {
      console.error('Error al generar las imágenes PNG:', error);
    }
  };


  const handleDownloadPDF = async () => {
    if (!frontRef.current || !backRef.current) {
      console.error('Una de las referencias está vacía');
      return;
    }

    if (!formData.id) {
      console.error('formData.id no está definido');
      return;
    }

    try {
      const canvasFront = await html2canvas(frontRef.current);
      const imgDataFront = canvasFront.toDataURL('image/png');

      const canvasBack = await html2canvas(backRef.current);
      const imgDataBack = canvasBack.toDataURL('image/png');

      const pdf = new jsPDF('p', 'pt', 'letter');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidthFront = canvasFront.width;
      const imgHeightFront = canvasFront.height;

      let ratioFront = Math.min(pdfWidth / imgWidthFront, pdfHeight / imgHeightFront);
      let finalWidthFront = imgWidthFront * ratioFront;
      let finalHeightFront = imgHeightFront * ratioFront;

      pdf.addImage(
        imgDataFront,
        'PNG',
        (pdfWidth - finalWidthFront) / 2,
        20,
        finalWidthFront,
        finalHeightFront
      );

      pdf.addPage();

      const imgWidthBack = canvasBack.width;
      const imgHeightBack = canvasBack.height;

      let ratioBack = Math.min(pdfWidth / imgWidthBack, pdfHeight / imgHeightBack);
      let finalWidthBack = imgWidthBack * ratioBack;
      let finalHeightBack = imgHeightBack * ratioBack;

      pdf.addImage(
        imgDataBack,
        'PNG',
        (pdfWidth - finalWidthBack) / 2,
        20,
        finalWidthBack,
        finalHeightBack
      );

      pdf.save(`licencia-${formData.id}.pdf`);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex space-x-4">
        <div ref={frontRef} className="inline-block">
          <LicenseCardFront
            id={formData.id}
            nombres={formData.nombres}
            apellidoPaterno={formData.apellidoPaterno}
            apellidoMaterno={formData.apellidoMaterno}
            telefono={formData.telefono}
            sexo={formData.sexo}
            fechaNacimiento={formData.fechaNacimiento}
            curp={formData.curp}
            rfc={formData.rfc}
            tipoSangre={formData.tipoSangre}
            alergias={formData.alergias}
            domicilio={formData.domicilio}
            contactoEmergencia={formData.contactoEmergencia}
            donadorOrganos={formData.donadorOrganos}
            restricMedica={formData.restricMedica}
            status={formData.status}
            fotografia={formData.fotografia}
            created_at={formData.created_at}
            updated_at={formData.updated_at}
            firma={formData.firma}
            fechaExpedicion={formData.fechaExpedicion}
            fechaVencimiento={formData.fechaVencimiento}
            licenciaDe={formData.licenciaDe}
            tipoLicencia={formData.tipoLicencia}
            numLicencia={formData.numLicencia}
            duracion={formData.duracion}
          />
        </div>

        {/* Parte Trasera */}
        <div ref={backRef} className="inline-block">
          <LicenseCardBack
            id={formData.id}
            nombres={formData.nombres}
            apellidoPaterno={formData.apellidoPaterno}
            apellidoMaterno={formData.apellidoMaterno}
            telefono={formData.telefono}
            sexo={formData.sexo}
            fechaNacimiento={formData.fechaNacimiento}
            curp={formData.curp}
            rfc={formData.rfc}
            tipoSangre={formData.tipoSangre}
            alergias={formData.alergias}
            domicilio={formData.domicilio}
            contactoEmergencia={formData.contactoEmergencia}
            donadorOrganos={formData.donadorOrganos}
            restricMedica={formData.restricMedica}
            status={formData.status}
            fotografia={formData.fotografia}
            created_at={formData.created_at}
            updated_at={formData.updated_at}
            firma={formData.firma}
            fechaExpedicion={formData.fechaExpedicion}
            fechaVencimiento={formData.fechaVencimiento}
            licenciaDe={formData.licenciaDe}
            tipoLicencia={formData.tipoLicencia}
            numLicencia={formData.numLicencia}
          />
        </div>
      </div>

      {/* Botones para generar PNG, PDF o imprimir */}
      <div className="mt-9 flex space-x-2">
        <button
          onClick={handleDownloadPNG}
          className="px-4 py-2 font-encodesans-medium bg-pantone465C text-white rounded hover:bg-pantone468C"
        >
          Descargar PNG
        </button>

        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-pantone465C font-encodesans-medium text-white rounded hover:bg-pantone468C"
        >
          Descargar PDF
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-pantone465C font-encodesans-medium text-white rounded hover:bg-pantone468C"
        >
          Imprimir
        </button>
      </div>
    </div>
  );
};

export default LicensePreview;
