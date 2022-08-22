import '../../components/segmented/segmented-styles.scss'
import './list-pets-style.scss'

import PetCard from "../../components/cards/pet-card";
import React, {useEffect, useState} from "react";
import Interceptor from "../../config/interceptor";
import {PET_URLS} from "../../config/api-constants";
import {SegmentedComponent} from "../../components/segmented/segmented-component";
import {AddModal} from "../../components/modals/add-modal";
import {useDispatch} from "react-redux";
import {endLoader, startLoader} from "../../redux/actions/loader";


export const ListPets = () => {
    const [pets, setPets] = useState([])
    const [activeTab, setActiveTab] = useState('available')
    const [addModalVisible, setAddModalVisible] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(startLoader())
        Interceptor({url: PET_URLS.getPetsByStatus(activeTab)})
            .then(response => {
                dispatch(endLoader())
                setPets(response.data)
            })
    }, [activeTab])

    const handleItemPress = (tab) => {
        setActiveTab(tab)
    }

    const handleAddModalClose = () => {
        setAddModalVisible(false)
        dispatch(startLoader())
        Interceptor({url: PET_URLS.getPetsByStatus(activeTab)})
            .then(response => {
                setPets(response.data)
                dispatch(endLoader())
            })
    }


    return <>
        <h1>ListPets</h1>
        <SegmentedComponent activeTab={activeTab} onItemPress={handleItemPress}/>
        <div className="container px-3">
            <div className="row gx-5">
            {pets.map((pet, index) => {
                return(
                    <PetCard
                        key={'pet'+ index}
                        name={pet?.name}
                        petImage={pet?.photoUrls?.[0]}
                        tags={pet?.tags}
                        category={pet?.category}
                        petId={pet?.id}
                        refreshFunc={()=> {
                            Interceptor({url: PET_URLS.getPetsByStatus(activeTab)})
                                .then(response => {
                                    setPets(response.data)
                                })
                        }}
                    />
                )
            })}
            </div>
        </div>
        <div onClick={()=> setAddModalVisible(true)} className={'fab'} data-bs-toggle="modal" data-bs-target="#modalAdd">
            +
        </div>
        <AddModal visible={addModalVisible} handleClose={handleAddModalClose}/>
    </>
}
