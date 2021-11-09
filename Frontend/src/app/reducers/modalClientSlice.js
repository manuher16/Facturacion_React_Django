import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: true,
    client: null,
    showProducts: false,
    showPedidos: false,
};

export const modalClientSlice = createSlice({
    name: "modalClient",
    initialState,
    reducers: {
        showModal: (state, action) => {
            state.show = true;
            state.client = action.payload;
        },
        hideModal: (state) => {
            state.show = false;
        },
        setClient: (state, action) => {
            state.client = action.payload;
        },
        showProductModal: (state) => {
            state.showProducts = true;
        },
        hideProductModal: (state) => {
            state.showProducts = false;
        },
        showPedidosModal: (state) => {
            state.showPedidos = true;
        },
        hidePedidosModal: (state) => {
            state.showPedidos = false;
        },
    },
});
export const { hidePedidosModal, showPedidosModal, hideProductModal, showProductModal, showModal, hideModal } = modalClientSlice.actions;
export default modalClientSlice.reducer;