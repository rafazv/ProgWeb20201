import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    email: '',
    nome: '',
    logado: false,
    tipoUsuario: 'visitante'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            return {
                id: action.payload.id,
                email: action.payload.email,
                nome: action.payload.nome,
                logado: true,
                tipoUsuario: action.payload.tipoUsuarioId === 1 ? 'empregado' : 'cliente'
            }
        },
        logout: state => initialState
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;