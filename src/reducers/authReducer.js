import * as KEYS from '../actions/stringKeys'

export const authReducer = (state = {user: {} }, action) => {
    switch(action.type) {
        case KEYS.USER_AUTH:
            return {...state, user: action.payload};
        default:
            return state
    }
}