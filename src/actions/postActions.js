import * as KEYS from './stringKeys';
import api from '../service/api';

export const setCityKeyword = (keyword) => {
	return {
		type: KEYS.SET_CITY_KEYWORD,
		payload: keyword,
	};
};

export const fetchPosts = (currentPage) => async (dispatch) => {
	const res = await api.post.getAllPosts(currentPage);
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

export const nextPage = () => {
	return {
		type: KEYS.NEXT_PAGE_POSTS,
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
	dispatch({
		type: KEYS.ADD_NEW_POST,
		payload: res,
	});
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
