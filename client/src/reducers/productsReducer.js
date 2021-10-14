//REDUCER TO FETCH ALL PRODUCTS AND APPLY TO STATE.
import { FETCH_PRODUCTS } from '../actions/types';

export const productsReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return action.payload;
		default:
			return state;
	}
};
