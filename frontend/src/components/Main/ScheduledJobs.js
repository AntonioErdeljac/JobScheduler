import React from "react";
import agent from "../../agent";
import {connect} from "react-redux";
import JobList from "./JobList";
import {Link} from "react-router-dom";

class ScheduledJobs extends React.Component{
    componentWillMount(){
        this.props.onLoad(agent.Jobs.scheduled())
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
                <Link to="/scheduled" className="nav-link active" >
                    Zakazani poslovi
                </Link>{this.props.currentUser ?
                <Link to="/myjobs" className="nav-link" style={{color: 'rgba(0,0,0,.5)'}}>
                    Moji poslovi
                </Link>
                : null}
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
                        <JobList currentUser={this.props.currentUser} jobs={this.props.jobs}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    jobs: state.jobs.jobs,
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'LOAD_SCHEDULED_JOBS', payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledJobs);