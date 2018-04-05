import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class Slider extends Component {

    render() {
        return (
            <div className="left-col">
                <div className="overlay"></div>
                <div className="nav-area">
                    <div className="nav-head"><i className="fa fa-superpowers" aria-hidden="true"></i></div>
                    <h1 className="nav-name">刘佩玉</h1>
                    <nav className="nav-menu">
                        <ul>
                            <li><Link to="/"><i className="iconfont icon-home"></i>主页</Link></li>
                            <li><Link to="/photo"><i className="iconfont icon-xiangce"></i>相册</Link></li>
                            <li><Link to="/demo"><i className="iconfont icon-baerdemobaltimore"></i>DEMO</Link></li>
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
                            <li><Link to="/"><i className="iconfont icon-github"></i></Link></li>
                            <li><Link to="/"><i className="iconfont icon-zhihu"></i></Link></li>
                            <li><Link to="/"><i className="iconfont icon-CN_jianshu"></i></Link></li>
                            <li><Link to="/"><i className="iconfont icon-weibiaoti103"></i></Link></li>
                        </ul>
                    </div>
                    <span className="btn-editor"><Link to="/login">写文章<i className="icon-Add"></i></Link></span>
                </div>
            </div>
        )
    }
}


