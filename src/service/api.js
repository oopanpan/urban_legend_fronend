import axios from 'axios';

const BACKEND_API = 'https://urban-legend.herokuapp.com/api/v1';
// const BACKEND_API = 'http://localhost:3000/api/v1';

const TELEPORT_API = 'https://api.teleport.org/api/';

const AVATAR = 'https://urban-legend.herokuapp.com';

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

const getProfile = async (id) => {
	const res = await axios.get(`${BACKEND_API}/users/${id}`);
	return res.data;
};

const patchUser = async (id, obj) => {
	const res = await axios.patch(`${BACKEND_API}/users/${id}`, obj, headers());
	return res.data;
};

//* Likes request

const addLike = async (obj) => {
	const res = await axios.post(`${BACKEND_API}/likes`, obj, headers());
	return res.data;
};

const unLike = async (id) => {
	const res = await axios.delete(`${BACKEND_API}/likes/${id}`, headers());
	return res.data;
};

//* posts requests

const getAllPosts = async (keyword, page) => {
	const res = await axios.get(
		`${BACKEND_API}/posts?limit=10&page=${page}&key=${keyword}`
	);
	return res.data;
};

const getOnePost = async (id) => {
	const res = await axios.get(`${BACKEND_API}/posts/${id}`);
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

//* Follow/Friendship request

const newFollow = async (obj) => {
	const res = await axios.post(`${BACKEND_API}/friendships/`, obj, headers());
	return res.data;
};

const unFollow = async (id) => {
	const res = await axios.delete(
		`${BACKEND_API}/friendships/${id}`,
		headers()
	);
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
		getProfile,
		patchUser,
	},
	post: {
		getAllPosts,
		getOnePost,
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
	like: {
		addLike,
		unLike,
	},
	follow: {
		newFollow,
		unFollow,
	},
	teleport: {
		general,
		getAllConts,
		getAllUrbans,
	},
	AVATAR,
};

export default api;
