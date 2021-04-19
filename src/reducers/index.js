import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { cityReducer } from './cityReducers';
import { postReducer } from './postReducer';
import { profileReducer } from './profileReducer';

//* import other reducers, this file is treated as a major outlet for all reducers

export default combineReducers({
	auth: authReducer,
	geo: cityReducer,
	post: postReducer,
	profile: profileReducer,
});
