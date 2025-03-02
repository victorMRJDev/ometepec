import React from 'react'
import { Modal, Icon, Button } from 'semantic-ui-react'

const ModalMessages = ({ isOpen, onClose, type, message }) => {
  const isSuccess = type === 'success'
  const iconName = isSuccess ? 'check circle' : 'times circle'
  const iconColor = isSuccess ? 'green' : 'red'
  const headerText = isSuccess ? 'Éxito' : 'Error'
  return (
    <Modal open={isOpen} onClose={onClose} size="tiny">
      <Modal.Header className="flex items-center gap-2">
        <Icon name={iconName} color={iconColor} />
        {headerText}
      </Modal.Header>
      <Modal.Content>
        <p>{message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose} primary>
          Cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalMessages
