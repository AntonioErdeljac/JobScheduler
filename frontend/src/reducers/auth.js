// ovo je reducer za Login I Register values i naredbe

export default (state={}, action) => {
    switch(action.type){
        case 'UPDATE_FIELD_AUTH':
            return {
                ...state,
                [action.key]: action.value
            };
        case 'REGISTER_PAGE_UNLOADED':
        case 'LOGIN_PAGE_UNLOADED':
            return {};
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case 'ASYNC_START':
            if(action.subtype === 'LOGIN' || action.subtype === 'REGISTER'){
                return {
                    ...state,
                    inProgress: true
                }
            }
    }
    return state;
}