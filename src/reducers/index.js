import { combineReducers } from 'redux';

import { authReducer } from './authReducer'

//* import other reducers, this file is treated as a major outlet for all reducers

export default combineReducers({
    auth: authReducer
})