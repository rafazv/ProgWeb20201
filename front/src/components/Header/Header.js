/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Header = () => {

    const user = useSelector(state => state.user);

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
                            {!user.logado && <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>}
                            {user.logado && <li className="nav-item">
                                <a className="nav-link" href="#">Logout, {user.nome}</a>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;