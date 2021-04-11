import * as KEYS from '../actions/stringKeys'

export const cityReducer = (state={}, action) => {
    switch (action.type) {
        case KEYS.SET_ALL_CONTS:
            return {...state, allConts: action.payload};
        case KEYS.SELECT_CONT:
            return {...state, selectedCont: action.payload};
        case KEYS.SET_URBAN_OPTION:
            return {...state, urban: action.payload}
        default :
            return state
    }
}