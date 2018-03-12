import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import ArticleItem from './article';
import Editor from 'tui-editor';
import Photo from '../photo';
import server from '../../lib/server';
import './index.css';

class Content extends Component {

    render() {
        const {mode, height} = this.props;
        return (
            <div className="right-col" style={{height: height+'px'}}>
                <div className="right-container">
                    <Route exact path="/" component={Article}></Route>
                    <Route path="/photo" component={Photo}></Route>
                    <Route path="/article" component={ArticleItem}></Route>
                </div>
            </div>
        )
    }
}

class Article extends Component {

    state = {
        articleList: []
    }
    
    componentWillMount() {
        this.fetchData()
    }
    
    fetchData() {
        server.get('/articles', {}, (data) => {
            let list = data.articles;
            this.setState({articleList: list})
        })
    }

    renderItemFooter(itemData) {
        let {tags, category, id} = itemData;
        let tagView = (tags || '').split(',').map((item, index) => (
            <li className="article-tag-item" key={item}>
                <a href="" className={"article-tag-item-link " + (index ? 'color2' : 'color1')}>{item}</a>
            </li>
        ));
        let cateView = (category || '').split(',').map((item, index) => (
            <li className="article-tag-item" key={item}>
                <a href="" className={"article-tag-item-link " + (index ? 'color2' : 'color3')}>{item}</a>
            </li>
        ))
        return (
            <div className="acticle-view-footer">
                <div className="tags-box">
                    <div className="article-tag">
                        <ul className="article-tag-list">{tagView}</ul>
                    </div>
                    <div className="article-tag">
                        <ul className="article-tag-list">{cateView}</ul>
                    </div>
                </div>
                <a href={'/article?id='+id} className="acticle-item-nav">展开全文>></a>
            </div>
        )
    }

    render() {
        let {articleList} = this.state;
        return (
            <div>{
                articleList.map((item, index) => (
                    <div className="article-view-item" key={item.id}>
                        <ArticleItemView key={index} data={item}/>
                        <a className="article-more-a" href={'/article?id='+item.id} >more &gt;&gt;</a>
                        {this.renderItemFooter(item)}
                    </div>
                ))
            }</div>
        )
    }
}


class ArticleItemView extends Component {

    renderView() {
        let {data} = this.props;
        var viewer = new Viewer({
            el: this.refs.articleitembox,
            viewer: true,
            height: '400px',
            initialValue: (data.content || '').split('--more--')[0]
        })
    }

    render() {
        return (
            <div ref="articleitembox"></div>
        )
    }

    
    componentDidMount() {
        this.renderView();
    }
    
}

export default Content;