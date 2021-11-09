import React from 'react'
import { Table } from 'react-bootstrap'
import ItemProduct from './ItemProduct'
const ListProducts = (props) => {
    const products = props.products
    let list = []
    for (let i = 0; i < products.length; i++) {
        list.push(
            <ItemProduct
                key={i}
                product={products[i]}

            />
        )
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>

                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </Table>
    )
}
export default ListProducts