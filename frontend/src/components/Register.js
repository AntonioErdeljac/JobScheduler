import React from "react";
import {connect} from "react-redux";
import agent from "../agent";
import Errors from "./Errors";

// identicne funkcionalnosti kao i Login componenta, samo dodajemo username u redux state

class Register extends React.Component{
    constructor(props){
        super(props);

        this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.submitForm = (username, email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmitForm(username, email, password);
        }
    }

    componentWillUnmount(){
        this.props.onUnload();
    }

    render(){
        const {username, email, password} = this.props;
        return (
            <div className="container my-3">
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="text-center" style={{color: '#2d89e5'}}>
                            <br/>
                            <h2>Registracija</h2>
                            <hr/>
                            <Errors errors={this.props.errors}/>
                            <form onSubmit={this.submitForm(username, email, password)}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input value={username} onChange={this.changeUsername} placeholder="Korisničko ime" type="text" className="form-control form-control-lg" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input value={email} onChange={this.changeEmail} placeholder="Email" type="text" className="form-control form-control-lg" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input type="password" value={password} onChange={this.changePassword} placeholder="Lozinka"  className="form-control form-control-lg" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <button disabled={this.props.inProgress} type="submit" className="btn btn-primary">
                                            Registriraj se
                                        </button>
                                    </fieldset>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = dispatch => ({
    onChangeUsername: value =>
        dispatch({type: 'UPDATE_FIELD_AUTH', key: 'username', value}),
    onChangeEmail: value =>
        dispatch({type: 'UPDATE_FIELD_AUTH', key: 'email', value}),
    onChangePassword: value =>
        dispatch({type: 'UPDATE_FIELD_AUTH', key: 'password', value}),
    onSubmitForm: (username, email, password) =>
        dispatch({type: 'REGISTER', payload: agent.Auth.register(username, email, password)}),
    onUnload: () =>
        dispatch({type: 'REGISTER_PAGE_UNLOADED'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);