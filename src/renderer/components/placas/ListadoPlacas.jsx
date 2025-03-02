import React, { useState } from 'react'
import CardPreviewPlacas from './CardPreviewPlacas'
import { Icon, Input } from 'semantic-ui-react'
import DetailHistoryPlacas from './DetailHistoryPlacas'
import ModalBasic from '../historial/ModalBasic'

const ListadoPlacas = ({ requests }) => {
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
    if (onDataChange) {
      onDataChange() // Re-fetchar datos al cerrar el modal
    }
  }

  const validatedRequests = requests.filter((request) => request.status === 'Vigente')

  const filteredRequests = validatedRequests.filter((request) => {
    const fullName = `${request.nombres} ${request.apellidoPaterno} ${request.apellidoMaterno}`
    const numSerie = request.numSerie || ''
    const numMotor = request.numMotor || ''
    const folioUnico = request.folioUnico || ''

    const term = searchTerm.toLowerCase()

    return (
      fullName.toLowerCase().includes(term) ||
      numSerie.toLowerCase().includes(term) ||
      numMotor.toLowerCase().includes(term) ||
      folioUnico.toLowerCase().includes(term)
    )
  })

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-md shadow-lg overflow-auto max-h-screen">
        <h2 className="text-2xl font-encodesans-medium  text-gray-800 border-b p-6">
          Historial de Permisos Generados
        </h2>
        <div className="flex flex-col">
          <div className=" flex flex-row justify-between m-5">
            {/* <div>
              <button className="ui red button" onClick={() => navigate('/generatereportlicenses')}>
                Reporte de Placas generadas
              </button>{' '}
            </div> */}
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
            <CardPreviewPlacas
              key={request.id}
              nombres={request.nombres}
              apellidoPaterno={request.apellidoPaterno}
              apellidoMaterno={request.apellidoMaterno}
              fechaExpedicion={request.fechaExpedicion}
              status={request.status}
              onApprove={() =>
                openModal('Detalle del archivo', {
                  id: request.id,
                  nombres: request.nombres,
                  apellidoPaterno: request.apellidoPaterno,
                  apellidoMaterno: request.apellidoMaterno,
                  fechaExpedicion: request.fechaExpedicion,
                  fechaVencimiento: request.fechaVencimiento,
                  numSerie: request.numSerie,
                  numMotor: request.numMotor,
                  marca: request.marca,
                  yearModelo: request.yearModelo,
                  color: request.color,
                  rfcSolicitante: request.rfcSolicitante,
                  domicilio: request.domicilio,
                  importe: request.importe,
                  status: request.status,
                  idUser: request.idUser
                })
              }
              onReject={() =>
                openLicenseModal({
                  id: request.id,
                  nombres: request.nombres,
                  apellidoPaterno: request.apellidoPaterno,
                  apellidoMaterno: request.apellidoMaterno,
                  fechaExpedicion: request.fechaExpedicion,
                  fechaVencimiento: request.fechaVencimiento,
                  numSerie: request.numSerie,
                  numMotor: request.numMotor,
                  marca: request.marca,
                  yearModelo: request.yearModelo,
                  color: request.color,
                  rfcSolicitante: request.rfcSolicitante,
                  domicilio: request.domicilio,
                  importe: request.importe,
                  status: request.status,
                  idUser: request.idUser
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
        children={modalContent.data && <DetailHistoryPlacas {...modalContent.data} />}
      />
    </>
  )
}

export default ListadoPlacas
