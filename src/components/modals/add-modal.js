import React, {useState} from "react";
import Interceptor from "../../config/interceptor";
import {PET_URLS} from "../../config/api-constants";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";

export const AddModal = ({visible, handleClose}) => {
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

    const handlePetSubmit = () =>{
        Interceptor({url: PET_URLS.addPet, method: 'POST', data: addObject})
            .then(response=> {
                setAddObject({
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
                })
                handleClose()
            })
    }


    return(
        <Modal show={visible} onHide={handleClose}>
                  <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Add Pet</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                  </div>
                  <div className="modal-body">
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
                  </div>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                          Close
                      </Button>
                      <Button variant="primary" onClick={handlePetSubmit}>Send message</Button>
                  </Modal.Footer>
        </Modal>
  )
}
