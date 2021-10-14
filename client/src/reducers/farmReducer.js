//REDUCER TO FETCH A SPECIFIC FARM AND APPLY TO STATE.
import { FETCH_FARM } from '../actions/types';

export const farmReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_FARM:
			return action.payload;
		default:
			return state;
	}
};
