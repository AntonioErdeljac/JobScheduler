import React from "react";
import Job from "./Job";

//joblist komponenta rendera jobove ako ih ima, dok ih dohvaca prikazuje loading, a ako nema prikazuje poruku da ih nema.

class JobList extends React.Component{
    render(){
        if(!this.props.jobs){
            return (
                <div className="row">
                    <div className="loader mx-auto"></div>
                </div>
            )
        }

        if(this.props.jobs.length === 0 || this.props.jobs.length === 1 && this.props.jobs[0] === null){
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
                    <Job job={job} currentUser={this.props.currentUser} key={job.data.uniqueSlug}/>
                )
            })

        );
    }
}

export default JobList;