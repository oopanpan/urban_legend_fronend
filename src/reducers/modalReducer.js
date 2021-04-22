import * as KEYS from '../actions/stringKeys';

export const modalReducer = (
	state = { display: false, header: '', body: '', buttons: [] },
	action
) => {
	switch (action.type) {
		case KEYS.DISPLAY_MODAL:
			return { ...state, display: action.payload };
		case KEYS.SET_MODAL:
			console.log(action.payload);
			const { display, header, body, buttons } = action.payload;
			return { display, header, body, buttons };
		default:
			return state;
	}
};
