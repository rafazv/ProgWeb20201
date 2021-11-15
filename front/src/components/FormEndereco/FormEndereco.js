import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function FormEndereco() {
    
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState(0);
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [cep, setCep] = useState('');

    const user = useSelector(state => state.user);
    const usuarioId = user.id.toString;

    const history = useHistory();
    
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        const endereco = { usuarioId, logradouro, numero, bairro, cidade, uf, cep };
        setIsPending(true);
        
        e.preventDefault();
        fetch('http://localhost:3020/enderecos', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(endereco)
        })
        .then(res => res.json())
        .then(() => {
            setIsPending(false);
            history.push('/enderecos');
        });
    }

    return (
        <div>
            <h3>Adicionar Endereço</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Logradouro</label>
                <input
                    type="text"
                    id="nome"
                    required
                    className="form-control mb-3"
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                />

                <label htmlFor="numero">Número</label>
                <input
                    type="number"
                    required
                    id="numero"
                    className="form-control mb-3"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)} 
                />

                <label htmlFor="bairro">Bairro</label>
                <input
                    type="text"
                    id="bairro"
                    required
                    className="form-control mb-3"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                />

                <label htmlFor="cidade">Cidade</label>
                <input
                    type="text"
                    id="cidade"
                    required
                    className="form-control mb-3"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />

                <label htmlFor="uf">Estado</label>
                <input
                    type="text"
                    id="uf"
                    required
                    className="form-control mb-3"
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                />
                
                <label htmlFor="cep">CEP</label>
                <input
                    type="text"
                    id="cep"
                    required
                    className="form-control mb-3"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                />

                {isPending ? <button disabled type="submit" className="btn btn-primary">Enviando dados...</button> : <button type="submit" disabled={!(user.logado)} className="btn btn-primary">Cadastrar</button>}
            </form>
        </div>
    );
}

export default FormEndereco;