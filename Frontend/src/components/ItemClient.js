import React, { useState } from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { hideModal } from '../app/reducers/modalClientSlice'
import { setClient, setPedidos, setFactura, calculeteSubTotal, calculateTotal } from '../app/reducers/ClientSlice'
import axios from "axios"
const ItemClient = (props) => {
    const dispatch = useDispatch()
    const [client] = useState(props.client)
    const selecetedClient = async (item) => {
        dispatch(setClient(item))
        dispatch(hideModal())
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/create-factura`, {
            "id_cliente": item.id,
        })
        dispatch(setPedidos(data.pedidos))
        dispatch(setFactura(data.factura))
        dispatch(calculeteSubTotal())
        dispatch(calculateTotal())
    }
    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{client.nombre} {client.apellido}(#{client.id})</div>
                {client.telefono} {client.email}
            </div>

            <Button variant="success" onClick={() => selecetedClient(client)}>Elegir</Button>

        </ListGroup.Item>
    )
}
export default ItemClient