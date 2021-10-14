import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct, deleteProduct } from '../actions/index';

class ShowProductPage extends React.Component {
	componentDidMount() {
		const { match } = this.props;
		this.props.fetchProduct(match.params.id);
	}

	renderFarm() {
		if (!this.props.product.farm) {
			return null;
		} else {
			return <li>{this.props.product.farm.name}</li>;
		}
	}

	render() {
		const { product } = this.props;
		return (
			<div>
				<h1>{product.name}</h1>
				<ul>
					<li>${product.price}</li>
					<li>{product.category}</li>
					{this.renderFarm()}
				</ul>

				<Link className="ui primary button" to="/products">
					All Products
				</Link>

				<Link className="ui orange button" to={`/products/${product._id}/edit`}>
					Edit
				</Link>

				<button
					onClick={() => {
						this.props.deleteProduct(product._id);
					}}
					className="ui negative button"
				>
					DELETE
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { product: state.product, match: ownProps.match };
};

export default connect(mapStateToProps, { fetchProduct, deleteProduct })(ShowProductPage);
