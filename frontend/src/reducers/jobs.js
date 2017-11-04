export default (state={}, action) => {
    switch(action.type){
        case 'MAIN_PAGE_LOADED':
            return {
                ...state,
                jobs: action.payload.jobs
            };
        case 'MAIN_PAGE_UNLOADED':
        case 'COMPLETED_JOBS_UNLOADED':
        case 'SCHEDULED_JOBS_UNLOADED':
        case 'MY_JOBS_UNLOADED':
            return {};
        case 'LOAD_COMPLETED_JOBS':
            return {
                ...state,
                jobs: action.payload.jobs
            };
        case 'LOAD_SCHEDULED_JOBS':
            return {
                ...state,
                jobs: action.payload.jobs
            };
        case 'LOAD_MY_JOBS':
            return {
                ...state,
                jobs: action.payload.jobs
            };
        case 'DELETE_JOB':
            console.log('deleting job', action.uniqueSlug);
            return {
                ...state,
                jobs: state.jobs.filter(job => job.data.uniqueSlug !== action.uniqueSlug)
            }
    }
    return state;
};