import * as KEYS from '../actions/stringKeys'

export const authReducer = (state = {}, action) => {
    switch(action.type) {
        case KEYS.SET_USER_AUTH:
            return {...state, auth: action.payload};
        case KEYS.DEL_USER_AUTH:
            return {};
        default:
            return state;
    }
}