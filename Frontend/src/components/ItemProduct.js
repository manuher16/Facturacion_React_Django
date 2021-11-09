import axios from 'axios';
import React from 'react'
import { ListGroup, Row, Form, Button } from "react-bootstrap"
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPedidos } from '../app/reducers/ClientSlice'
import { hideProductModal } from "../app/reducers/modalClientSlice"
import { calculeteSubTotal, calculateTotal } from '../app/reducers/ClientSlice'
const CardProduct = (props) => {
    const dispatch = useDispatch()
    const factura = useSelector(state => state.client.factura)
    const cliente = useSelector(state => state.client.client)
    const [cantidad, setCantidad] = useState(1)
    let product = props.product;

    const handleBlur = (event) => {
        setCantidad(parseInt(event.target.value));
    }
    const addPedido = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/create-pedido`, {
            "id_producto": props.product.id,
            "id_cliente": cliente.id,
            "cantidad": cantidad,
            "id_factura": factura.id
        }).then(res => {
            if (res.status === 200) {
                dispatch(setPedidos(res.data.pedidos))
                dispatch(calculeteSubTotal())
                dispatch(calculateTotal())
                dispatch(hideProductModal())

            }
        })
    }
    return (

        <tr>
            <td>{product.id}</td>
            <td>{product.nombre}</td>
            <td>
                {new Intl.NumberFormat('es-HN', {
                    style: 'currency',
                    currency: 'HNL'
                }).format(product.precio)}
            </td>
            <td>  <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Control type="number" value={cantidad} placeholder="Cantidad" onChange={handleBlur.bind(this)} />

                </Form.Group>
            </Form></td>
            <td>    <Button onClick={() => addPedido()}>Agregar</Button></td>
        </tr>


    )
}
export default CardProduct