import api from '../service/api';
import * as KEYS from './stringKeys';

export const newLike = (obj, userArr, setUserArr) => async (dispatch) => {
	const res = await api.like.addLike(obj);
	setUserArr([...userArr, res]);
	dispatch({
		type: KEYS.POST_UPDATE_STATUS,
		payload: true,
	});
};

export const unLike = (id, userArr, setUserArr) => async (dispatch) => {
	api.like.unLike(id);
	setUserArr(userArr.filter((like) => like.id !== id));
	dispatch({
		type: KEYS.POST_UPDATE_STATUS,
		payload: true,
	});
};
