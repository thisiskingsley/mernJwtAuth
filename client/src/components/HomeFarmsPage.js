import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFarms } from '../actions/index';

class HomeFarmsPage extends React.Component {
	componentDidMount() {
		this.props.fetchFarms();
	}
	renderList() {
		if (this.props.farms.length === 0) {
			return <div>Waiting...</div>;
		} else {
			return this.props.farms.map(farm => {
				return (
					<div className="item" key={farm._id}>
						<div className="content">
							<Link to={`/farms/${farm._id}`} className="header">
								{farm.name}
							</Link>
						</div>
					</div>
				);
			});
		}
	}

	render() {
		return (
			<div className="ui centered grid">
				<div className="row">
					<h1>All Farms</h1>
				</div>
				<div className="row">
					<div className="six wide column">
						<div className="ui middle aligned divided selection list">
							{this.renderList()}
						</div>
					</div>
				</div>

				<div className="row" style={{ marginTop: '20px' }}>
					<Link className="ui primary button" to="/">
						Home
					</Link>

					<Link className="ui green button" to="/farms/new">
						Create Farm
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { farms: state.farms };
};

export default connect(mapStateToProps, { fetchFarms })(HomeFarmsPage);
