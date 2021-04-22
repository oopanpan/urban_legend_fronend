import * as KEYS from './stringKeys';

export const displayModal = (boo) => {
	return {
		type: KEYS.DISPLAY_MODAL,
		payload: boo,
	};
};

export const setModal = (display, header, body, buttons) => {
	return {
		type: KEYS.SET_MODAL,
		payload: {
			display,
			header,
			body,
			buttons,
		},
	};
};
