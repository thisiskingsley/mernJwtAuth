//REDUCER TO FETCH A SPECIFIC PRODUCT AND APPLY TO STATE.
import { FETCH_PRODUCT } from '../actions/types';

export const productReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_PRODUCT:
			return action.payload;
		default:
			return state;
	}
};
