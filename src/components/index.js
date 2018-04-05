import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import server from '../lib/server';
import Slider from './slider';
import Content from './content';
import Demo from '../components/demo';
import Editor from '../components/editor';
import Login from '../components/login';
import Admin from '../components/admin';
import '../style/editor.css';
import '../style/common.css';
import './index.css';
import '../style/rewrite.css';
import 'highlight.js/styles/solarized-dark.css';//  highlight主题
import '../style/fontscss/font-awesome.css'; // font-awesome官方
import '../style/font.css'; //alifont  iconfont

class Layout extends Component {

    constructor() {
        super();
        this.state = {
            contentMode: 'normal',
            widHeight: window.innerHeight
        }
    }

    
    componentWillMount() {
        // this.getIpAddress();
    }

    _resizeWindow() {
        this.setState({
            widHeight: window.innerHeight
        })
    }
    
    render() {
        let {widHeight, contentMode} = this.state;
        return (
            <div className="container" style={{height: widHeight+'px'}}>
                <Switch>    
                    <Route path="/demo" component={Demo}></Route>
                    <Route path="/editor" component={Editor}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" component={Admin}></Route>
                    <Route path="/" render={() => <Home state={{widHeight, contentMode}}/>}></Route>
                </Switch>
            </div>
        )
    }

    
    componentDidMount() {
        window.addEventListener('resize', this._resizeWindow.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resizeWindow.bind(this))
    }
}

const Home = ({state}) => {

    return (
        <div>
            <Slider
                height={state.widHeight}
            />
            <Content
                height={state.widHeight}
                mode={state.contentMode}
            />
        </div>
    )
}
export default Layout