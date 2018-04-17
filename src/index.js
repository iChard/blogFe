import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components';
ReactDOM.render((
    <Router>
        <Route path="/" component={Layout}></Route>
    </Router>
), document.getElementById('root'));

registerServiceWorker();
