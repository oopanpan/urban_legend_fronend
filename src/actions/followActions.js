import api from '../service/api';
import * as KEYS from './stringKeys';

export const newFollow = (followObj, follower, followerObj) => async (
	dispatch
) => {
	const res = await api.follow.newFollow(followObj);
	followerObj.id = res.id;
	const newList = [followerObj, ...follower];
	dispatch({
		type: KEYS.UPDATE_FOLLOWER,
		payload: newList,
	});
	return res.data;
};

export const unFollow = (id, follower) => async (dispatch) => {
	const res = await api.follow.unFollow(id);
	const newList = follower.filter((follow) => follow.id !== id);
	console.log(newList);
	dispatch({
		type: KEYS.UPDATE_FOLLOWER,
		payload: newList,
	});
	return res.data;
};
