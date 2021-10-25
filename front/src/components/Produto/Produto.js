import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

function Produto() {

    const [produto, setProduto] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:3020/produtos/${id}`, { credentials: 'include' })
        .then(response => response.json())
        .then(json => setProduto(json))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = () => history.goBack(-1);

    return (
        <div>
            <h3>{produto.nome} 
                <button className="btn bnt-small btn-primary mx-2" onClick={handleClick}>
                    Voltar
                </button>
            </h3>
            <p>{produto.descricao}</p>
        </div>
    )
}

export default Produto