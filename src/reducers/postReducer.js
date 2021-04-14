import * as KEYS from '../actions/stringKeys';

export const postReducer = (state = {}, action) => {
	switch (action.type) {
		case KEYS.SET_CITY_KEYWORD:
			return { ...state, keyword: action.payload };
		case KEYS.SET_ALL_POSTS:
			return { ...state, posts: action.payload };
		default:
			return state;
	}
};
