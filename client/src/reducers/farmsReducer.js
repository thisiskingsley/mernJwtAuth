//REDUCER TO FETCH ALL FARMS AND APPLY TO STATE.
import { FETCH_FARMS } from '../actions/types';

export const farmsReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_FARMS:
			return action.payload;
		default:
			return state;
	}
};
