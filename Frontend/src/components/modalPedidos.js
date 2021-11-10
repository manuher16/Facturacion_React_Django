import React from 'react';
import { Modal, Button, Table, Card } from 'react-bootstrap'
import Info from './info'
import { useState } from 'react';
import axios from 'axios'
const ModalPedidos = (props) => {

    const [show, setShow] = useState(false)
    const [factura] = useState(props.factura)
    const [pedidos, setPedidos] = useState([])

    const calculetaSubTotal = () => {
        let subTotal = 0
        pedidos.map(pedido => {
            subTotal += pedido.cantidad * pedido.producto.precio
        })
        return subTotal
    }
    const calculetaTotal = () => {
        let total = 0
        let totalImpuesto = 0
        pedidos.map(pedido => {
            total += pedido.cantidad * pedido.producto.precio
            totalImpuesto += pedido.cantidad * pedido.producto.precio * pedido.producto.impuesto.porcentaje
        })
        let descuento = total * factura.descuento.porcentaje
        return total + totalImpuesto - descuento
    }
    const calculateTotalImpuesto = () => {
        let totalImpuesto = 0
        pedidos.map(pedido => {
            totalImpuesto += pedido.cantidad * pedido.producto.precio * pedido.producto.impuesto.porcentaje
        })

        return totalImpuesto
    }
    useState(() => {
        const fetchPedidos = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/pedido/factura/${factura.id}`)
            setPedidos(data.Pedidos)
        }
        fetchPedidos()
    }, [])
    return (
        <div>
            <button className="btn btn-success " variant="success" onClick={() => setShow(true)}>{props.type == "details" ? "Detalles" : (props.type == "factura" ? "Pagar" : '')}</button>

            <Modal show={show} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Informacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Info client={factura.cliente} />
                </Modal.Body>
                <Modal.Header>
                    <Modal.Title>Pedidos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Impuesto 15%</th>
                                <th>Impuesto 18%</th>
                                <th>SubTotal </th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((pedido, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{pedido.producto.nombre}</td>
                                        <td>{pedido.cantidad}</td>
                                        <td>{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(pedido.producto.precio)}</td>
                                        <td>{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(pedido.producto.impuesto.id == 2 ? pedido.producto.impuesto.porcentaje * (pedido.producto.precio * pedido.cantidad) : 0)}</td>
                                        <td>{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(pedido.producto.impuesto.id == 3 ? pedido.producto.impuesto.porcentaje * (pedido.producto.precio * pedido.cantidad) : 0)}</td>
                                        <td>{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(pedido.producto.precio * pedido.cantidad)}</td>
                                        <td>{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(pedido.total + pedido.producto.impuesto.porcentaje * (pedido.producto.precio * pedido.cantidad))}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card>
                        <Card.Header>
                            <Card.Title>Total</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Subtotal:  {new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(calculetaSubTotal())}
                            </Card.Text>
                            <Card.Text>
                                Impuestos +{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(calculateTotalImpuesto())}
                            </Card.Text>
                            <Card.Text>
                                Descuento  -{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(factura.descuento.porcentaje * calculetaSubTotal())}
                            </Card.Text>

                            <hr />
                            <Card.Text>
                                <h4>Total {new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(calculetaTotal())}</h4>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShow(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ModalPedidos;