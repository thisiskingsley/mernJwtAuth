import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { fetchFarm, createFarmProduct } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NewProductPage extends React.Component {
	componentDidMount() {
		const { match } = this.props;
		this.props.fetchFarm(match.params.id);
	}

	renderError({ error, touched }) {
		if (touched && error) {
			return error;
		}
	}

	renderInput = ({ input, label, type, meta, placeholder }) => {
		return (
			<div className="six wide field">
				<label>{label}</label>
				<input {...input} placeholder={placeholder} type={type} autoComplete="off" />
				<div style={{ color: 'red', marginBottom: '10px' }}>{this.renderError(meta)}</div>
			</div>
		);
	};

	renderCategories = ({ input, label, meta }) => {
		const choices = ['fruit', 'vegetable', 'dairy'];
		return (
			<div className="six wide field">
				<label>{label}</label>
				<select {...input}>
					<option value="select">Select</option>
					{choices.map(choice => (
						<option value={choice} key={choice}>
							{choice}
						</option>
					))}
				</select>
				<div style={{ color: 'red' }}>{this.renderError(meta)}</div>
			</div>
		);
	};

	onSubmit = formValues => {
		this.props.createFarmProduct(this.props.farm._id, formValues);
	};

	render() {
		return (
			<>
				<h1>Add A Product</h1>
				<form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Field
						name="productName"
						label="Product Name"
						component={this.renderInput}
						type="text"
						placeholder="Product Name"
						autoComplete="off"
					/>

					<Field
						name="price"
						label="Price"
						component={this.renderInput}
						type="number"
						autoComplete="off"
						placeholder="0"
					/>

					<Field
						name="category"
						component={this.renderCategories}
						label="Select a Category"
					/>

					<div style={{ marginTop: '20px' }}>
						<Link className="ui primary button" to="/farms">
							All Farms
						</Link>

						<button className="ui green button" type="submit">
							Submit
						</button>
					</div>
				</form>
			</>
		);
	}
}

const validate = formValues => {
	const errors = {};

	if (!formValues.productName) {
		//only runs if the user did not enter a product name
		errors.productName = 'You must enter a product name!';
	}

	if (!formValues.price) {
		//only runs if the user did not enter a price
		errors.price = 'You must enter a price!';
	}
	if (formValues.price < 1) {
		errors.price = 'NOTHING IS FREE!!! (or negative)';
	}

	if (!formValues.category || formValues.category === 'select') {
		errors.category = 'You must select a category!';
	}

	return errors;
};

const mapStateToProps = (state, ownProps) => {
	return { farm: state.farm, match: ownProps.match };
};

const formWrapped = reduxForm({
	form: 'productForm',
	validate,
})(NewProductPage);

export default connect(mapStateToProps, { fetchFarm, createFarmProduct })(formWrapped);
