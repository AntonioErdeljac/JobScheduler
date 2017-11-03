import React from "react";

class Job extends React.Component{
    render(){
        const {job} = this.props;
        return (
            <div className="card my-3">
                <div className="card-body">
                    <div className="card-title" style={{color: '#2d89e5'}}><h3>{job.data.title}</h3></div>
                    <div className="card-text"><p className="text-muted"><b>Zakazano po Agendi.js:</b> {job.data.schedule}</p></div>
                    <div className="card-text"><p style={!job.lastFinishedAt ? {color: '#D91E18'} : {color: '#1fcf7c'}}><b>{job.lastFinishedAt ? 'Posao izvršen: '+new Date(job.lastRunAt).toLocaleTimeString() : 'Posao će se izvršiti: '+new Date(job.nextRunAt).toLocaleTimeString()}</b></p></div>
                    <div className="card-text"><p className="text-muted"><b>Autor</b>: {job.data.author.username}</p></div>
                    <div className="card-text"><p className="" style={{color: '#1fcf7c'}}><i className="fa fa-slack"></i>: Poruka poslana na Slack:&nbsp;
                        <a href="https://jobscheduler.slack.com/messages/C7VGE5UT1/" target="_blank">#general</a></p></div>
                </div>
                <div className="card-footer">
                    <p style={!job.lastRunAt ? {color: '#D91E18'} : {color: '#1fcf7c'}}><b>Status:</b> {!job.lastRunAt ? 'Zakazano' : 'Dovršeno'}</p>
                </div>
            </div>
        )
    }
}

export default Job;