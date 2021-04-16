import * as KEYS from '../actions/stringKeys';

export const postReducer = (
	state = { page: 0, update: false, posts: [] },
	action
) => {
	switch (action.type) {
		case KEYS.NEXT_PAGE_POSTS:
			return { ...state, page: state.page + 1 };
		case KEYS.SET_CITY_KEYWORD:
			return { ...state, keyword: action.payload };
		case KEYS.SET_ALL_POSTS:
			console.log(action.payload);
			return { ...state, posts: [...state.posts, ...action.payload] };
		case KEYS.SET_TOTAL_PAGES:
			return { ...state, totalPage: action.payload };
		case KEYS.POST_UPDATE_STATUS:
			return { ...state, update: action.payload };
		default:
			return state;
	}
};
