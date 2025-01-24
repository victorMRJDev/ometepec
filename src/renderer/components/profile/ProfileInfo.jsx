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
            name={dataInfo.name}
            rol={dataInfo.rol}
            numEmpleado={dataInfo.numEmpleado}
            curp={dataInfo.curp}
            // foto={request.foto}
          />
        }
      </div>
    </>
  )
}

export default ProfileInfo
