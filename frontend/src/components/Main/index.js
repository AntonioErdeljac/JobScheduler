import React from "react";
import JobList from "./JobList";
import agent from "../../agent";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

//Na componentDidMount fetchamo sve poslove

class Main extends React.Component{
    componentWillMount(){
        this.props.onLoad(agent.Jobs.all());
    }

    componentWillUnmount(){
        this.props.onUnload();
    }

    tabsRender(){
        return (
            <nav className="nav my-3">
                <Link to="/" className="nav-link active">
                    Svi poslovi
                </Link>
                <Link to="/completed" className="nav-link" style={{color: 'rgba(0,0,0,.5)'}}>
                    Gotovi poslovi
                </Link>
                <Link to="/scheduled" className="nav-link" style={{color: 'rgba(0,0,0,.5)'}}>
                    Zakazani poslovi
                </Link>
                {this.props.currentUser ?
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

//redux mapstatetoprops & mapdispatchtoprops

const mapStateToProps = state => ({
    jobs: state.jobs.jobs,
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'MAIN_PAGE_LOADED', payload}),
    onUnload: () =>
        dispatch({type: 'MAIN_PAGE_UNLOADED'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
export {Main as Main, mapStateToProps as mapStateToProps, mapDispatchToProps as mapDispatchToProps}