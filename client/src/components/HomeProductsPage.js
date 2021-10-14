import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../actions/index';

class HomeProductsPage extends React.Component {
	componentDidMount() {
		this.props.fetchProducts();
	}

	renderList() {
		if (this.props.products.length === 0) {
			return <div>Waiting...</div>;
		} else {
			return this.props.products.map(product => {
				return (
					<div className="item" key={product._id}>
						<div className="content">
							<Link to={`/products/${product._id}`} className="header">
								{product.name}
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
					<h1>All Products</h1>
				</div>
				<div className="row">
					<div className="six wide column">
						<div className="ui relaxed divided selection list">{this.renderList()}</div>
					</div>
				</div>

				<Link className="ui primary button" to="/">
					Home
				</Link>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { products: state.products };
};

export default connect(mapStateToProps, { fetchProducts })(HomeProductsPage);
