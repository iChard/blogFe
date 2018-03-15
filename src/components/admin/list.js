import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Button, Spin, Popconfirm } from "antd";
import server from '../../lib/server';

class BriefList extends Component {

    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        list: []
    }


    componentWillMount() {
        this.featchAcrticlesBreif();
    }

    featchAcrticlesBreif = () => {
        server.get('/admin/articlesRelief', {}, res => {
            this.setState({ list: res || [], loading: false });
        })
    }

    handleDelArticle = (id) => {
        let {list} = this.state;
        server.del(`/admin/article/${id}`, () => {
            this.setState({list: list.filter(item => item.id != id)});
        })
    }

    render() {
        const { loading, loadingMore, showLoadingMore, list } = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
            </div>
        ) : null;
        return (
            <div>
                <List
                    className="article-loadmore-list"
                    loading={loading}
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
