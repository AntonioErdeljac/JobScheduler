//reducer slican kao auth samo jednostavniji

export default (state={}, action) => {
    switch(action.type){
        case 'UPDATE_FIELD_EDITOR':
            console.log(action.key, action.value);
            return {
                ...state,
                [action.key]: action.value
            };
        case 'EDITOR_PAGE_UNLOADED':
            return {};
        case 'SAVE_JOB':
            return {
                ...state,
                errors: action.error ? action.payload.errors : null,
                inProgress: false
            }
    }
    return state;
}