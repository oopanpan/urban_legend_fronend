import * as KEYS from './stringKeys';
import api from '../service/api';

export const getProfile = (id) => async (dispatch) => {
	const res = await api.user.getProfile(id);
	dispatch({
		type: KEYS.GET_PROFILE,
		payload: res,
	});
};
