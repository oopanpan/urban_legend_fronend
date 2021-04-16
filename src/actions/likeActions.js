import api from '../service/api';
import * as KEYS from './stringKeys';

export const newLike = (obj) => async (dispatch) => {
	api.like.addLike(obj);
	dispatch({
		type: KEYS.POST_UPDATE_STATUS,
		payload: true,
	});
};

export const unLike = (id) => async (dispatch) => {
	api.like.unLike(id);
	dispatch({
		type: KEYS.POST_UPDATE_STATUS,
		payload: true,
	});
};
