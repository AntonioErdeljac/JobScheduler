import React from "react";
import {connect} from "react-redux";
import agent from "../agent";
import Errors from "./Errors";

//login komponenta aktivna pod /login rutom, upravljana auth reducerom (email & password values)

class Login extends React.Component{
    constructor(props){
        super(props);

        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.submitForm = (email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmitForm(email, password);
        }
    }

    componentWillUnmount(){
        this.props.onUnload();
    }

    render(){
        const {email, password} = this.props;
        return (
            <div className="container my-3">
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="text-center" style={{color: '#2d89e5'}}>
                            <br/>
                            <h2>Prijava</h2>
                            <hr/>
                            <Errors errors={this.props.errors}/>
                            <form onSubmit={this.submitForm(email, password)}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input value={email} onChange={this.changeEmail} placeholder="Email" type="text" className="form-control form-control-lg" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input type="password" value={password} onChange={this.changePassword} placeholder="Lozinka"  className="form-control form-control-lg" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <button disabled={this.props.inProgress} type="submit" className="btn btn-primary">
                                            Prijavi se
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
    onChangeEmail: value =>
        dispatch({type: 'UPDATE_FIELD_AUTH', key: 'email', value}),
    onChangePassword: value =>
        dispatch({type: 'UPDATE_FIELD_AUTH', key: 'password', value}),
    onSubmitForm: (email, password) =>
        dispatch({type: 'LOGIN', payload: agent.Auth.login(email, password)}),
    onUnload: () =>
        dispatch({type: 'LOGIN_PAGE_UNLOADED'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);