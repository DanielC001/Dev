import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
const Header = () => {
    const {loginWithRedirect} = useAuth0();
    const {logout} = useAuth0();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">CarApp</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-success me-2"  type="button" onClick={()=>loginWithRedirect()}>Auth</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-success me-2"  type="button" onClick={()=>logout()} >Cerrar Sesion auth</button>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Link to='/registro'>
                                <button className="btn btn-success me-2"  type="button">Registrarse</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;
