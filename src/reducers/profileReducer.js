import * as KEYS from '../actions/stringKeys';

export const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case KEYS.GET_PROFILE:
			return { ...state, ...action.payload };
		case KEYS.UPDATE_FOLLOWER:
			return { ...state, inverse_friendships: action.payload };
		default:
			return state;
	}
};
