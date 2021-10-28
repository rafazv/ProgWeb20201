import { useState } from "react";
import { useHistory } from "react-router";

function AddProduto() {
    
    const [nome, setNome] = useState('');
    const [nomeError, setNomeError] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);
    const [estoque, setEstoque] = useState(10);

    const history = useHistory();
    
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        const produto = { nome, descricao, preco, estoque };
        setIsPending(true);
        
        e.preventDefault();
        fetch('http://localhost:3020/produtos', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        })
        .then(res => res.json())
        .then(json => {
            setIsPending(false);
            if (json.errors) {
                json.errors.forEach((error) => {
                    if (error.path === 'nome') setNomeError(error.message);
                });
            } else {
                history.push(`/produtos/${json.id}`);
            }
        });
    }

    return (
        <div>
            <h3>Adicionar Produtos</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    id="nome"
                    required
                    className={!nomeError ? `form-control` : `form-control is-invalid`}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <div className="invalid-feedback" style={{display: 'block'}}>
                    {nomeError}
                </div>

                <label htmlFor="descricao" className="mt-3">Descrição</label>
                <textarea
                    type="text"
                    required
                    id="descricao"
                    className="form-control mb-3"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <label htmlFor="preco">Preço</label>
                <input
                    type="number"
                    id="preco"
                    className="form-control mb-3"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)} 
                />

                <label htmlFor="estoque">Estoque</label>
                <select id="estoque" className="form-control mb-3" value={estoque} onChange={(e) => setEstoque(e.target.value)}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                </select>
                {isPending ? <button disabled type="submit" className="btn btn-primary">Enviando dados...</button> : <button type="submit" className="btn btn-primary">Cadastrar</button>}
            </form>
        </div>
    );
}

export default AddProduto;