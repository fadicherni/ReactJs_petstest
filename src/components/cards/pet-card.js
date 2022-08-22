import React, {useState} from "react";
import {URL_REGEX} from "../../config/constants";
import Interceptor from "../../config/interceptor";
import {PET_URLS} from "../../config/api-constants";
import {DeleteModal} from "../modals/delete-modal";
import {EditModal} from "../modals/edit-modal";

const PetCard = ({
         petImage,
         name,
         category={},
         tags=[],
         petId,
         refreshFunc
    }) => {
    const [isHovered, setIsHovered] =  useState(false);
    const [visible, setVisible] =  useState(false);
    const [editModalVisible, setEditModalVisible] =  useState(false);
    const [selectedPet, setSelectedPet] =  useState({});

    const toggleHoverState = () => {
        setIsHovered((prevState) => !prevState);
    };

    const handleClose = () => setVisible(false);
    const handleEditModalClose = () => setEditModalVisible(false);

    const confirmDelete = () => {
        Interceptor(
            {
                url: PET_URLS.deletePet(petId),
                method:"DELETE"
            }
        ).then(response => {
            console.log(response)
            refreshFunc()
            handleClose()
        })
    }


    return(
        <>
            <div onMouseEnter={toggleHoverState} onMouseLeave={toggleHoverState} className={'col-3 p-3 pet-card'}>
                <div className="card">
                    <img src={URL_REGEX.test(petImage)
                        ? petImage
                        : 'https://puppyhop.com/images/app/dog-placeholder-muted-500x500.png'}
                         className="card-img-top"
                         alt={`pet ${name}`}/>
                    <div className="card-body">
                        <p className="card-text">
                            {name}
                        </p>
                        {tags.length && <h6>Tags :</h6>}
                        <ul>
                            {
                                tags.map(({name})=>{
                                    return (
                                        <li>{name}</li>
                                    )
                                })
                            }
                        </ul>
                        {category ? <h6>Category :</h6>: null}
                        <li>{category?.name}</li>
                    </div>
                    <div
                        className={`pet-card-overlay ${
                            isHovered ? "visible" : ""
                        }`}
                    >
                        <button onClick={()=> {
                            setSelectedPet({
                                name,
                                category,
                                petImage,
                                tags,
                                petId
                            })
                            setEditModalVisible(true)
                        }} type="button" className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#editModal">Edit
                        </button>
                        <div style={{height: 10}}/>
                        <button type="button" className="btn btn-primary"  onClick={()=> setVisible(true)}>Delete
                        </button>
                    </div>
                </div>

            </div>
            <EditModal
                petObject={selectedPet}
                visible={editModalVisible}
                refreshFunc={refreshFunc}
                handleClose={handleEditModalClose}
            />
            <DeleteModal
                visible={visible}
                handleClose={handleClose}
                confirmDelete={confirmDelete}
            />
        </>


    )
}
export default PetCard
