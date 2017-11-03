import React from "react";
import Job from "./Job";

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
            this.props.jobs.map(job => {
                console.log(job);
                return (
                    <Job job={job} key={job.data.uniqueSlug}/>
                )
            })

        );
    }
}

export default JobList;