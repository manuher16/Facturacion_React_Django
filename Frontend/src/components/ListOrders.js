import React from 'react'
import { ListGroup, Table } from 'react-bootstrap'
import ItemOrder from './ItemOrder'
import { useSelector, } from 'react-redux'
const ListOrders = (props) => {

    const orders = useSelector(state => state.client.pedidos)
    let list = []
    for (let i in orders) {
        list.push(<ItemOrder key={i} item={orders[i]} index={i} />)
    }
    return (
        <div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Impuesto</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Total</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </Table>

        </div>
    )
}
export default ListOrders