/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { comprado } from "../../redux/slicer/productSlicer";

function FormEndereco() {

    const [enderecos, setEnderecos] = useState([]);
    const [compraEfetuada, setCompraEfetuada] = useState(false);

    const user = useSelector(state => state.user);
    const id = Number(user.id);

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        if (user.logado) {
            fetch(`http://localhost:3020/enderecos/usuario/${id}`, { credentials: 'include' })
            .then(response => response.json())
            .then(json => setEnderecos(json))
            .catch(e => console.log(e))
        }
    }, []);

    const selectEndereco = () => {
        setCompraEfetuada(true);
        dispatch(comprado());
        setTimeout(() => history.push('/'), 2500);
    }

    return (
        <div>
            {
                user.logado ? 
                <div>
                    {
                        enderecos.length ?
                        <div>
                            <ul className="list-group">
                                {
                                    enderecos.map(e => {
                                        return (
                                            <div>
                                                <li key={`logradouro_${e.id}`} className="list-group-item mb-3">
                                                    <h5 className="card-title">Logradouro</h5>
                                                    <p className="card-text">{e.logradouro}</p>
                                                </li>

                                                <li key={`numero_${e.id}`} className="list-group-item mb-3">
                                                    <h5 className="card-title">Número</h5>
                                                    <p className="card-text">{e.numero}</p>
                                                </li>

                                                <li key={`bairro_${e.id}`} className="list-group-item mb-3">
                                                    <h5 className="card-title">Bairro</h5>
                                                    <p className="card-text">{e.bairro}</p>
                                                </li>

                                                <li key={`cidade_${e.id}`} className="list-group-item mb-3">
                                                    <h5 className="card-title">Cidade</h5>
                                                    <p className="card-text">{e.cidade}</p>
                                                </li>

                                                <li key={`estado_${e.id}`} className="list-group-item mb-3">
                                                    <h5 className="card-title">Estado</h5>
                                                    <p className="card-text">{e.uf}</p>
                                                </li>

                                                <li key={`cep_${e.id}`} className="list-group-item mb-3">
                                                    <h5 className="card-title">CEP</h5>
                                                    <p className="card-text">{e.cep}</p>
                                                </li>
                                                <button className="btn btn-sm btn-primary" disabled={compraEfetuada} onClick={selectEndereco}>Selecionar esse endereço</button>
                                            </div>
                                        );
                                    })
                                }
                            </ul>
                            {
                                compraEfetuada ?
                                <h3 className="mt-3">Compra efetuada!</h3> : <div></div>
                            }
                        </div>
                        :
                        <div>
                            <h3>Você não possui endereços cadastrados</h3>
                            <button className="btn btn-sm btn-primary mt-3" onClick={() => history.push('/endereco')}>Cadastrar endereço</button>
                        </div>
                    }
                </div> :
                <p>Você precisa logar primeiro antes de efetuar uma compra!</p>
            }
        </div>
    );
}

export default FormEndereco;