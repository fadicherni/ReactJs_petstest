import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Interceptor from "../../config/interceptor";
import {PET_URLS} from "../../config/api-constants";

export const EditModal = ({ visible, handleClose, petObject, refreshFunc}) => {
    const [addObject,setAddObject]=useState({
        "id": 0,
        "category": {
            "id": 0,
            "name": "string"
        },
        "name": "",
        "photoUrls": [
        ],
        "tags": [
            {
                "id": 0,
                "name": "string"
            }
        ],
        "status": "available"
    });

    useEffect(()=> {
        setAddObject(prevState => {
            return{
                ...prevState,
                photoUrls: [petObject.petImage],
                name: petObject.name,
                category: petObject.category,
                id: petObject.petId,
            }
        })
    }, [petObject])


    const confirmEdit = () => {
        Interceptor(
            {
                url: PET_URLS.addPet,
                method:"PUT",
                data: addObject
            }
        ).then(response => {
            handleClose()
            refreshFunc()
        })
    }
    return(
      <Modal show={visible} onHide={handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Edit Pet</Modal.Title>
                  </Modal.Header>
                    <Modal.Body>
                      <form>
                          <div className="mb-3">
                              <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                              <input value={addObject.name} type="text" className="form-control" id="pet-name" onChange={(value)=>{
                                  setAddObject(prevState => {
                                      return{
                                          ...prevState, name: value.target.value
                                      }
                                  })
                              }}/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="recipient-name" className="col-form-label">Photo url:</label>
                              <input value={addObject?.photoUrls?.[0]} type="text" className="form-control" id="pet-photo" onChange={(value)=>{
                                  setAddObject(prevState => {
                                      return{
                                          ...prevState, photoUrls: [value.target.value]
                                      }
                                  })
                              }}/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="recipient-name" className="col-form-label">Category:</label>
                              <select onChange={(event)=> {
                                  setAddObject(prevState => {
                                      return{
                                          ...prevState, category: {id:0, name:event.target.value}
                                      }
                                  })
                              }
                              } className="form-select form-select">
                                  <option value="category 1">category 1</option>
                                  <option value="category 2">category 2</option>
                                  <option value="category 3">category 3</option>
                              </select>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="recipient-name" className="col-form-label">Category:</label>
                              <select onChange={(event)=> {
                                  setAddObject(prevState => {
                                      return{
                                          ...prevState, status: event.target.value
                                      }
                                  })
                              }} className="form-select form-select">
                                  <option value="available">available</option>
                                  <option value="pending">pending</option>
                                  <option value="sold">sold</option>
                              </select>
                          </div>
                      </form>
                    </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                          Close
                      </Button>
                      <Button variant="primary" onClick={confirmEdit}>
                          Edit Pet
                      </Button>
                  </Modal.Footer>
      </Modal>
  )
}
