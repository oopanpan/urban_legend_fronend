import * as KEYS from './stringKeys';

export const displayModal = (boo) => {
	return {
		type: KEYS.DISPLAY_MODAL,
		payload: boo,
	};
};
