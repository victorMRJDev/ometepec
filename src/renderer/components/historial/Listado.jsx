import React, { useEffect, useState } from 'react'
import CardPreview from './CardPreview'
import { Icon, Input } from 'semantic-ui-react'
import ModalBasic from './ModalBasic'
import ContentHistoryModal from './ContentHistoryModal'
import { useNavigate } from 'react-router-dom'

const Listado = ({ requests }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', data: null })

  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const [searchTerm, setSearchTerm] = useState('') // Estado para el término de búsqueda
  const navigate = useNavigate()

  // function open modal
  const openModal = (title, data) => {
    setModalContent({ title, data })
    setIsModalOpen(true)
  }

  // function close modal
  const closeModal = () => {
    setIsModalOpen(false)
    if (onDataChange) {
      onDataChange() // Re-fetchar datos al cerrar el modal
    }
  }

  const validatedRequests = requests.filter((request) => request.status === 'generado')

  const filteredRequests = validatedRequests.filter((request) => {
    const fullName = `${request.nombres} ${request.apellidoPaterno} ${request.apellidoMaterno}`
    const licenseNumber = request.numLicencia || ''
    const licenseType = request.tipoLicencia || ''
    const curp = request.curp || ''

    const term = searchTerm.toLowerCase()

    return (
      fullName.toLowerCase().includes(term) ||
      licenseNumber.toLowerCase().includes(term) ||
      licenseType.toLowerCase().includes(term) ||
      curp.toLowerCase().includes(term)
    )
  })

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-md shadow-lg overflow-auto max-h-screen">
        <h2 className="text-2xl font-encodesans-medium  text-gray-800 border-b p-6">
          Historial de Licencias Generadas
        </h2>
        <div className="flex flex-col">
          <div className=" flex flex-row justify-between m-5">
            <div>
              <button className="ui red button" onClick={() => navigate('/generatereportlicenses')}>
                Reporte de Licencias Generadas
              </button>{' '}
            </div>
            <div>
              <Input
                icon
                size="large"
                placeholder="Search..."
                className="w-10/12"
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
            <CardPreview
              key={request.id}
              name={request.nombres}
              apellidoPaterno={request.apellidoPaterno}
              apellidoMaterno={request.apellidoMaterno}
              date={request.fechaExpedicion}
              status={request.status}
              onApprove={() =>
                openModal('Detalle del archivo', {
                  id: request.id,
                  nombres: request.nombres,
                  apellidoPaterno: request.apellidoPaterno,
                  apellidoMaterno: request.apellidoMaterno,
                  telefono: request.telefono,
                  sexo: request.sexo,
                  fechaNacimiento: request.fechaNacimiento,
                  curp: request.curp,
                  rfc: request.rfc,
                  tipoSangre: request.tipoSangre,
                  alergias: request.alergias,
                  domicilio: request.domicilio,
                  contactoEmergencia: request.contactoEmergencia,
                  donadorOrganos: request.donadorOrganos,
                  restricMedica: request.restricMedica,
                  status: request.status,
                  fotografia: request.fotografia,
                  firma: request.firma,
                  fechaExpedicion: request.fechaExpedicion,
                  fechaVencimiento: request.fechaVencimiento,
                  licenciaDe: request.licenciaDe,
                  tipoLicencia: request.tipoLicencia,
                  numLicencia: request.numLicencia,
                  condonacion: request.condonacion,
                  observacionCondona: request.observacionCondona,
                  responsable: request.responsable,
                })
              }
              onReject={() =>
                openLicenseModal({
                  id: request.id,
                  nombres: request.nombres,
                  apellidoPaterno: request.apellidoPaterno,
                  apellidoMaterno: request.apellidoMaterno,
                  telefono: request.telefono,
                  sexo: request.sexo,
                  fechaNacimiento: request.fechaNacimiento,
                  curp: request.curp,
                  rfc: request.rfc,
                  tipoSangre: request.tipoSangre,
                  alergias: request.alergias,
                  domicilio: request.domicilio,
                  contactoEmergencia: request.contactoEmergencia,
                  donadorOrganos: request.donadorOrganos,
                  restricMedica: request.restricMedica,
                  status: request.status,
                  fotografia: request.fotografia,
                  created_at: request.created_at,
                  updated_at: request.updated_at,
                  firma: request.firma,
                  fechaExpedicion: request.fechaExpedicion,
                  fechaVencimiento: request.fechaVencimiento,
                  licenciaDe: request.licenciaDe,
                  tipoLicencia: request.tipoLicencia,
                  numLicencia: request.numLicencia,
                  condonacion: request.condonacion,
                  observacionCondona: request.observacionCondona,
                  responsable: request.responsable,
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
      <ModalBasic
        show={isModalOpen}
        onClose={closeModal}
        title={modalContent.title}
        size="large"
        children={modalContent.data && <ContentHistoryModal {...modalContent.data} />}
      />

      {/* <LicenseModal
            open={isLicenseModalOpen}
            onClose={closeLicenseModal}
            request={selectedRequest}
            onDataChange={onDataChange}
          /> */}
    </>
  )
}

export default Listado
