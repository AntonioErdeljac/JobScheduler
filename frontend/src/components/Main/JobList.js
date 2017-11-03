import React from "react";


class JobList extends React.Component{
    render(){
        if(!this.props.jobs){
            return (
                <div className="row">
                    <div className="loader mx-auto"></div>
                </div>
            )
        }

        if(this.props.jobs.length === 0){
            return (
                <div className="row">
                    <p className="text-muted mx-auto">Trenutno nema poslova.</p>
                </div>
            )
        }

        return (

            <div className="card my-2">
                <div className="card-body">
                    <div className="card-title">Test</div>
                </div>
            </div>
        );
    }
}

export default JobList;