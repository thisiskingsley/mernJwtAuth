//ACTIONS
//use {withCredentials: true} in the auth routes in order for the cookies to be saved in the browser,
//along with cors() on the server side

import {
	FETCH_PRODUCTS,
	FETCH_PRODUCT,
	FETCH_FARM,
	FETCH_FARMS,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	USER_LOADED,
	USER_LOADING,
} from './types';

import { fetchErrors } from './errorActions';
import axios from 'axios';
import history from '../history';

//PRODUCTS ACTIONS
export const fetchProducts = () => async dispatch => {
	const response = await axios.get('http://localhost:3001/products');

	dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const fetchProduct = id => async dispatch => {
	const response = await axios.get(`http://localhost:3001/products/${id}`);

	dispatch({ type: FETCH_PRODUCT, payload: response.data });
};

export const updateProduct = (formValues, id) => async dispatch => {
	await axios.put(`http://localhost:3001/products/${id}`, formValues);

	history.push('/products');
};

export const deleteProduct = id => async dispatch => {
	await axios.delete(`http://localhost:3001/products/${id}`);

	history.push('/products');
};

//FARM ACTIONS
export const fetchFarms = () => async dispatch => {
	const response = await axios.get('http://localhost:3001/farms');

	dispatch({ type: FETCH_FARMS, payload: response.data });
};

export const fetchFarm = id => async dispatch => {
	const response = await axios.get(`http://localhost:3001/farms/${id}`);

	dispatch({ type: FETCH_FARM, payload: response.data });
};

export const createFarm = formValues => async () => {
	await axios.post('http://localhost:3001/farms', formValues);

	history.push('/farms');
};

export const createFarmProduct = (id, formValues) => async () => {
	await axios.post(`http://localhost:3001/farms/${id}/products/`, formValues);

	history.push(`/farms/${id}`);
};

export const deleteFarm = id => async () => {
	await axios.delete(`http://localhost:3001/farms/${id}`);

	history.push('/farms');
};

//USER ACTIONS
export const createUser = formValues => async dispatch => {
	try {
		//Here we pass in the {withCredentials: true} config to save the cookie to browswer
		const response = await axios.post('http://localhost:3001/users', formValues, {
			withCredentials: true,
		});

		dispatch({ type: REGISTER_SUCCESS, payload: response.data });
		history.push('/');
	} catch (err) {
		dispatch(fetchErrors(err));
	}
};

// AUTH ACTIONS
export const loadUser = () => async (dispatch, getState) => {
	// User loading
	dispatch({ type: USER_LOADING });

	//Here we pass in the {withCredentials: true} config to save the cookie to browswer
	const response = await axios.get('http://localhost:3001/auth/user', { withCredentials: true });

	dispatch({ type: USER_LOADED, payload: response.data });
};

export const login = formValues => async dispatch => {
	try {
		//Here we pass in the {withCredentials: true} config to save the cookie to browswer
		const response = await axios.post('http://localhost:3001/auth', formValues, {
			withCredentials: true,
		});

		dispatch({ type: LOGIN_SUCCESS, payload: response.data });
		history.push('/');
	} catch (err) {
		dispatch(fetchErrors(err));
	}
};

export const logout = () => async dispatch => {
	//Here, to logout, we pass in an empty object and also the {withCredentials: true} config
	await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });

	dispatch({ type: LOGOUT_SUCCESS });

	history.push('/');
};
