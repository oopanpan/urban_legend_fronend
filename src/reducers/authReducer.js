import * as KEYS from '../actions/stringKeys'

export const authReducer = (state = {}, action) => {
    switch(action.type) {
        case KEYS.USER_AUTH:
            return {...state, ...action.payload};
        default:
            return state
    }
}