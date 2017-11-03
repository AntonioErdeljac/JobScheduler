import React from "react";

class Navbar extends React.Component{
    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a href="" className="navbar-brand">
                    <i className="fa fa-tasks mx-3"></i>JobScheduler
                </a>
                <span className="text-muted">|</span>
                <ul className="navbar-nav mr-auto mx-3">
                    <li className="nav-item active">
                        Početna
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item nav-button mx-3">
                        Prijava
                    </li>
                    <li className="nav-item nav-button">
                        Registracija
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;