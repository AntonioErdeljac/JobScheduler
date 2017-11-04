import React from "react";
import agent from "../../agent";
import {connect} from "react-redux";
import JobList from "./JobList";
import {Link} from "react-router-dom";

class MyJobs extends React.Component{
    componentWillMount(){
        this.props.onLoad(agent.Jobs.myJobs())
    }
    tabsRender(){
        return (
            <nav className="nav my-3">
                <Link to="/" className="nav-link"  style={{color: 'rgba(0,0,0,.5)'}}>
                    Svi poslovi
                </Link>
                <Link to="/completed" className="nav-link " style={{color: 'rgba(0,0,0,.5)'}}>
                    Gotovi poslovi
                </Link>
                <Link to="/scheduled" className="nav-link " style={{color: 'rgba(0,0,0,.5)'}}>
                    Zakazani poslovi
                </Link>
                <Link to="/myjobs" className="nav-link active" >
                    Moji poslovi
                </Link>
            </nav>
        );
    }
    render(){
        return(
            <div className="container my-3">
                <div className="row">
                    <div className="col-8 offset-2">
                        {this.tabsRender()}
                        <hr/>
                        <JobList jobs={this.props.jobs}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    jobs: state.jobs.jobs
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'LOAD_MY_JOBS', payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(MyJobs);