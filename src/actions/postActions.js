import * as KEYS from './stringKeys';
import api from '../service/api';

export const setCityKeyword = (keyword) => {
	return {
		type: KEYS.SET_CITY_KEYWORD,
		payload: keyword,
	};
};

export const fetchPosts = (keyword, currentPage) => async (dispatch) => {
	const res = await api.post.getAllPosts(keyword, currentPage);
	console.log(res);
	dispatch({
		type: KEYS.SET_ALL_POSTS,
		payload: res.posts,
	});
	dispatch({
		type: KEYS.SET_TOTAL_PAGES,
		payload: res.total_pages,
	});
	return res;
};

export const fetchCityPosts = (keyword, currentPage) => async (dispatch) => {
	const res = await api.post.getCityPosts(keyword, currentPage);
	console.log(res);
};

export const nextPage = () => {
	return {
		type: KEYS.NEXT_PAGE_POSTS,
	};
};

export const resetPage = () => {
	return {
		type: KEYS.RESET_PAGE,
	};
};

export const clearPosts = () => {
	return {
		type: KEYS.CLEAR_POSTS,
	};
};

export const updatePost = (data) => {
	return {
		type: KEYS.UPDATE_POST,
		payload: data,
	};
};

export const addPost = (obj) => async (dispatch) => {
	const res = await api.post.postNewPost(obj);
	// dispatch({
	// 	type: KEYS.ADD_NEW_POST,
	// 	payload: res,
	// });
	return res.data;
};

export const deletePost = (id) => async (dispatch) => {
	api.post.deletePost(id);
	dispatch({
		type: KEYS.DELETE_POST,
		payload: id,
	});
};

export const newUpdate = (boo) => {
	return {
		type: KEYS.POST_UPDATE_STATUS,
		payload: boo,
	};
};
