import * as KEYS from '../actions/stringKeys';

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case KEYS.SET_USER_AUTH:
			return { ...state, ...action.payload };
		// case KEYS.NEW_FOLLOW:
		// 	return { ...state, friends: [...state.friends] };
		// case KEYS.DEL_USER_AUTH:
		// 	return {};
		default:
			return state;
	}
};
