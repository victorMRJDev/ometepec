import React, { useEffect, useState } from 'react'

import logogro from '../../../assets/estadogro.png'
import ssplogo from '../../../assets/ssp_logo.png'
import logoome from '../../../assets/Ometepec/PNG/logo_vBlancoOme.png'
import cinta from '../../../assets//cintaSuperior.png'


import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.default ? pdfFonts.default.vfs : pdfFonts.pdfMake.vfs;

const GenerateReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [licencias, setLicencias] = useState([]);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchLicenciasGeneradas = async () => {
      // Se requiere definir ambas fechas para hacer la consulta
      if (!startDate || !endDate) return;
      try {
        const response = await window.api.getLicenciasGeneradas(startDate, endDate);
        console.log('Respuesta de getLicenciasGeneradas:', response);
        if (response && response.success && Array.isArray(response.data)) {
          setLicencias(response.data);
        } else {
          console.error('La respuesta no contiene un arreglo de datos:', response);
          setError('Los datos de licencias generadas no tienen el formato esperado.');
          setLicencias([]);
        }
      } catch (err) {
        setError('Error al obtener las licencias generadas');
        console.error(err);
      }
    };

    fetchLicenciasGeneradas();
  }, [startDate, endDate]);


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


  const handleGeneratePDF = async (type, licencias, startDate, endDate) => {
    const logoBase64 = await getBase64Image(ssplogo);
    console.log('Datos recibidos de la base:', licencias);
  
    try {
      // Filtrar licencias por el rango de fechas
      const permisosFiltrados = licencias.filter((licencia) => {
        const fechaLicencia = new Date(licencia.FechaExpedicion);
        return fechaLicencia >= new Date(startDate) && fechaLicencia <= new Date(endDate);
      });
  
      // Construcción de la tabla
      const tableBody = [
        ['Núm de Licencia', 'Nombre', 'Expedición', 'Expedida por', 'Observación'],
        ...licencias.map((licencia) => [
          licencia.NumeroLicencia || '',
          licencia.Nombre || '',
          licencia.FechaExpedicion ? new Date(licencia.FechaExpedicion).toLocaleDateString() : '',
          licencia.ExpedidaPor || '',
          `La licencia fue generada por un costo de: $${licencia.Costo} MXN. \n Condonación: ${licencia.Condonacion} ${licencia.Observacion} ` || ''
        ])
      ];
  
      // Definición del documento PDF
      const dd = {
        pageOrientation: 'landscape',
        footer: function (currentPage, pageCount) {
          return {
            columns: [
              { text: `Página ${currentPage} de ${pageCount}`, alignment: 'right', margin: [0, 10, 30, 0] }
            ]
          };
        },
        content: [
          {
            columns: [
              { image: logoBase64, width: 150, opacity: 1 },
              {
                width: '*',
                text: 'Reporte de generación de licencias de conducir del H. Ayuntamiento de Ometepec, Guerrero.',
                style: 'header',
                alignment: 'center'
              }
            ]
          },
          `\nPeriodo inicio: ${startDate}`,
          `Periodo Final: ${endDate}\n\n`,
          {
            style: 'tableExample',
            table: {
              widths: [100, 100, '*', '*', '*'],
              body: tableBody
            }
          },
          '\n\n',
          {
            text: '_________________________',
            alignment: 'center',
            margin: [0, 10, 0, 5]
          },
          {
            text: 'C. Arturo García Ramírez',
            alignment: 'center',
            fontSize: 12,
            bold: true
          },
          {
            text: 'Coordinador de permisos y licencias del H. Ayuntamiento municipal de Ometepec, Gro.',
            alignment: 'center',
            fontSize: 10,
            italics: true
          }
        ],
        styles: {
          header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
          tableExample: { margin: [0, 5, 0, 15] }
        }
      };
  
      // Generar y descargar el PDF
      pdfMake.createPdf(dd).download(`Reporte_Licencias_${startDate}_a_${endDate}.pdf`);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };
  


  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="bg-white rounded shadow-lg w-full max-w-4xl p-6">
        <h1 className="text-2xl font-bold mb-4">Generar Reportes de Licencias</h1>
        <p className="font-bold mb-6">Selecciona un rango de fechas para generar el reporte</p>
        <div className="flex space-x-6 items-end">
          <div>
            <p>Fecha de Inicio:</p>
            <div className="ui left icon input">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <i className="calendar alternate icon"></i>
            </div>
          </div>
          <div>
            <p>Fecha de Final:</p>
            <div className="ui left icon input">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <i className="calendar alternate icon"></i>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            className="ui red button"
            onClick={() => handleGeneratePDF('Reporte_Licencias', licencias, startDate, endDate)}
            disabled={!startDate || !endDate}
          >
            Reporte de Licencias Generadas
          </button>
        </div>
      </div>
    </div>


  )
}

export default GenerateReports