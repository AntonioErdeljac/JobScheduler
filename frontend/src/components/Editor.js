import React from "react";
import {connect} from "react-redux";
import agent from "../agent";
import Errors from "./Errors";

class Editor extends React.Component{
    constructor(props){
        super(props);

        this.changeTitle = ev => this.props.onChangeTitle(ev.target.value);
        this.changeSchedule = ev => this.props.onChangeSchedule(ev.target.value);
        this.submitForm = (title, schedule) => ev => {
            ev.preventDefault();
            this.props.onSubmitForm(title, schedule);
        }
    }

    componentWillUnmount(){
        this.props.onUnload();
    }
    render(){
        const {title, schedule} = this.props;
        return (
            <div className="container my-3">
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="text-center">
                            <h2 style={{color: '#2d89e5'}}>Stvori novi posao</h2>
                            <hr/>
                            <Errors errors={this.props.errors}/>
                            <form onSubmit={this.submitForm(title, schedule)}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input value={title} onChange={this.changeTitle} type="text" placeholder="Ime posla" className="form-control form-control-lg"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input value={schedule} onChange={this.changeSchedule} type="text" placeholder="Vrijeme npr. (in 20 seconds)" className="form-control form-control-lg"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <button type="submit" className="btn btn-primary">
                                            Spremi
                                        </button>
                                    </fieldset>
                                    <i className="text-muted"><i className="fa fa-slack"></i>&nbsp;Slack kanal biti će obaviješten o novom poslu
                                        <br/>(Novi posao: Ime posla, autor: ime...)</i>

                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.editor
});

const mapDispatchToProps = dispatch => ({
    onChangeTitle: value =>
        dispatch({type: 'UPDATE_FIELD_EDITOR', key: 'title', value}),
    onChangeSchedule: value =>
        dispatch({type: 'UPDATE_FIELD_EDITOR', key: 'schedule', value}),
    onSubmitForm: (title, schedule) =>
        dispatch({type: 'SAVE_JOB', payload: agent.Jobs.add(title, schedule)}),
    onUnload: () =>
        dispatch({type: 'EDITOR_PAGE_UNLOADED'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);