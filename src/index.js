import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components';
import 'antd/dist/antd.css'

ReactDOM.render((
    <Router>
        <Route path="/" component={Layout}></Route>    
    </Router>
), document.getElementById('root'));

registerServiceWorker();