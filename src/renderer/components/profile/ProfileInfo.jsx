import React from 'react'
import CardProfile from './CardProfile'

const ProfileInfo = ({ dataInfo }) => {
  return (
    <>
      <div className="max-w-4xl mx-auto rounded-md shadow-lg max-h-screen ">
        <h2 className="text-2xl font-encodesans-medium text-center text-gray-800 border-b p-6">
          Mi información
        </h2>
        {
          <CardProfile
            nombre={dataInfo.nombre}
            apellidoPaterno={dataInfo.apellidoPaterno}
            apellidoMaterno={dataInfo.apellidoMaterno}
            correo={dataInfo.correo}
            numEmpleado={dataInfo.numEmpleado}
            curp={dataInfo.curp}
            edad={dataInfo.edad}
            rfc={dataInfo.rfc}
            // foto={request.foto}
          />
        }
      </div>
    </>
  )
}

export default ProfileInfo
