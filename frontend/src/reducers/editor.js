export default (state={}, action) => {
    switch(action.type){
        case 'UPDATE_FIELD_EDITOR':
            return {
                ...state,
                [action.key]: action.value
            };
        case 'SAVE_JOB':
            return {
                ...state,
                errors: action.error ? action.payload.errors : null,
                inProgress: false
            }
    }
    return state;
}