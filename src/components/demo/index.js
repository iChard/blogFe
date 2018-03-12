import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

export default class Demo extends Component {

    
    componentWillMount() {
        console.log('ss:', this.props.match);
        
    }
    
    
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={this.props.match.url} component={D0}></Route>
                    <Route path={`${this.props.match.url}/d1`} component={D1}></Route>
                    <Route path={`${this.props.match.url}/d2`} component={D2}></Route>
                </Switch>
            </div>
        )
    }
}

class D0 extends Component {

    
    componentWillMount() {
        console.log('3333');
        
    }
    

    render() {
        return (
            <div>d0</div>
        )
    }
}


class D1 extends Component {
    render() {
        return (
            <div>d1</div>
        )
    }
}

class D2 extends Component {
    render() {
        return (
            <div>d2</div>
        )
    }
}