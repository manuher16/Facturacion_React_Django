import React from 'react'
import { Button, Card, Row, Col } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { incrementPedido, decrementPedido, setPedidos, calculateTotal, calculeteSubTotal, deletePedido } from '../app/reducers/ClientSlice'
const CardProduct = (props) => {
    let item = props.item;
    let index = props.index
    const dispatch = useDispatch()
    const increment = async () => {
        await axios.patch(`${process.env.REACT_APP_API_URL}/pedido/${item.id}/cantidad`, {
            cantidad: item.cantidad + 1
        })

        dispatch(incrementPedido(item))
        dispatch(calculeteSubTotal())
        dispatch(calculateTotal())

    }
    const decrement = async () => {
        if (item.cantidad > 1) {

            await axios.patch(`${process.env.REACT_APP_API_URL}/pedido/${item.id}/cantidad`, {
                cantidad: item.cantidad - 1
            })
        }
        dispatch(decrementPedido(item))
        dispatch(calculeteSubTotal())
        dispatch(calculateTotal())
    }
    const fetchdeletePedido = async (index) => {

        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/pedido/${item.id}`)
        if (data.pedidos) {

            dispatch(setPedidos(data.pedidos))
            dispatch(calculateTotal())
            dispatch(calculeteSubTotal())
        }

    }
    return (

        <tr>
            <td>{parseInt(index) + 1}</td>
            <td>{item.producto.nombre}</td>
            <td>{new Intl.NumberFormat('es-HN', {
                style: 'currency',
                currency: 'HNL'
            }).format(item.producto.precio)}</td>
            <td>{item.producto.impuesto.porcentaje * 100}%</td>


            <td>

                <Card bg="ligth">


                    <Row>
                        <Col>
                            <Button onClick={() => decrement()}>
                                <i class="bi bi-dash-circle"></i>
                            </Button>
                        </Col>
                        <Col>
                            <h3>  {item.cantidad}</h3>
                        </Col>
                        <Col>
                            <Button onClick={() => increment()}>
                                < i class="bi bi-plus-circle"></i>
                            </Button>
                        </Col>
                    </Row>


                </Card>
            </td>
            <td>{new Intl.NumberFormat('es-HN', {
                style: 'currency',
                currency: 'HNL'
            }).format(item.cantidad * item.producto.precio)}
            </td>
            <td>{new Intl.NumberFormat('es-HN', {
                style: 'currency',
                currency: 'HNL'
            }).format((item.cantidad * item.producto.precio) + (item.producto.impuesto.porcentaje * (item.producto.precio * item.cantidad)))}
            </td>


            <td>
                <Button variant="danger" onClick={() => fetchdeletePedido(index)}>Eliminar</Button>
            </td>
        </tr>


    )
}
export default CardProduct