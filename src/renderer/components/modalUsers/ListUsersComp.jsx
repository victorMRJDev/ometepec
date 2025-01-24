import React, { useState } from 'react'
import { ModalContentUser } from '../../screens/users/ModalContentUser'
import ModalBasicUser from './ModalBasicUser'
import CardUserList from './CardUserList'
import { Icon, Input, Button } from 'semantic-ui-react'

export const ListUsersComp = ({ requests }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', data: null })

  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const [searchTerm, setSearchTerm] = useState('') // Estado para el término de búsqueda

  // function open modal
  const openModal = (title, data) => {
    setModalContent({ title, data })
    setIsModalOpen(true)
  }

  // function close modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const validatedRequests = requests.filter(
    (request) => request.rolUsuario === 'administrador' || request.rolUsuario === 'usuario'
  )

  const filteredRequests = validatedRequests.filter((request) => {
    const fullName =
      `${request.nombres} ${request.apellidoPaterno} ${request.apellidoMaterno}`.toLowerCase()
    const curp = request.curp.toLowerCase()

    return fullName.includes(searchTerm.toLowerCase()) || curp.includes(searchTerm.toLowerCase())
  })

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-md shadow-lg overflow-auto max-h-screen">
        <h2 className="text-2xl font-encodesans-medium  text-gray-800 border-b p-6">
          Lista de usuarios del sistema{' '}
        </h2>

        <div>
          <Button>Agregar Usuario</Button>
        </div>

        <div className="flex flex-col">
          <div className=" flex flex-row justify-between">
            <div></div>
            <div>
              <Input
                icon
                size="large"
                placeholder="Search..."
                className='className="w-10/12'
                value={searchTerm}
                onChange={handleSearchChange}
              >
                <input />
                <Icon name="search" />
              </Input>
            </div>
          </div>
          <div className="w-12/12 h-1 mt-6 mb-6 bg-pantone207C"></div>
        </div>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <CardUserList
              key={request.id}
              nombre={request.nombre}
              apellidoPaterno={request.apellidoPaterno}
              apellidoMaterno={request.apellidoMaterno}
              // date={new Date(request.created_at).toLocaleString()}
              // status={request.status}
              onApprove={() =>
                openModal('Detalles del usuario', {
                  id: request.id,
                  nombre: request.nombre,
                  apellidoPaterno: request.apellidoPaterno,
                  apellidoMaterno: request.apellidoMaterno,
                  // telefono: request.telefono,
                  genero: request.genero,
                  // fechaNacimiento: request.fechaNacimiento,
                  curp: request.curp,
                  rfc: request.rfc,
                  // tipoSangre: request.tipoSangre,
                  // alergias: request.alergias,
                  domicilio: request.domicilio
                })
              }
            />
          ))
        ) : (
          <p className="text-center text-gray-500 p-6">
            No hay solicitudes con documentos validados.
          </p>
        )}
      </div>
      <ModalBasicUser
        show={isModalOpen}
        onClose={closeModal}
        title={modalContent.title}
        size="large"
        children={
          modalContent.data && (
            <ModalContentUser {...modalContent.data}  />
          )
        }
      />
    </>
  )
}
