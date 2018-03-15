import React, { Component } from 'react';
import {  Layout, Menu, Icon, Button } from 'antd';
import { Route, Link } from 'react-router-dom'
import server from '../../lib/server';
import WriteArticle from './write';
import BriefList from './list';
import Edit from './edit';
import './index.css';

const { Header, Sider, Content } = Layout;
const { Item, SubMenu } = Menu;

export default class Admin extends Component {

    state = {
        collapsed: false,
        widHeight: window.innerHeight,
        selectedKeys: ['1']
    }

    componentWillMount() {

    }

    logout = () => {
        server.get('/account/logout', {}, (res) => {
            console.log('res2: ', res);
        })
    }

    checkMenu = (obj) => {
        let {selectedKeys} = obj;
        this.setState({selectedKeys})
    }

    toggleSider = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }
    
    render() {
        let { match } = this.props;
        return (
            <Layout style={{ minHeight: this.state.widHeight, height: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} className='sider'>
                    <div className='logo'>博客管理后台</div>
                    <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} selectedKeys={this.state.selectedKeys} onSelect={this.checkMenu}>
                        <Item key='1'>
                            <Link to={`${match.path}/`}>
                                <Icon type='appstore' />
                                <span>账户管理</span>
                            </Link>
                        </Item>
                        <SubMenu key='sub1' title={<span><Icon type='user' />文章管理</span>}>
                            <Item key='sub1-1'><Link to={`${match.path}/list`} >文章列表</Link></Item>
                            <Item key='sub1-2'><Link to={`${match.path}/write`}>创建文章</Link></Item>
                            <Item key='sub1-3'><Link to={`${match.path}/tags`}>标签管理</Link></Item>
                            <Item key='sub1-4'><Link to={`${match.path}/edit`}>文章编辑</Link></Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon className='trigger' type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleSider} />
                        <Button type='primary' className='btn-logout' onClick={this.logout}>登出</Button>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minheight: 280 }}>
                        <Route exact path={`${match.path}/`} component={Home}></Route>
                        <Route path={`${match.path}/write`} component={WriteArticle}></Route>
                        <Route path={`${match.path}/list`} component={BriefList}></Route>
                        <Route path={`${match.path}/tags`} component={BriefList}></Route>
                        <Route path={`${match.path}/edit`} component={Edit}></Route>
                    </Content>
                </Layout>

            </Layout>
        )
    }

    _resizeWindow() {
        this.setState({
            widHeight: window.innerHeight
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this._resizeWindow.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resizeWindow.bind(this))
    }
}

const Home = () => {
    return (
        <div>home</div>
    )
}
