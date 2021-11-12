import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    produtoId: '',
    nome: '',
    quantidade: 0,
    preco: 0
};

let produtos = [];

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        comprar: (state, action) => {
            return produtos.push({
                productId: action.payload.id,
                nome: action.payload.nome,
                quantidade: action.payload.quantidade,
                preco: action.payload.preco
            })
            // return {
            //     produtoId: action.payload.id,
            //     nome: action.payload.nome,
            //     quantidade: action.payload.quantidade,
            //     preco: action.payload.preco
            // }
        },
        comprado: (state) => {
            return {
                initialState,
                produtos: []
            }
        }
    }
});

export const { comprar, comprado } = productSlice.actions;
export default productSlice.reducer;