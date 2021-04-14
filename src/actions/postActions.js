import * as KEYS from './stringKeys';
import api from '../service/api';

export const setCityKeyword = (keyword) => {
	return {
		type: KEYS.SET_CITY_KEYWORD,
		payload: keyword,
	};
};

export const fetchPosts = () => async (dispatch) => {
	const res = await api.post.getAllPosts();
	dispatch({
		type: KEYS.SET_ALL_POSTS,
		payload: res,
	});
	return res;
};
