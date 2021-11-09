
import React, { useState, useEffect } from "react"
import axios from 'axios'
import { Row, Col, Card, Container } from 'react-bootstrap'
import ListOrders from "../components/ListOrders"
import MenuOptions from "../components/MenuOptions"
import ModalClients from "../components/modalClients"
import Checkout from "../components/checkout"
import ModalProducts from '../components/modalProducts'
import Totals from "../components/totals"
import InfoClient from "../components/info"
const Facturacion = (props) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/productos`);
            const { Productos } = await result.data;

            setProducts(Productos);
        };
        fetchData();
    }, []);

    return (
        <Container fluid>
            <ModalClients />
            <ModalProducts />
            <hr />
            <Row>
                <Col md="3">
                    <Card>
                        <Card.Header>Menu Opciones</Card.Header>
                        <MenuOptions />
                    </Card>
                    <Card>
                        <Card.Body></Card.Body>
                    </Card>
                    <Card class="mt-3">
                        <Card.Header>Impuesto y Desceunto</Card.Header>
                        <Checkout />
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <Card.Header>Cliente</Card.Header>
                        <InfoClient />
                    </Card>

                    <Card>
                        <Card.Header>Productos</Card.Header>
                        <Card.Body>
                            <ListOrders />
                        </Card.Body>

                    </Card>

                </Col>
                <Col md="3">

                    <Card>
                        <Card.Header>Total a pagar</Card.Header>
                        <Totals />
                    </Card>

                </Col>
            </Row>
        </Container>
    );

}
export default Facturacion;