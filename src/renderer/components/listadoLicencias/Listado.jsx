import { useEffect, useState } from 'react'

import LicenseRequest from './CardPeticion'
import LicenseModal from '../modal/LicenseModal'
import LicensePreview from '../licenses/LicensePreview'
import BasicModal from '../modal/modal'
import ModalContent from '../modal/ModalContent'
import { Icon, Input, Button } from 'semantic-ui-react'

// Componente principal del listado
const LicenseRequestList = ({ requests, onDataChange }) => {
  // Filtrar solo las peticiones con documentos validados

  useEffect(() => {
    console.log('RESPUESTA SOLICITUDES', requests)
  })

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

  const openLicenseModal = (request) => {
    setSelectedRequest(request)
    setIsLicenseModalOpen(true)
  }

  const closeLicenseModal = () => {
    setSelectedRequest(null)
    setIsLicenseModalOpen(false)
    if (onDataChange) {
      onDataChange()
    }
  }

  // const validatedRequests = requests.filter((request) => request.status === 'generado')
  const validatedRequests = requests.filter(
    (request) => request.status === 'aprobada' || request.status === 'generado'
  )

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

  // const sortedRequests = filteredRequests.sort((a, b) => {
  //   // Primero, ordenar por estado: "aprobada" primero, luego "generado"
  //   if (a.status === 'aprobada' && b.status !== 'aprobada') {
  //     return -1; // "a" viene antes que "b"
  //   } else if (a.status !== 'aprobada' && b.status === 'aprobada') {
  //     return 1; // "b" viene antes que "a"
  //   } else {
  //     // Si ambos tienen el mismo estado, ordenar por fecha (más reciente primero)
  //     const dateA = new Date(a.fechaExpedicion);
  //     const dateB = new Date(b.fechaExpedicion);
  //     return dateB - dateA;
  //   }
  // });

  const sortedRequests = filteredRequests.sort((a, b) => {
    // Convertir las fechas a objetos Date para poder compararlas
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
  
    // Ordenar de más reciente a más antiguo
    return dateB - dateA;
  });
  

  // Ahora `sortedReques2ts` contiene los registros ordenados por fecha
  console.log('ORDENADOS2', sortedRequests)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-md shadow-lg overflow-auto max-h-screen">
        <h2 className="text-2xl font-encodesans-medium  text-gray-800 border-b p-6">
          Peticiones de Licencias de Conducir
        </h2>
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
        {sortedRequests.length > 0 ? (
          sortedRequests.map((request) => (
            <LicenseRequest
              key={request.id}
              name={request.nombres}
              apellidoPaterno={request.apellidoPaterno}
              apellidoMaterno={request.apellidoMaterno}
              date={new Date(request.created_at).toLocaleString()}
              status={request.status}
              onApprove={() =>
                openModal('Detalles de la solicitud', {
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
                  costo: request.costo,
                  descPorcentaje: request.descPorcentaje,
                  costoFinal: request.costoFinal,
                  tipoTramite: request.tipoTramite,
                  duracion: request.duracion,
                  condonacion: request.condonacion,
                  observacionCondona: request.observacionCondona,
                  responsable: request.responsable
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
                  costo: request.costo,
                  descPorcentaje: request.descPorcentaje,
                  costoFinal: request.costoFinal,
                  tipoTramite: request.tipoTramite,
                  duracion: request.duracion,
                  condonacion: request.condonacion,
                  observacionCondona: request.observacionCondona,
                  responsable: request.responsable
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
      <BasicModal
        show={isModalOpen}
        onClose={closeModal}
        title={modalContent.title}
        size="large"
        children={
          modalContent.data && <ModalContent {...modalContent.data} onDataChange={onDataChange} />
        }
      />

      <LicenseModal
        open={isLicenseModalOpen}
        onClose={closeLicenseModal}
        request={selectedRequest}
        onDataChange={onDataChange}
      />
    </>
  )
}
export default LicenseRequestList
