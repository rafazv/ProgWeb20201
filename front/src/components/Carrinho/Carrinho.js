import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Carrinho(props) {

    const user = useSelector(state => state.user);
    const product = useSelector(state => state.product);

    const history = useHistory();

    const usuarioId = user.id.toString;
    let produtoId = [];
    let quantidade = [];

    const handleClick = (e) => {
        product.carrinho.forEach(p => {
            produtoId.push(p.id.toString());
            quantidade.push(p.quantidade.toString());
        });

        const compra = { usuarioId, produtoId, quantidade };
        
        e.preventDefault();
        fetch(`http://localhost:3020/compras`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(compra)
        })
        .then(res => {
            if (res.status === 401) {
                console.log('Necessário logar!');
                history.push('/login');
            }
            else {
                console.log('Compra efetuada com sucesso!');
                history.push('/');
            }
        });
    }

    return (
        <div>
            {
                product.carrinho.length ?
                <div>
                    <ul className="list-group">
                        {
                            product.carrinho.map(prod => {
                                return (
                                    <li key={prod.id} className="list-group-item mb-3">
                                        <Link to={`/produtos/${prod.id}`}>
                                            <h5 className="card-title">{prod.nome} - {prod.quantidade} unidade(s)</h5>
                                        </Link>
                                        <p className="card-text">R$ {prod.preco}</p>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <button className="btn btn-sm btn-primary" disabled={!(user.logado)} onClick={handleClick}>Finalizar Compra</button>
                    {user.logado ? '' : <p>Você precisa logar primeiro antes de finalizar a compra</p>}
                </div>
                :
                <h3>Você não possui nada no seu carrinho</h3>
            }            
        </div>
    );
}

export default Carrinho;