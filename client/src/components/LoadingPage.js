import React, { useEffect } from 'react';
import history from '../history';

const LoadingPage = () => {
	useEffect(() => {
		const timer = setTimeout(() => {
			history.push('/');
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="ui icon message">
			<i className="notched circle loading icon"></i>
			<div className="content">
				<div className="header">Just one second</div>
				<p>We're fetching that content for you.</p>
				<p>(but, maybe you shouldn't be here)</p>
				<p>If this takes longer than 5 seconds, you will be redirected to Home Page</p>
			</div>
		</div>
	);
};

export default LoadingPage;
