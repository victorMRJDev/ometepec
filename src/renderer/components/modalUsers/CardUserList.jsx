import React from 'react'

const CardUserList = ({nombre, apellidoPaterno, apellidoMaterno, onApprove}) => {
    return (
        <div className="flex items-center border-b-pantone207C justify-between border-b py-4 px-6">
          {/* Información básica */}
          <div className="leading-tight">
            <h3 className="font-calibri-bold text-2xl mb-1 text-pantoneCoolGray11C">{nombre} {apellidoPaterno} {apellidoMaterno} </h3>
          </div>
    
          {/* Botones de acción */}
          <div className="flex gap-4">
            <button
              className="bg-white font-calibri-regular text-xl text-pantoneCoolGray11C border-pantone207C border-2 px-4 py-2 rounded-md hover:bg-pantone207C-20"
              onClick={onApprove}
            >
              Ver Información
            </button>
            {/* <Button primary>Primary</Button> */}
            
          </div>
        </div>
      )
}

export default CardUserList;
