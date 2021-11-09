import React from 'react';
import { useState, useEffect } from 'react'
import { Card, Row, Col, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { setFactura, calculateTotal, calculeteSubTotal } from '../app/reducers/ClientSlice';
import axios from 'axios'

const Checkout = () => {
    const subtotal = useSelector(state => state.client.factura.subtotal)
    const total = useSelector(state => state.client.factura.total)
    const [listImpuesto, setListImpuesto] = useState([])
    const [listDescuentos, setListDescuentos] = useState([])
    const factura = useSelector(state => state.client.factura)


    const dispatch = useDispatch()
    const conoleOption = (event) => {
        console.log(event.target)
    }
    const fetchImpuesto = async (event) => {
        console.log(event.target)
        const idImpuesto = parseInt(event.target.value)
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/factura/${factura.id}/impuesto`, {
            "id_impuesto": idImpuesto,
        })
        dispatch(setFactura(data.factura))
        dispatch(calculeteSubTotal())
        dispatch(calculateTotal())
    }
    const fetchDescuento = async (event) => {
        console.log(event.target.value)
        const idDescuento = parseInt(event.target.value)
        const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/factura/${factura.id}/descuento`, {
            "id_descuento": idDescuento,
        })
        dispatch(setFactura(data.factura))
        dispatch(calculeteSubTotal())
        dispatch(calculateTotal())
    }
    useEffect(() => {
        const fetchImpuesto = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/impuestos`)
            let tempListImpuesto = []

            for (let i = 0; i < data.Impuestos.length; i++) {
                tempListImpuesto.push(<option value={data.Impuestos[i].id}>{data.Impuestos[i].nombre} {data.Impuestos[i].porcentaje * 100}%</option>)
            }
            setListImpuesto(tempListImpuesto)
        }
        const fetchDescuentos = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/descuentos`)
            let list = []
            for (let i = 0; i < data.Descuentos.length; i++) {
                list.push(<option value={data.Descuentos[i].id}>{data.Descuentos[i].nombre} {data.Descuentos[i].porcentaje * 100}%</option>)
            }
            setListDescuentos(list)

        }
        fetchDescuentos()
        fetchImpuesto()
    }, [])
    return (
        <Card>
            <Card.Body>

                <Card.Text>
                    <Row>
                        <Col md="4">

                            Descuento
                        </Col>
                        <Col>
                            <Form.Select onChange={fetchDescuento.bind(this)}>
                                {listDescuentos}
                            </Form.Select>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Checkout;