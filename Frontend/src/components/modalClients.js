import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Modal, } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ListClients from './ListClients'

const ModalClients = (props) => {

    const show = useSelector(state => state.modalClient.show)

    const [list, setList] = useState(null)

    useEffect(() => {
        const getClients = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients`)
            const { Clientes } = res.data
            setList(<ListClients clients={Clientes} />)
        }
        getClients()
    }, [])


    return (
        <Modal show={show}>
            <Modal.Header>
                <h4>Elija un Cliente</h4>
            </Modal.Header>
            <Modal.Body>
                {list}
            </Modal.Body>

        </Modal>
    )
}
export default ModalClients