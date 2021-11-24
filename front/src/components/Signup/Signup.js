import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

function Signup(props) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorSenhaConfirmacao, setErrorSenhaConfirmacao] = useState(false);
    const [errorSenhaTamanho, setErrorSenhaTamanho] = useState(false);
    const history = useHistory();

    const user = useSelector(state => state.user);

    const handleClick = (e) => {
        e.preventDefault();

        if (senha.length < 6 || senhaConfirmacao.length < 6) {
            setErrorSenhaTamanho(true);
        } else if (senha.length >= 6 && senhaConfirmacao.length >= 6) {
            setErrorSenhaTamanho(false);
        }
        
        if (senha !== senhaConfirmacao) {
            setErrorSenhaConfirmacao(true);
        } else {
            setErrorSenhaConfirmacao(false);
        }
        
        if (senha.length >= 6 && senhaConfirmacao.length >= 6 && senha === senhaConfirmacao){
            let tipoUsuarioId;
    
            if (user.logado && user.tipoUsuario === 'empregado') {
                tipoUsuarioId = 1;
            } else {
                tipoUsuarioId = 2;
            }
            
            const usuario = { nome, email, senha, tipoUsuarioId };
    
            fetch(`${process.env.REACT_APP_API}/signup`, {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario)
            })
            .then(res => {
                if (res.status === 400) {
                    setErrorEmail(true);
                }
                else {
                    setErrorEmail(false);
                    if (!user.logado) history.push('/login');
                    else history.push('/');
                }
            });
        }

    }

    return (
        <div className="container-fluid">
            <h3>Cadastre-se</h3>
            <form>
                <label htmlFor="nome">Nome</label>
                <input autoFocus required type="text" id="nome" className="form-control mb-3" value={nome} maxLength="100" onChange={(e) => setNome(e.target.value)}></input>

                <label htmlFor="email">Email</label>
                <input type="email" required id="email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)}></input>

                { errorEmail ?
                    <div className="invalid-feedback mb-2" style={{display: 'block'}}>
                        Email já cadastrado
                    </div> : <div></div>
                }

                <label htmlFor="senha">Senha</label>
                <input type="password" required minLength="6" id="senha" className="form-control mb-3" value={senha} onChange={(e) => setSenha(e.target.value)}></input>

                <label htmlFor="senha-confirm">Confirme sua senha</label>
                <input type="password" required minLength="6" id="senha-confirm" className="form-control" value={senhaConfirmacao} onChange={(e) => setSenhaConfirmacao(e.target.value)}></input>

                { errorSenhaConfirmacao ?
                    <div className="invalid-feedback mt-2" style={{display: 'block'}}>
                        Senhas não são iguais
                    </div> : <div></div>
                }

                { errorSenhaTamanho ?
                    <div className="invalid-feedback mt-2" style={{display: 'block'}}>
                        A senha deve ter mais de 6 caracteres
                    </div> : <div></div>
                }

                <button className="btn btn-primary mt-3" disabled={!nome || !email || !senha || !senhaConfirmacao || senha.length < 6 || senhaConfirmacao.length < 6 || senha !== senhaConfirmacao} onClick={handleClick}>Cadastrar</button>
            </form>
        </div>
    );
}

export default Signup;