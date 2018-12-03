import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//REDUX, for later:
//const {Provider, createStore} from 'react-redux';
//const store = createStore(); //pass reducers into createStore here after importing them above


// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>, 
//     document.getElementById('root'));


ReactDOM.render(<App />, document.getElementById('root'));
