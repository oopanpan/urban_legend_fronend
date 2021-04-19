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

		case KEYS.CLEAR_POSTS:
			return { ...state, posts: [] };

		case KEYS.SET_TOTAL_PAGES:
			return { ...state, totalPage: action.payload };

		//! PROBABLY WILL DELETE
		case KEYS.POST_UPDATE_STATUS:
			return { ...state, update: action.payload };

		case KEYS.ADD_NEW_POST:
			const newAddedPosts = [action.payload, ...state.posts];
			return { ...state, posts: newAddedPosts };

		case KEYS.UPDATE_POST:
			const newPosts = [...state.posts];
			const oldPost = newPosts.find(
				(post) => post.id === action.payload.id
			);
			const index = newPosts.indexOf(oldPost);
			newPosts.splice(index, 1, action.payload);
			return { ...state, posts: newPosts };

		case KEYS.DELETE_POST:
			const deletedPosts = state.posts.filter(
				(post) => post.id !== action.payload
			);
			return { ...state, posts: deletedPosts };
		default:
			return state;
	}
};
