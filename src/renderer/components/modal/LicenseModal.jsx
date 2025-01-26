// LicenseModal.jsx
import React from 'react'
import { Modal } from 'semantic-ui-react' // O la librería que uses
import LicensePreview from '../licenses/LicensePreview'

const LicenseModal = ({ open, onClose, request }) => {
  console.log('Request en LicenseModal', request)
  return (
    <Modal open={open} onClose={onClose} size="fullscreen" dimmer="blurring">
      <Modal.Header>Generar Licencia</Modal.Header>
      <div className="flex w-12/12 justify-center m-10 ">
        <Modal.Content>
          {/* Aquí pones tu LicensePreview, pasándole el request */}
          <LicensePreview {...request} />
        </Modal.Content>
      </div>
      <Modal.Actions>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-pantone207C font-encodesans-medium text-1xl text-white w-2/12 rounded hover:bg-pantone465C"
        >
          Cerrar
        </button>
      </Modal.Actions>
    </Modal>
  )
}

export default LicenseModal
