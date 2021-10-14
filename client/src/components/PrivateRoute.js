import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingPage from './LoadingPage';

const PrivateRoute = ({ isLoading, user, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				//since !isLoading is a falsey statement, it's gonna keep running until true.
				if (!isLoading) {
					if (user) {
						return <Component {...props} />;
					} else {
						return (
							<Redirect
								to={{
									pathname: '/',
									state: {
										from: props.location,
									},
								}}
							/>
						);
					}
				} else {
					return <LoadingPage />;
				}
			}}
		/>
	);
};

const mapStateToProps = state => {
	return { auth: state.auth };
};

export default connect(mapStateToProps)(PrivateRoute);
