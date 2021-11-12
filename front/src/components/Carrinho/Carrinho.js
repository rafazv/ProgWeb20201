import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function Carrinho(props) {

    const user = useSelector(state => state.user);
    const product = useSelector(state => state.product);

    const history = useHistory();

    const usuarioId = "3";
    const produtoId = ["1"];
    const quantidade = ["2"];

    const handleClick = (e) => {
        const compra = { usuarioId, produtoId, quantidade };
        
        e.preventDefault();
        fetch(`http://localhost:3020/compras`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(compra)
        })
        .then(res => res.json())
        .then(() => history.push(`/`));
    }

    return (
        <div>
            {console.log(product)}
            {/* condição aqui */}
            <h3>Você não possui nada no seu carrinho</h3>

            {/* condição aqui */}
            {/* for */}
            <div className="card mb-3" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Nome do produto - qte</h5>
                    <p className="card-text">Preço</p>
                </div>
            </div>

            {/* condição se possui produtos */}
            <button className="btn btn-sm btn-primary" disabled={!(user.logado)} onClick={handleClick}>Finalizar Compra</button>
            {user.logado ? '' : <p>Você precisa logar primeiro antes de finalizar a compra</p>}
        </div>
    );
}

export default Carrinho;