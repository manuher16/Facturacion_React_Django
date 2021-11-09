import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { showModal, showProductModal } from '../app/reducers/modalClientSlice'
const MenuOptions = () => {
    const dispatch = useDispatch()
    return (
        <ListGroup>
            <ListGroup.Item action onClick={() => dispatch(showModal())}>
                Cambiar Cliente
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => dispatch(showProductModal())}>
                Agregar Producto
            </ListGroup.Item>

        </ListGroup>
    )
}

export default MenuOptions