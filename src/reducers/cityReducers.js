import * as KEYS from '../actions/stringKeys'

export const cityReducer = (state={}, action) => {
    switch (action.type) {
        case KEYS.SET_ALL_CONTS:
            return {...state, allConts: action.payload};
        case KEYS.SELECT_CONT:
            return {...state, selectedCont: action.payload};
        case KEYS.SET_URBAN_OPTION:
            return {...state, urbans: action.payload};
        case KEYS.SELECT_URBAN:
            return {...state, selectedUrban: action.payload};
        case KEYS.CLEAR_URBAN:
            const nextState = {...state}
            delete nextState.selectedUrban
            console.log(nextState)
            return nextState;
        default :
            return state;
    }
}