import * as KEYS from '../actions/stringKeys';

export const modalReducer = (
	state = { display: false, header: '', body: '', buttons: [] },
	action
) => {
	switch (action.type) {
		case KEYS.DISPLAY_MODAL:
			return { ...state, display: action.payload };
		case KEY.SET_HEADER:
			return state;
		default:
			return state;
	}
};
