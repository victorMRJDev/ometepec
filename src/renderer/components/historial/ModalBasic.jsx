import React from 'react'
import { Icon, Modal, ModalContent, ModalDescription, ModalHeader } from 'semantic-ui-react'

const ModalBasic = (props) => {
  const { show, onClose, title, size, children } = props
  return (
    <>
      <Modal open={show} onClose={onClose} size={size} className="flex flex-row basic-modal">
        <Modal.Header
          style={{
            backgroundColor: '#bc955c',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          className="flex flex-row justify-between"
        >
          <div />
          <span className="">{title}</span>
          <Icon className="" name="close" onClick={onClose} link />
        </Modal.Header>

        <Modal.Content>{children}</Modal.Content>
      </Modal>
    </>
  )
}

ModalBasic.defaultProps = {
  size: 'tiny'
}

export default ModalBasic
