import React from "react";
import {Link} from "react-router-dom";

//navbar componenta uvijek je aktivna i vidljiva, različiti djelovi se aktiviraju ovisno o tome jeli korisnik loginiran ili ne

class Navbar extends React.Component{
    render(){
        return (
            <nav className="navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand">
                    <i className="fa fa-tasks mx-3"></i>JobScheduler
                </Link>
                <LoggedIn currentUser={this.props.currentUser}/>
                <LoggedOut currentUser={this.props.currentUser}/>
            </nav>
        );
    }
}

const LoggedIn = props => {
    if(props.currentUser) {
        console.log(props.currentUser);
        return (
            <ul className="navbar-nav ml-auto">
                <Link to="/login" className="nav-item mx-3">
                    {props.currentUser.username}
                </Link>
            </ul>
        );
    }
    return null;
};
const LoggedOut = props => {
    if(!props.currentUser){
        return (
                <ul className="navbar-nav ml-auto">
                    <Link to="/login" className="nav-item nav-button mx-3">
                        Prijava
                    </Link>
                    <Link to="/login" className="nav-item nav-button mx-3">
                        Registracija
                    </Link>
                </ul>
        );
    }
    return null;
};

export default Navbar;