import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Button, Spin, Popconfirm } from "antd";
import server from '../../lib/server';

class BriefList extends Component {

    state = {
        loadingMore: false,
        showLoadingMore: true,
        list: [],
        pageNo: 1,
        pageSize: 10,
        isListAll: false
    }


    componentWillMount() {
        this.featchAcrticlesBreif();
    }

    featchAcrticlesBreif = (p) => {
        let { pageNo, pageSize, list } = this.state;
        let params = Object.assign({}, { pageNo, pageSize }, p ? p : {});
        this.setState({ loadingMore: true });
        server.get('/admin/articlesRelief', params, res => {
            let reliefList = res || [];
            this.setState({
                list: list.concat(reliefList),
                pageNo: params.pageNo,
                pageSize: params.pageSize,
                isListAll: !reliefList.length,
                showLoadingMore: !!reliefList.length && (reliefList.length == pageSize),
                loadingMore: false
            })
        })
    }

    onLoadMore = () => {
        let { pageNo, pageSize, list, isListAll } = this.state;
        let moreData = (list || []).length % Number(pageSize) ? false : true;
        moreData && !isListAll ? this.featchAcrticlesBreif({ pageNo: pageNo * 1 + 1, pageSize }) : '';
    }

    handleDelArticle = (id) => {
        let { list } = this.state;
        server.del(`/admin/article/${id}`, () => {
            this.setState({ list: list.filter(item => item.id != id) });
        })
    }

    render() {
        const { loading, loadingMore, showLoadingMore, list } = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
            </div>
        ) : <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>到底了!</div>;
        return (
            <div>
                <List
                    className="article-loadmore-list"
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item actions={[<Link to={`/admin/article?id=${item.id}`}>编辑</Link>,
                        <Popconfirm title={`请确认删除《${item.title}》?`} okText="删除" cancelText="我再想想" onConfirm={() => this.handleDelArticle(item.id)}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>]}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="www.ichard.cn">{item.title}</a>}
                                description={item.created}></List.Item.Meta>
                        </List.Item>
                    )} />
            </div>
        )
    }
}

export default BriefList;
