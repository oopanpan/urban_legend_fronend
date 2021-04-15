import axios from 'axios';

const BACKEND_API = 'http://localhost:3000/api/v1';

const TELEPORT_API = 'https://api.teleport.org/api/';

const token = () => localStorage.getItem('token');

const headers = () => {
	return {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: token(),
		},
	};
};

//* user requests

const postLogin = async (obj) => {
	const res = await axios.post(`${BACKEND_API}/login`, obj, headers());
	return res.data;
};

const postSignup = async (obj) => {
	const res = await axios.post(`${BACKEND_API}/users`, obj, headers());
	return res.data;
};

const getCurrentUser = async () => {
	const res = await axios.get(`${BACKEND_API}/profile`, headers());
	return res.data;
};

//* posts requests

const getAllPosts = async () => {
	const res = await axios.get(`${BACKEND_API}/posts`);
	return res.data;
};

const postNewPost = async (postObj) => {
	const res = await axios.post(`${BACKEND_API}/posts`, postObj, headers());
	return res.data;
};

const patchPost = async (postObj) => {
	const res = await axios.patch(
		`${BACKEND_API}/posts/${postObj.id}`,
		postObj,
		headers()
	);
	return res.data;
};

const deletePost = async (id) => {
	const res = await axios.delete(`${BACKEND_API}/posts/${id}`, headers());
	return res.data;
};
//* comment requests

const postNewComment = async (commentObj) => {
	const res = await axios.post(
		`${BACKEND_API}/comments`,
		commentObj,
		headers()
	);
	return res.data;
};

const getOneComment = async (id) => {
	const res = await axios.get(`${BACKEND_API}/comments/${id}`);
	return res.data;
};

const patchComment = async (commentObj) => {
	const res = await axios.patch(
		`${BACKEND_API}/comments/${commentObj.id}`,
		commentObj,
		headers()
	);
	return res.data;
};

const deleteComment = async (id) => {
	const res = await axios.delete(`${BACKEND_API}/comments/${id}`, headers());
	return res.data;
};

//* third party api request

const getAllUrbans = async () => {
	const res = await axios.get('https://api.teleport.org/api/urban_areas/');
	return res.data;
};

const getAllConts = async () => {
	const res = await axios.get('https://api.teleport.org/api/continents/');
	return res.data;
};

const general = async (link) => {
	const res = await axios.get(link);
	return res.data;
};

//* object to export with swag
const api = {
	user: {
		postLogin,
		postSignup,
		getCurrentUser,
	},
	post: {
		getAllPosts,
		postNewPost,
		patchPost,
		deletePost,
	},
	comment: {
		postNewComment,
		getOneComment,
		patchComment,
		deleteComment,
	},
	teleport: {
		general,
		getAllConts,
		getAllUrbans,
	},
};

export default api;
