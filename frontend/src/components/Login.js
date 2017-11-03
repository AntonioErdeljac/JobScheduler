import React from "react";

class Login extends React.Component{
    render(){
        return (
            <div className="container my-3">
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="text-center" style={{color: '#2d89e5'}}>

                            <h2><i className="fa fa-tasks"></i>&nbsp;JobScheduler</h2>
                            <br/>
                            <h3><b>Prijava</b></h3>
                            <hr/>
                            <form action="">
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input placeholder="Email" type="text" className="form-control form-control-lg" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input placeholder="Lozinka" type="text" className="form-control form-control-lg" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <button className="btn btn-primary">
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

export default Login;