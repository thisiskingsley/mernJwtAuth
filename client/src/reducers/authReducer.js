//REDUCER FOR AUTHENTICATING LOGIN
import {
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	LOGOUT_SUCCESS,
	USER_LOADED,
	USER_LOADING,
} from '../actions/types';

const initialState = {
	isAuthenticated: null,
	isLoading: true,
	user: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return { ...state, isAuthenticated: false, isLoading: true };
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
				isLoading: true,
				user: null,
			};
		default:
			return state;
	}
};
