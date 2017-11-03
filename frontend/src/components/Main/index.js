import React from "react";
import JobList from "./JobList";
import agent from "../../agent";
import {connect} from "react-redux";

class Main extends React.Component{
    componentWillMount(){
        this.props.onLoad(agent.Jobs.all());
    }
    render(){
        return(
            <div className="container my-3">
                <div className="row">
                    <div className="col-12">
                        <JobList/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    articles: state.articles
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'MAIN_PAGE_LOADED', payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);