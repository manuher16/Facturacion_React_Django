import React from 'react';
import { Card, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux';

import ModalFactura from './modalFactura'
const Totals = (props) => {
    const descuento = useSelector(state => state.client.factura.descuento)
    const subtotal = useSelector(state => state.client.factura.subtotal);
    const total = useSelector(state => state.client.factura.total)
    const factura = useSelector(state => state.client.factura)
    const pedidos = useSelector(state => state.client.pedidos)
    const calculateImpuestos = () => {
        let impuestos = 0
        pedidos.forEach(pedido => {
            impuestos += pedido.producto.impuesto.porcentaje * (pedido.producto.precio * pedido.cantidad)
        })

        return impuestos
    }

    return (
        <Card>

            <Card.Text>
                <Row>
                    <Col> Impuestos </Col>
                    <Col> +{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(
                        calculateImpuestos())}</Col>
                </Row>
                <Row>
                    <Col>Descuento {descuento.porcentaje * 100}%</Col>
                    <Col> -{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(descuento.porcentaje * subtotal)}</Col>
                </Row>
                <Row>
                    <Col>Subtotal </Col>
                    <Col>{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(subtotal)}</Col>
                </Row>
                <hr />
                <Row>
                    <Col>Total </Col>
                    <Col>{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(total)}</Col>
                </Row>
            </Card.Text>

            <Card.Footer>
                <ModalFactura factura={factura} type='factura' />

            </Card.Footer>
        </Card>
    )
}
export default Totals;