// reducer za opce stvari kao trenutni loginirani korisnik, token,
// te ovdje se odlucuje gdje ce se router premjestiti ovisno koja je akcija pozvana

export default (state={}, action) => {
    switch(action.type){
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user,
                redirectTo: action.error ? null : '/'
            };
        case 'SAVE_JOB':
            return {
                ...state,
                redirectTo: action.error ? null : '/myjobs'
            };
        case 'INITIAL_LOAD':
            console.log(action, 'INITIAL LOAD');
            return {
                ...state,
                token: action.token || null,
                currentUser: action.payload ? action.payload.user : null
            };
        case 'LOGOUT':
            return {
                ...state,
                currentUser: null,
                token: null,
                redirectTo: '/'
            };
        case 'REDIRECT':
            return {
                ...state,
                redirectTo: null
            };
    }
    return state;
}