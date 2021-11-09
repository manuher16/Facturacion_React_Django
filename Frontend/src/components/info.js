import React from 'react';
import { Card, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const InfoClient = (props) => {
    const client = useSelector(state => props.client ? props.client : state.client.client)
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>Nombre Completo</Col>
                    <Col>{client.nombre} {client.apellido}</Col>
                </Row>
                <Row>
                    <Col>Identidad
                    </Col>
                    <Col>{client.identidad}
                    </Col>
                </Row>
                <Row>
                    <Col>Telefono</Col>
                    <Col>
                        {client.telefono}
                    </Col>
                </Row>
                <Row>
                    <Col>Email</Col>
                    <Col>
                        {client.email}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default InfoClient;
