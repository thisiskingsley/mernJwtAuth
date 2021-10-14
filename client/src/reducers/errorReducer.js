import { FETCH_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
	msg: null,
	status: false,
};

export const errorReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ERRORS:
			return {
				msg: action.payload.msg,
				status: true,
			};
		case CLEAR_ERRORS:
			return {
				msg: null,
				status: false,
			};
		default:
			return state;
	}
};
