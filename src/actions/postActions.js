import * as KEYS from './stringKeys';

const setCityKeyword = (keyword) => {
	return {
		type: KEYS.SET_CITY_KEYWORD,
		payload: keyword,
	};
};
