import React from 'react'
import { Input } from 'semantic-ui-react'

const CardProfile = ({
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  correo,
  numEmpleado,
  curp,
  edad,
  rfc
}) => {
  return (
    <>
      <div className="flex items-center justify-between border-b py-4 px-6">
        {/* Información básica */}
        <div className="flex flex-col gap-6 leading-tight">
          <div className="flex flex-col gap-1">
            <label>Nombre de usuario</label>
            <Input placeholder="Nombre" disabled={true} value={nombre} />
          </div>

          <div className="flex flex-col gap-1">
            <label> Rol de usuario</label>
            <Input placeholder="Correo" disabled={true} value={correo} />
          </div>

          <div className="flex flex-col gap-1">
            <label>Num. Empleado</label>
            <Input placeholder="Num Empleado" disabled={true} value={numEmpleado} />
          </div>

          <div className="flex flex-col gap-1">
            <label>Curp</label>
            <Input placeholder="Curp" disabled={true} value={curp} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CardProfile
