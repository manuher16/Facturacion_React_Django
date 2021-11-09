import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import ListFacturas from "../components/listFacturas"
import axios from "axios"
const Historial = () => {
    const [facturas, setFacturas] = useState([]);
    const [datos, setDatos] = useState({
        "TotalIngreso": 0,
        "TotalProductosVendidos": {
            "cantidad__sum": 0
        },
        "productoMasVendido": {
            "producto": {
                "id": 3,
                "nombre": "Producto 1",
                "precio": 1000.0,
                "cantidad": 50,
                "impuesto": {
                    "id": 2,
                    "nombre": "ISV",
                    "porcentaje": 0.15,
                    "createdAt": "2021-11-05T16:27:41.122Z"
                },
                "createdAt": "2021-11-08T18:26:54.698Z"
            },
            "cantidadPedidos": 0,
            "totalVendido": 0
        }
    })
    const getData = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/facturas`)
        setFacturas(data.Facturas)
    }
    useEffect(() => {
        const fetchFacturas = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/facturas`)
            setFacturas(data.Facturas)
        }
        const fetchDatos = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/totales`)
            setDatos(data)
        }
        fetchFacturas()
        fetchDatos()
    }, [])
    return (
        <Container fluid>
            <Card>
                <Card.Header>
                    <Card.Title>Ingresos</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Ingreso Total: <strong>{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(datos.TotalIngreso)}</strong>
                    </Card.Text>
                    <Card.Text>
                        Productos Vendidos: <strong>{datos.TotalProductosVendidos.cantidad__sum}</strong>
                    </Card.Text>
                    <Card.Text>
                        Mas Ventas: <strong>{datos.productoMasVendido.producto.nombre} ({datos.productoMasVendido.totalVendido})</strong>
                    </Card.Text>
                </Card.Body>
            </Card>
            <h2>Historial</h2>
            <Row>
                <Col md={10}>

                </Col>
                <Col>
                    <Button onClick={() => getData()}>Actualizar Tabla</Button>
                </Col>
            </Row>
            <ListFacturas facturas={facturas} />
        </Container >
    );
};
export default Historial;