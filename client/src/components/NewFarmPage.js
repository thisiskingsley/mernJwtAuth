import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createFarm } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NewFarmPage extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return error;
		}
	}

	renderInput = ({ input, label, type, meta, placeholder }) => {
		return (
			<div>
				<label>{label}</label>
				<input {...input} placeholder={placeholder} type={type} autoComplete="off" />
				<div style={{ color: 'red', marginBottom: '10px' }}>{this.renderError(meta)}</div>
			</div>
		);
	};

	onSubmit = formValues => {
		this.props.createFarm(formValues);
	};

	render() {
		return (
			<>
				<h1>Create A Farm</h1>
				<form className="ui form " onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Field
						name="name"
						label="Farm Name: "
						component={this.renderInput}
						type="text"
						placeholder="Farm Name"
						autoComplete="off"
					/>

					<Field
						name="city"
						label="City: "
						component={this.renderInput}
						type="text"
						placeholder="City"
					/>

					<Field
						name="email"
						label="Email: "
						component={this.renderInput}
						type="text"
						placeholder="Email"
					/>

					<div style={{ marginTop: '20px' }}>
						<Link className="ui primary button" to="/farms">
							Home
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

	if (!formValues.name) {
		//only runs if the user did not enter a farm name
		errors.name = 'You must enter a farm name!';
	}

	if (!formValues.city) {
		//ditto, but for city
		errors.city = 'You must enter a city!';
	}
	if (!formValues.email) {
		//ditto, but for email
		errors.email = 'You must enter an email!';
	}

	return errors;
};

const formWrapped = reduxForm({
	form: 'productForm',
	validate,
})(NewFarmPage);

export default connect(null, { createFarm })(formWrapped);
