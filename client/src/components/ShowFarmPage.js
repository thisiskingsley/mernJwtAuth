import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFarm, deleteFarm } from '../actions/index';

class ShowFarmPage extends React.Component {
	componentDidMount() {
		const { match } = this.props;
		this.props.fetchFarm(match.params.id);
	}

	renderList() {
		if (!this.props.farm.products) {
			return <div>Waiting...</div>;
		} else {
			return this.props.farm.products.map(product => {
				return (
					<div className="item" key={product._id}>
						<li className="content">
							<Link to={`/products/${product._id}`} className="header">
								{product.name}
							</Link>
						</li>
					</div>
				);
			});
		}
	}

	render() {
		const { farm } = this.props;
		return (
			<div>
				<h1>{farm.name}</h1>
				<li>
					<strong>City: </strong> {farm.city}
				</li>
				<li>
					<strong>Contact:</strong> {farm.email}
				</li>

				<h2>Products</h2>
				<ul className="ui relaxed list">{this.renderList()}</ul>

				<div style={{ marginTop: '100px' }}>
					<Link className="ui primary button" to="/farms">
						All Farms
					</Link>

					<Link className="ui green button" to={`/farms/${farm._id}/products/new`}>
						Create A Product
					</Link>

					<button
						onClick={() => {
							this.props.deleteFarm(farm._id);
						}}
						className="ui negative button"
					>
						DELETE
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { farm: state.farm, match: ownProps.match };
};

export default connect(mapStateToProps, { fetchFarm, deleteFarm })(ShowFarmPage);
