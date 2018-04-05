import React, { Component } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import { Route, Link } from 'react-router-dom'
import server from '../../lib/server';
import WriteArticle from './write';
import BriefList from './list';
import Edit from './edit';
import TagManage from './tags';
import './index.css';

const { Header, Sider, Content } = Layout;
const { Item, SubMenu } = Menu;

export default class Admin extends Component {

    state = {
        collapsed: false,
        widHeight: window.innerHeight,
        selectedKeys: ['sub1-1'],
        openKeys: ['sub1'],
        logoutLoading: false
    }

    componentWillMount() {
        this.checkLogin();
    }

    checkLogin = () => {
        server.get('/admin/user', {}, () => {

        })
    }

    logout = () => {
        this.setState({ logoutLoading: true });
        server.get('/account/logout', {}, (res) => {
            this.setState({ logoutLoading: false });
            window.location.href = '/';
        })
    }

    checkMenu = (obj) => {
        let { selectedKeys } = obj;
        this.setState({ selectedKeys })
    }

    toggleSider = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        let { match } = this.props;
        let { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: this.state.widHeight, height: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} className='sider'>
                    <div className='logo'><i className="fa fa-address-card-o" aria-hidden="true"></i>{collapsed ? '' : <span className="ml10">刘佩玉</span>}</div>
                    <Menu theme='dark' mode='inline' defaultSelectedKeys={['sub1-1']} defaultOpenKeys={['sub1']} onSelect={this.checkMenu}>
                        <SubMenu key='sub1' title={<span><i className="iconfont icon-New_write"></i>{collapsed ? '' : '文章管理'}</span>}>
                            <Item key='sub1-1'><Link to={`${match.path}/list`} >文章列表</Link></Item>
                            <Item key='sub1-2'><Link to={`${match.path}/write`}>创建文章</Link></Item>
                            <Item key='sub1-3'><Link to={`${match.path}/tags`}>标签管理</Link></Item>
                        </SubMenu>
                        <SubMenu key='sub2' title={<span><i className="iconfont icon-xiangce"></i>{collapsed ? '' : '相册'}</span>}>
                            <Item key='sub2-1'><Link to={`${match.path}/photoManage`} >管理</Link></Item>
                            <Item key='sub2-2'><Link to={`${match.path}/photoLoad`}>上传</Link></Item>
                            <Item key='sub2-3'><Link to={`${match.path}/photoCates`}>分类</Link></Item>
                        </SubMenu>
                        <SubMenu key='sub3' title={<span><i className="iconfont icon-baerdemobaltimore"></i>{collapsed ? '' : 'DEMO'}</span>}>
                            <Item key='sub3-1'><Link to={`${match.path}/photoManage`} >全部Demo</Link></Item>
                            <Item key='sub3-3'><Link to={`${match.path}/photoCates`}>分类管理</Link></Item>
                        </SubMenu>
                        <Item key='1'>
                            <Link to={`${match.path}/`}>
                                <Icon type='user' />
                                <span>{collapsed ? '' : '账户管理'}</span>
                            </Link>
                        </Item>
                        <Item key='2'>
                            <Link to={`${match.path}/`}>
                                <i className="iconfont icon-kujialeqiyezhan_zhinengbuju"></i>
                                <span>{collapsed ? '' : '首页布局'}</span>
                            </Link>
                        </Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon className='trigger' type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleSider} />
                        <Button type='primary' className='btn-logout' onClick={this.logout} loading={this.state.logoutLoading || false}>登出</Button>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minheight: 280 }}>
                        <Route exact path={`${match.path}/`} component={BriefList}></Route>
                        <Route path={`${match.path}/write`} component={WriteArticle}></Route>
                        <Route path={`${match.path}/list`} component={BriefList}></Route>
                        <Route path={`${match.path}/tags`} component={TagManage}></Route>
                        <Route path={`${match.path}/article`} component={Edit}></Route>
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
