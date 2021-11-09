import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    client: {
        "id": 1,
        "nombres": "",
        "apellidos": "",
        "identidad": "",
        "direccion": "",
        "telefono": "",
        "email": "test2@gmail.com"
    },
    pedidos: [],
    impuestos: [],
    descuentos: [],
    factura: {
        impuesto: {
            id: 2,
            porcentaje: 0.15
        },
        descuento: {
            id: 1,
            porcentaje: 0

        }
    },
    subtotal: 0,
    total: 0,

};

export const ClientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        setClient: (state, action) => {
            state.client = action.payload;
        },
        clearClient: (state) => {
            state.client = null;
        },
        setPedidos: (state, action) => {
            state.pedidos = action.payload;
        },
        deletePedido: (state, action) => {
            console.log(action.payload);
            state.pedidos.slice(action.payload, 1);
        },
        addPedido: (state, action) => {
            state.pedidos.push(action.payload);
        },
        updatePedido: (state, action) => {
            state.pedidos[action.payload.index] = action.payload.pedido;
        },
        setFactura: (state, action) => {
            state.factura = action.payload;
        },
        clearFactura: (state) => {
            state.factura = null;
        },
        changeImpuesto: (state, action) => {
            state.factura.impuesto = action.payload;
        },
        changeDescuento: (state, action) => {
            state.factura.descuento = action.payload;
        },
        calculateSubTotal: (state) => {
            let total = 0;
            state.pedidos.forEach(pedido => {
                total += pedido.total;
            });
            state.factura.subtotal = total;
        },
        setDescuentos: (state, action) => {
            state.descuentos = action.payload;
        },
        setImpuestos: (state, action) => {
            state.impuestos = action.payload;
        },
        calculeteSubTotal: (state) => {
            let total = 0;
            state.pedidos.forEach(pedido => {
                total += pedido.total;
            });
            state.factura.subtotal = total;
        },
        calculateTotal: (state) => {
            let total = 0;
            let impuesto = 0;
            state.pedidos.forEach(pedido => {
                total += pedido.total;
                impuesto += pedido.producto.impuesto.porcentaje * (pedido.producto.precio * pedido.cantidad);
            });
            let descuento = (state.factura.descuento.porcentaje * total);
            total += impuesto;
            total -= descuento;

            state.factura.total = total;
        },
        incrementPedido: (state, action) => {

            state.pedidos.forEach(pedido => {
                if (pedido.id === action.payload.id) {
                    pedido.cantidad++;
                    pedido.total += action.payload.producto.precio;
                }
            });

        },
        decrementPedido: (state, action) => {

            state.pedidos.forEach(pedido => {
                if (pedido.cantidad > 1 && pedido.id === action.payload.id) {
                    pedido.cantidad--;
                    pedido.total -= action.payload.producto.precio;
                }

            });
        }
    },
});
export const { decrementPedido, incrementPedido, setDescuentos, calculateTotal, calculeteSubTotal, setImpuestos, setClient, clearClient, setPedidos, deletePedido, addPedido, updatePedido, setFactura, clearFactura, changeImpuesto, changeDescuento, calculateSubTotal } = ClientSlice.actions;
export default ClientSlice.reducer;