import React from 'react'
import ProfileInfo from '../../components/profile/ProfileInfo';


const dataInfo = {
  name: 'Juan Perez',
  rol: 'Administrador',
  numEmpleado: '123456',
  curp: 'PERJ123456HDFR'
}
const ProfileUser = ()=> {
  return (
    <div className="min-h-screen py-10">
      <ProfileInfo dataInfo={dataInfo}/>
    </div>
  )
}

export default ProfileUser;