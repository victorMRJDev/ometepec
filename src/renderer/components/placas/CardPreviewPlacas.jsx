import React from 'react'

const CardPreviewPlacas = ({ nombres, apellidoPaterno, apellidoMaterno, fechaExpedicion, status, onApprove, onReject }) => {
    return (
        <div className="flex items-center border-b-pantone207C justify-between border-b py-4 px-6">
          {/* Información básica */}
          <div className="leading-tight">
            <h3 className="font-calibri-bold text-2xl mb-1 text-pantoneCoolGray11C">{nombres} {apellidoPaterno} {apellidoMaterno} </h3>
            <p className="text-pantoneCoolGray11C mb-1 font-calibri-regular text-xl">
              Fecha de expedición: {fechaExpedicion}
            </p>
            <p
              className={`text-lg font-calibri-regular ${status === 'aprobada' ? 'text-green-600' : 'text-yellow-600'}`}
            >
              Estado: {status}
            </p>
          </div>
    
          {/* Botones de acción */}
          <div className="flex gap-4">
            <button
              className="bg-white font-calibri-regular text-xl text-pantoneCoolGray11C border-pantone207C border-2 px-4 py-2 rounded-md hover:bg-pantone207C-20"
              onClick={onApprove}
            >
              Ver archivo
            </button>
            {/* <Button primary>Primary</Button> */}
            {/* <button
              className="bg-white font-calibri-regular text-xl border-2 border-pantone207C text-pantoneCoolGray11C px-4 py-2 rounded-md hover:bg-pantone207C-20"
              onClick={onReject}
            >
              Generar Licencia
            </button> */}
          </div>
        </div>
      )
}

export default CardPreviewPlacas;
