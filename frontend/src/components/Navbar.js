import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
//navbar componenta uvijek je aktivna i vidljiva, različiti djelovi se aktiviraju ovisno o tome jeli korisnik loginiran ili ne

class Navbar extends React.Component{
    render(){
        return (
            <nav className="navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand">
                    <i className="fa fa-tasks mx-3"></i>JobScheduler
                </Link>
                <LoggedIn onClickLogout={this.props.onClickLogout} currentUser={this.props.currentUser}/>
                <LoggedOut currentUser={this.props.currentUser}/>
            </nav>
        );
    }
}

const LoggedIn = props => {
    if(props.currentUser) {
        console.log(props.currentUser);
        return (
            <ul className="navbar-nav ml-auto" style={{marginTop: '10px'}}>
                <li className="nav-item my-1">
                    <Link to="/editor" className="nav-button">
                        <i className="fa fa-plus"></i>&nbsp;New Job
                    </Link>
                </li>
                <li className="nav-item" style={{textDecoration: 'none'}}>
                    <div className="nav-item mx-3 dropdown">
                      <span  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: '#2d89e5', fontSize:'20px', textDecoration: 'none'}}>{props.currentUser.username} <i className="fa fa-user-circle"></i>&nbsp;<i className="fa fa-caret-down"></i></span>

                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a onClick={props.onClickLogout} className="dropdown-item" href="#" style={{color: '#D91E18'}}><i className="fa fa-sign-out"></i>&nbsp;  Logout</a>
                        </div>
                    </div>
                </li>
            </ul>
        );
    }
    return null;
};
const LoggedOut = props => {
    if(!props.currentUser){
        return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/login">Prijavi se</Link> ili <Link to="/register">Registriraj</Link> za više opcija
                    </li>
                </ul>
        );
    }
    return null;
};

const mapDispatchToProps = dispatch => ({
    onClickLogout: () =>
        dispatch({type: 'LOGOUT'})
});

export default connect(null, mapDispatchToProps)(Navbar);