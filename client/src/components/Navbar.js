import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/index';

class Navbar extends React.Component {
	render() {
		if (this.props?.user) {
			return (
				<div id="navbar" className="ui menu">
					<Link className="item" to="/">
						Home
					</Link>
					<div className="right menu">
						<Link onClick={this.props.logout} className="item" to="#">
							Log Out
						</Link>
					</div>
				</div>
			);
		} else {
			return (
				<div id="navbar" className="ui menu">
					<Link className="item" to="/">
						Home
					</Link>
					<div className="right menu">
						<Link className="item" to="/register">
							Register
						</Link>
						<Link className="item" to="/login">
							Log In
						</Link>
					</div>
				</div>
			);
		}
	}
}

export default connect(null, { logout })(Navbar);
