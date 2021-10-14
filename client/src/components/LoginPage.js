import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../actions/index';
import { clearErrors } from '../actions/errorActions';

class Login extends React.Component {
	componentDidMount() {
		this.props.clearErrors();
	}

	//displays the login error messages from the backend
	componentDidUpdate(prevProps) {
		const prevLogin = prevProps.formField.loginForm?.values;
		const newLogin = this.props.formField.loginForm?.values;

		if (prevLogin !== newLogin) {
			this.props.clearErrors();
		}
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

	onSubmit = formValues => {
		this.props.login(formValues);
	};

	render() {
		return (
			<>
				<h1>Log In!</h1>
				{this.props.err.status && (
					<div style={{ color: 'red', marginBottom: '10px' }}>{this.props.err.msg}</div>
				)}
				<form className="ui form " onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Field
						name="username"
						label="Username: "
						component={this.renderInput}
						type="text"
						placeholder="Username"
						autoComplete="off"
					/>

					<Field
						name="password"
						label="Password: "
						component={this.renderInput}
						type="password"
						placeholder="Password"
					/>

					<div style={{ marginTop: '20px' }}>
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

	if (!formValues.username) {
		//only runs if the user did not enter a username
		errors.username = 'You must enter a username!';
	}

	if (!formValues.password) {
		//ditto, but for password
		errors.password = 'You must enter a password!';
	}

	return errors;
};

const mapStateToProps = state => {
	return { err: state.error, formField: state.form };
};

const formWrapped = reduxForm({
	form: 'loginForm',
	validate,
})(Login);

export default connect(mapStateToProps, { login, clearErrors })(formWrapped);
