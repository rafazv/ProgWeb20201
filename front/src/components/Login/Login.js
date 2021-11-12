import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from "../../redux/slicer/userSlicer";
import { useHistory } from "react-router-dom";

function Login(props) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(false);
    const history = useHistory();

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();

        const credenciais = { email, senha };

        fetch(`${process.env.REACT_APP_API}/login`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credenciais)
        })
        .then(res => {
            if (res.status === 401) setError(true);
            else setError(false);
            return res.json();
        })
        .then(json => {
            dispatch(login(json));
            history.push('/');
        })
    }

    return (
        <div className="container-fluid">
            <h3>Login</h3>
            <form>
                <label htmlFor="email">Email</label>
                <input autoFocus type="text" id="email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)}></input>

                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)}></input>

                { error ?
                    <div className="invalid-feedback mt-2" style={{display: 'block'}}>
                        Email e/ou senha inválidos
                    </div> : <div></div>
                }

                <button className="btn btn-primary mt-3" onClick={handleClick}>Entrar</button>
            </form>
        </div>
    );
}

export default Login;