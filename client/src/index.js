//ACTUAL INDEX.JS
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'; // imports from redux-persist
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import App from './components/App';
import reducers from './reducers';

const persistConfig = {
	// configuration object for redux-persist
	key: 'root',
	storage, // define which storage to use: localStorage
	whitelist: ['auth'], // only auth reducer will be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers); // create a persisted reducer

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	persistedReducer, // pass the persisted reducer instead of rootReducer to createStore,
	composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

// export { store, persistor };

ReactDOM.render(
	<Provider store={store}>
		{/* null passed to loading, persistor is being used here */}
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

//--------------------------------------------------------------------------------------
//BEFORE REDUX-PERSIST:
//--------------------------------------------------------------------------------------
//ACTUAL INDEX.JS
// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'semantic-ui-css/semantic.min.css';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';

// import App from './components/App';
// import reducers from './reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// ReactDOM.render(
// 	<Provider store={store}>
// 		<App />
// 	</Provider>,
// 	document.getElementById('root')
// );
