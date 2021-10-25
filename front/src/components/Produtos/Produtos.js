import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Produtos () {
    
    const [produtos, setProdutos] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [searchResult, setSearchResult] = useState([]);

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

    return (
        <div>
            <h3>Listagem de Produtos</h3>
            <input 
                type="text"
                className="form-control mb-3" 
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
            />
            <ul className="list-group">
                {
                    searchString === '' ? produtos.map(prod => <li key={prod.id} className="list-group-item">
                        <Link to={`/produtos/${prod.id}`}>{prod.nome}</Link>
                    </li>) :
                    searchResult.map(prod => <li key={prod.id} className="list-group-item">
                        <Link to={`/produtos/${prod.id}`}>{prod.nome}</Link>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default Produtos;