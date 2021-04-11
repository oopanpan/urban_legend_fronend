import * as KEYS from './stringKeys';

export const setAllConts = data =>(
    {
        type: KEYS.SET_ALL_CONTS,
        payload: data
    }
)

export const selectCont = data => (
    {
        type: KEYS.SELECT_CONT,
        payload: data
    }
)