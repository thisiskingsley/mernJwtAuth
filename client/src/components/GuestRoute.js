import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ user, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (!user) {
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
			}}
		/>
	);
};

const mapStateToProps = state => {
	return { auth: state.auth };
};

export default connect(mapStateToProps)(GuestRoute);
