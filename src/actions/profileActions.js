import * as KEYS from './stringKeys';
import api from '../service/api';

export const getProfile = (id) => async (dispatch) => {
	const res = await api.user.getProfile(id);
	dispatch({
		type: KEYS.GET_PROFILE,
		payload: res.user,
	});
	return res.user;
};

export const patchProfile = (id, obj) => async (dispatch) => {
	const res = await api.user.patchUser(id, obj);
	console.log(res);
	dispatch({
		type: KEYS.GET_PROFILE,
		payload: res.user,
	});
	dispatch({
		type: KEYS.SET_USER_AUTH,
		payload: res.user,
	});
	return res.user;
};
