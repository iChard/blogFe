import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { List, Spin, Button } from 'antd';
import utils from '../../utils/utils';
import ArticleItem from './article';
import Photo from '../photo';
import server from '../../lib/server';
import './index.css';
import MdParser from '../common/mdParser';
import drawBg from '../../utils/canvasBg';

const ListItem = List.Item;
class Content extends Component {

    render() {
        const { height } = this.props;
        return (
            <div className="right-col" /* style={{ height: height + 'px' }} */>
                <canvas id="canvas"></canvas>
                <div className="right-container">
                    <Route exact path="/" component={Article}></Route>
                    <Route path="/photo" component={Photo}></Route>
                    <Route path="/article" component={ArticleItem}></Route>
                </div>
            </div>
        )
    }
    
    componentDidMount() {
        drawBg();
    }
    
}

class Article extends Component {

    state = {
        articleList: [],
        loadingMore: false,
        showLoadingMore: true,
        isListAll: false,
        pageNo: 1,
        pageSize: 10
    }

    componentWillMount() {
        this.fetchData()
    }

    fetchData(p) {
        let { pageNo, pageSize, articleList } = this.state;
        let params = Object.assign({}, { pageNo, pageSize }, p ? p : {});
        this.setState({ loadingMore: true });
        server.get('/articles', params, (data) => {
            let list = data.articles || [];
            this.setState({
                articleList: articleList.concat(list),
                pageNo: params.pageNo,
                pageSize: params.pageSize,
                isListAll: !list.length,
                showLoadingMore: !!list.length && (list.length == pageSize),
                loadingMore: false
            })
        })
    }

    onLoadMore = () => {
        let { pageNo, pageSize, articleList, isListAll } = this.state;
        let moreData = (articleList || []).length % Number(pageSize) ? false : true;
        moreData && !isListAll ? this.fetchData({ pageNo: pageNo * 1 + 1, pageSize }) : '';
    }

    renderItemFooter(itemData) {
        let { tagIds, tagNames, cateIds, cateNames, id } = itemData;
        let tagView = (tagNames || '').split(',').map((item, index) => (
            <li className="article-tag-item" key={item}>
                <a href="" className={"article-tag-item-link " + (index ? 'color2' : 'color1')}>{item}</a>
            </li>
        ));
        let cateView = (cateNames || '').split(',').map((item, index) => (
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
                <a href={'/article?id=' + id} className="acticle-item-nav">展开全文>></a>
            </div>
        )
    }

    render() {
        let { articleList, loadingMore, showLoadingMore } = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore}>加载更多</Button>}
            </div>
        ) : <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>到底了，请等待更新哦！</div>;
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={articleList}
                    loadMore={loadMore}
                    renderItem={(item, index) => {
                        return (
                            <ListItem>{
                                <div className="article-view-item" key={item.id}>
                                    <h1 className="artitle-title">{item.title}</h1>
                                    <ArticleItemView key={index} data={item} />
                                    <a className="article-more-a" href={'/article?id=' + item.id} >more &gt;&gt;</a>
                                    {this.renderItemFooter(item)}
                                </div>
                            }</ListItem>
                        )
                    }}>
                </List>
            </div>
        )
    }
}

class ArticleItemView extends Component {

    render() {
        let { data } = this.props;
        return (
            <div ref="articleitembox" dangerouslySetInnerHTML={{ __html: utils.escapeHtml(MdParser.render(data.content)) }}></div>
        )
    }

    componentDidMount() {

    }

}

export default Content;