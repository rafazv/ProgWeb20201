import { useEffect, useState, useReducer, useCallback, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { comprar } from "../../redux/slicer/productSlicer";
import { Comentario } from "..";

const reducer = (state, action) => {
    switch (action) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return state.count === 0 ? { count: 0 } : { count: state.count - 1 };
        default:
            throw new Error();
    }
}


function Produto() {
    
    const dispatchCompra = useDispatch();

    const [produto, setProduto] = useState({});
    const { id } = useParams();
    const history = useHistory();
    const user = useSelector(state => state.user);
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    const [comentarios, setComentarios] = useState([]);
    const [inputComentario, setInputComentario] = useState('');

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

    const addCarrinho = () => {
        const product = { ...produto, quantidade: state.count };
        dispatchCompra(comprar(product));
        history.push('/carrinho');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setComentarios([ ...comentarios, { id: comentarios.length, texto: inputComentario, like: false} ]);
        setInputComentario('');
    }

    const setLike = useCallback((id) => {
        setComentarios(comentarios.map(c => c.id === id ? { ...c, like: !c.like } : c))
    }, [comentarios]);

    const likes = useMemo(() => {
        return comentarios.filter(c => c.like).length;
    }, [comentarios]);

    return (
        <div>
            <div className="clearfix">                
                <h3 className="float-start">{produto.nome}</h3>
                {user.tipoUsuario === 'empregado' && <div className="float-end">
                    <button className="btn btn-sm btn-primary mx-2" onClick={handleEdit}>
                        Editar
                    </button>
                    <button className="btn btn-sm btn-primary mx-2" onClick={handleDelete}>
                        Deletar
                    </button>
                </div>}
            </div>
            <p>{produto.descricao}</p>
            <div>
                {
                    produto.estoque === 0 ?
                    <p style={{color: 'red'}}>Sem estoque no momento</p> :
                    <div className="clearfix">
                        <button onClick={() => dispatch('decrement')} className="btn btn-sm btn-primary float-start">-</button>
                            <h2 className="float-start mx-2" style={{marginTop: '-2px'}}>{state.count}</h2>
                        <button disabled={state.count >= produto.estoque} onClick={() => dispatch('increment')} className="btn btn-sm btn-primary float-start">+</button>
                        <button className="btn btn-sm btn-primary mx-3" disabled={state.count === 0} onClick={addCarrinho}>Adicionar ao Carrinho</button>
                    </div>
                }
            </div>
            <div>
                <h5>Comentários <span className="badge rounded-pill bg-primary">{likes}</span></h5>
                <form onSubmit={handleSubmit} >
                    <input 
                        className="form-control"
                        value={inputComentario}
                        onChange={e => setInputComentario(e.target.value)}
                        type="text" />
                </form>
                <ul className="list-group mt-3">
                    {comentarios.map(c => <Comentario setLike={setLike} key={c.id} comentario={c}/>)}
                </ul>
            </div>
        </div>
    )
}

export default Produto