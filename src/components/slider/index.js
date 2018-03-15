import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class Slider extends Component {

    render() {
        return (
            <div className="left-col">
                <div className="overlay"></div>
                <div className="nav-area">
                    <div className="nav-head"></div>
                    <h1 className="nav-name">iChard</h1>
                    <nav className="nav-menu">
                        <ul>
                            <li><Link to="/">主页</Link></li>
                            <li><Link to="/photo">相册</Link></li>
                            <li><Link to="/demo">DEMO</Link></li>
                        </ul>
                    </nav>
                    <nav className="nav-small-menu">
                        <ul>
                            <li><Link to="/">所有文章</Link></li>/
                            <li><Link to="/">链接</Link></li>/
                            <li><Link to="/">关于我</Link></li>
                        </ul>
                    </nav>
                    <div className="out-link">
                        <ul>
                            <li><Link to="/"><i className="icon-git"></i></Link></li>
                            <li><Link to="/"><i className="icon-zhihu"></i></Link></li>
                            <li><Link to="/"><i className="icon-jianshu"></i></Link></li>
                            <li><Link to="/"><i className="icon-email"></i></Link></li>
                        </ul>
                    </div>
                    <span className="btn-editor"><Link to="/login">写文章<i className="icon-Add"></i></Link></span>
                </div>
            </div>
        )
    }
}


