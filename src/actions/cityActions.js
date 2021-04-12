import * as KEYS from './stringKeys';
import api from '../service/api'
import axios from 'axios';

export const setAllConts = () => async dispatch =>{
    const res = await api.teleport.getAllConts()
    console.log(res)
    return dispatch({ type: KEYS.SET_ALL_CONTS, payload: res['_links']['continent:items'] })
}

export const selectCont = data => (
    {
        type: KEYS.SELECT_CONT,
        payload: data
    }
)

export const getAllUrbans = () => async dispatch => {
    const res = await api.teleport.getAllUrbans()
    dispatch({ type: KEYS.SET_URBAN_OPTION, payload: res['_links']['ua:item']})
}

export const getUrbansForCont = link => async dispatch => {
    const res = await axios.get(link)
        .then( r => {
            let link2 = r.data['_links']['continent:urban_areas']['href']
            return axios.get(link2)
        })
    dispatch({ type: KEYS.SET_URBAN_OPTION, payload: res.data['_links']['ua:items'] })
}

export const setUrban = link => async dispatch => {
    const res = await axios.get(link);
    dispatch({ type: KEYS.SELECT_URBAN, payload: res.data})
}

export const clearUrban = () => (
    { type: KEYS.CLEAR_URBAN }
)

// export const setUrban = data => (
//     {
//         type: KEYS.SELECT_URBAN,
//         payload: data
//     }
// )