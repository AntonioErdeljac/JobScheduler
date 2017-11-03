export default (state={}, action) => {
    switch(action.type){
        case 'MAIN_PAGE_LOADED':
            return {
                ...state,
                jobs: action.payload.jobs
            };
        case 'LOAD_COMPLETED_JOBS':
            return {
                ...state,
                jobs: action.payload.jobs
            }
    }
    return state;
};