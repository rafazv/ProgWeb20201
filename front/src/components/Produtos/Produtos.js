import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Produtos () {
    
    const [produtos, setProdutos] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResult, setSearchResult] = useState([]);
    const history = useHistory();
    const user = useSelector(state => state.user);

    useEffect(() => {
        fetch('http://localhost:3020/produtos', { credentials: 'include' })
        .then(response => response.json())
        .then(json => setProdutos(json))
        .catch(e => console.log(e))
    }, []);

    useEffect(() => {
        setSearchResult(produtos.filter(prod => prod.nome.toLowerCase().includes(searchString.toLowerCase())))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);

    const handleClick = () => {
        history.push('/produtos/add');
    }

    const todosPerPage = 10;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = produtos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((prod, index) => {
        return (
            <li key={prod.id} className="list-group-item">
                <Link to={`/produtos/${prod.id}`}>{prod.nome}</Link>
            </li>
        );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(produtos.length / todosPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li
            key={number}
            id={number}
            onClick={(e) => setCurrentPage(Number(e.target.id))}
            style={{marginRight: '20px', color: 'blue', userSelect: 'none', cursor: 'pointer'}}
          >
            {number}
          </li>
        );
    });

    return (
        <div>
            <div className="clearfix">
                <h3 className="float-start">Listagem de Produtos</h3>
                {user.tipoUsuario === 'empregado' && <div className="float-end">
                    <button 
                        className="btn btn-primary btn-sm"
                        onClick={handleClick}
                    >+</button>
                </div>}
            </div>
            <input 
                type="text"
                className="form-control mb-3" 
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
            />
            <ul className="list-group">
                {
                    searchString === '' ? <div>{renderTodos}</div> :
                    searchResult.map(prod => <li key={prod.id} className="list-group-item">
                        <Link to={`/produtos/${prod.id}`}>{prod.nome}</Link>
                    </li>)
                }
            </ul>
            <ul style={{listStyle: 'none', display: 'flex', marginTop: '20px'}}>
                <p style={{marginRight: '20px'}}>Página(s):</p>
                {renderPageNumbers}
            </ul>
        </div>
    )
}

export default Produtos;