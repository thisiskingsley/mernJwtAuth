import { FETCH_ERRORS, CLEAR_ERRORS } from './types';

//FETCH_ERRORS
export const fetchErrors = err => {
	return {
		type: FETCH_ERRORS,
		payload: err.response.data,
	};
};

//CLEAR_ERRORS
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
