import React from "react";
import JobList from "./JobList";
import agent from "../../agent";
import {connect} from "react-redux";

//Na componentDidMount fetchamo sve poslove

class Main extends React.Component{
    componentWillMount(){
        this.props.onLoad(agent.Jobs.all());
    }
    render(){
        return(
            <div className="container my-3">
                <div className="row">
                    <div className="col-8 offset-2">
                        <nav className="nav my-3">
                            <li className="nav-link active">
                                Svi poslovi
                            </li>
                            <li className="nav-link" style={{color: 'rgba(0,0,0,.5)'}}>
                                Gotovi poslovi
                            </li>
                            <li className="nav-link" style={{color: 'rgba(0,0,0,.5)'}}>
                                Zakazani poslovi
                            </li>
                        </nav>
                        <hr/>
                        <JobList jobs={this.props.jobs}/>
                    </div>
                </div>
            </div>
        );
    }
}

//redux mapstatetoprops & mapdispatchtoprops

const mapStateToProps = state => ({
    jobs: state.jobs.jobs
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'LOAD_COMPLETED_JOBS', payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);