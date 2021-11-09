import react from 'react';
import { Table } from "react-bootstrap"
import ModalPedidos from './modalPedidos'
import { useState } from 'react'
import { showPedidosModal } from '../app/reducers/modalClientSlice';
import { useDispatch } from 'react-redux';
const ListFacturas = (props) => {

    const dispatch = useDispatch()

    return (
        <Table>

            <thead>
                <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Impuesto</th>
                    <th>Descuento</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {props.facturas.map((factura, index) => {
                    const date = new Date(factura.createdAt)
                    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    console.log(date.toLocaleDateString())
                    return (

                        <tr key={index}>
                            <td>{factura.id}</td>
                            <td>{factura.cliente.nombre} {factura.cliente.apellido}</td>
                            <td>{date.toLocaleDateString()}-{date.toLocaleTimeString()}</td>
                            <td>{factura.estado}</td>
                            <td>{new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(factura.impuestos)}</td>
                            <td>{factura.descuento.porcentaje * 100}%</td>

                            <td>{new Intl.NumberFormat("es-HN", {
                                style: 'currency',
                                currency: 'HNL'
                            }).format(factura.total)}</td>
                            <td>
                                <ModalPedidos factura={factura} type="details" />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
export default ListFacturas;