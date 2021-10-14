import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import HomePage from './HomePage';
import HomeProductsPage from './HomeProductsPage';
import ShowProductPage from './ShowProductPage';
import NewProductPage from './NewProductPage';
import EditProductPage from './EditProductPage';
import HomeFarmsPage from './HomeFarmsPage';
import ShowFarmPage from './ShowFarmPage';
import NewFarmPage from './NewFarmPage';
import Navbar from './Navbar';
import Login from './LoginPage';
import Register from './RegisterPage';
import { loadUser } from '../actions/index';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';

//MAKE SURE YOUR LOCALHOST MONGODB SERVER IS RUNNING!!!
class App extends React.Component {
	componentDidMount() {
		this.props.loadUser();
	}
	render() {
		return (
			<div className="ui container">
				<Router history={history}>
					<Navbar user={this.props.auth.user} />
					<Switch>
						<Route exact path="/" component={HomePage} />
						<GuestRoute
							user={this.props.auth.user}
							exact
							path="/register"
							component={Register}
						/>
						<GuestRoute
							user={this.props.auth.user}
							exact
							path="/login"
							component={Login}
						/>
						<PrivateRoute
							isLoading={this.props.auth.isLoading}
							user={this.props.auth.user}
							exact
							path="/products"
							component={HomeProductsPage}
						/>
						<PrivateRoute
							isLoading={this.props.auth.isLoading}
							user={this.props.auth.user}
							exact
							path="/products/:id/edit"
							component={EditProductPage}
						/>
						<PrivateRoute
							isLoading={this.props.auth.isLoading}
							user={this.props.auth.user}
							exact
							path="/products/:id"
							component={ShowProductPage}
						/>
						<PrivateRoute
							isLoading={this.props.auth.isLoading}
							user={this.props.auth.user}
							exact
							path="/farms"
							component={HomeFarmsPage}
						/>
						<PrivateRoute
							isLoading={this.props.auth.isLoading}
							user={this.props.auth.user}
							exact
							path="/farms/new"
							component={NewFarmPage}
						/>
						<PrivateRoute
							isLoading={this.props.auth.isLoading}
							user={this.props.auth.user}
							exact
							path="/farms/:id/products/new"
							component={NewProductPage}
						/>
						<PrivateRoute
							isLoading={this.props.auth.isLoading}
							user={this.props.auth.user}
							exact
							path="/farms/:id"
							component={ShowFarmPage}
						/>
						<Route exact path="*" component={() => 'Page Does Not Exist'} />
					</Switch>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { auth: state.auth };
};

export default connect(mapStateToProps, { loadUser })(App);
