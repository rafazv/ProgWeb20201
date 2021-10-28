import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function Produto() {

    const [produto, setProduto] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:3020/produtos/${id}`, { credentials: 'include' })
        .then(response => response.json())
        .then(json => setProduto(json))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleEdit = () => history.push(`/produtos/${id}/edit`);
    const handleDelete = () => {
        fetch(`http://localhost:3020/produtos/${id}`, { credentials: 'include', method: 'DELETE' })
        .then(response => response.json())
        .then(json => history.push('/'))
    };

    return (
        <div>
            <div className="clearfix">
                <h3 className="float-start">{produto.nome}</h3>
                <div className="float-end">
                    <button className="btn btn-sm btn-primary mx-2" onClick={handleEdit}>
                        Editar
                    </button>
                    <button className="btn btn-sm btn-primary mx-2" onClick={handleDelete}>
                        Deletar
                    </button>
                </div>
            </div>
            <p>{produto.descricao}</p>
        </div>
    )
}

export default Produto