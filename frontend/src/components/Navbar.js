import React from "react";

class Navbar extends React.Component{
    render(){
        return (
            <nav className="navbar navbar-expand-lg">
                <a href="" className="navbar-brand">
                    <i className="fa fa-tasks mx-3"></i>JobScheduler
                </a>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item nav-button mx-3">
                        Prijava
                    </li>
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