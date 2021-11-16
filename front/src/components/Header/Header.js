/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slicer/userSlicer";

const Header = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
        history.push('/');
    }

    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="float-start">
                    <Link className="navbar-brand" to="/">Minha Loja</Link>
                </div>
                <div className="float-end">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/sobre">Sobre</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/carrinho">Carrinho</Link>
                            </li>
                            {((user.logado && user.tipoUsuario === 'empregado') || !user.logado) && <li className="nav-item">
                                <Link className="nav-link" to="/signup">Sign up</Link>
                            </li>}
                            {!user.logado && <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>}
                            {user.logado && <li className="nav-item">
                                <a onClick={handleLogout} className="nav-link" href="#">Logout</a>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;