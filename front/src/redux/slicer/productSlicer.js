import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carrinho: []
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        comprar: (state, action) => {
            const { payload } = action;

            state.carrinho = [
                ...state.carrinho,
                payload
            ];
        },
        comprado: (state) => initialState,
    }
});

export const { comprar, comprado } = productSlice.actions;
export default productSlice.reducer;