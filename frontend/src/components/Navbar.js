import React from "react";
import {Link} from "react-router-dom";

class Navbar extends React.Component{
    render(){
        return (
            <nav className="navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand">
                    <i className="fa fa-tasks mx-3"></i>JobScheduler
                </Link>
                <ul className="navbar-nav ml-auto">
                    <Link to="/login" className="nav-item nav-button mx-3">
                        Prijava
                    </Link>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item nav-button mx-3">
                        Registracija
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;