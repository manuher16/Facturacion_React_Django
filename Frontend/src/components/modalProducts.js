import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { hideProductModal } from "../app/reducers/modalClientSlice"
import { useState, useEffect } from 'react'
import axios from 'axios'
import ListProducts from './ListProducts'
const ModalProducts = (props) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/productos`).then(res => {
            setProducts(res.data.Productos)
        })

    }, [])
    const dispatch = useDispatch()
    const show = useSelector(state => state.modalClient.showProducts)

    return (
        <Modal show={show} dialogClassName="modal-90w" size="lg">
            <Modal.Header>Productos de la tienda</Modal.Header>
            <Modal.Body>
                <ListProducts products={products} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => dispatch(hideProductModal())}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalProducts