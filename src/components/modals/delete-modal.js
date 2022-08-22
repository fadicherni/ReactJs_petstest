import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const DeleteModal = ({confirmDelete, visible, handleClose}) => {

    return(
      <Modal show={visible} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Delete Pet</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this pet ?</Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              <Button variant="primary" onClick={confirmDelete}>
                 Delete Pet
              </Button>
          </Modal.Footer>
      </Modal>
  )
}
