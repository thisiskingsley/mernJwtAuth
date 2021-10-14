import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
	render() {
		if (this.props.user) {
			return (
				<div>
					<h1>{`Welcome to Home Page ${this.props.user}!`}</h1>
					<Link className="ui primary button" to="/farms">
						Go To Farms Page
					</Link>

					<Link className="ui green button" to="/products">
						Go To Products Page
					</Link>
				</div>
			);
		} else {
			return (
				<div>
					<h1>Welcome to Home Page</h1>
					<h2>Please Log In</h2>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return { user: state.auth.user };
};

export default connect(mapStateToProps)(HomePage);
