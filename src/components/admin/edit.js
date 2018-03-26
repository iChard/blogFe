import React, { Component } from 'react';
import { Input, Button, TreeSelect } from 'antd';
import util from '../../utils/utils';
import server from '../../lib/server';
import Editor from '../editor';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const treeData = [{
    label: '后端',
    value: '0-0',
    key: '0-0',
    children: [{
        label: 'node',
        value: '0-0-0',
        key: '0-0-0',
    }],
}, {
    label: '前端',
    value: '0-1',
    key: '0-1',
    children: [{
        label: 'ES6',
        value: '0-1-0',
        key: '0-1-0',
    }, {
        label: 'react',
        value: '0-1-1',
        key: '0-1-1',
    }, {
        label: 'react-router',
        value: '0-1-2',
        key: '0-1-2',
    }],
}];
export default class Edit extends Component {

    state = {
        id: null,
        footerLeft: 200,
        saveLoading: false,
        title: '',
        tagValue: ['0-0-0'],
        content: ''
    }

    componentDidMount() {
        let id = util.getQueryObj(window.location.href).id;
        this.setState({ id }, () => {
            this.getArticleById();
        });
    }

    pubArticle = () => {
        let { title, content } = this.state;
        if (title && content) {
            this.setState({ saveLoading: true });
            server.post('/admin/editArticle/' + this.state.id, {
                updated: new Date().getTime(),
                title: title,
                content: content,
                tags: 'javascript, node,express',
                category: '技术'
            }, () => {
                this.setState({ saveLoading: false });
            }, () => {
                this.setState({ saveLoading: false });
            })
        }
    }

    setArticle = (content) => {
        this.setState({ content })
    }

    toggleFullscreen = (isFull) => {
        this.setState({ footerLeft: isFull ? 0 : 200 });
    }

    renderItem = (label, node) => {
        return (
            <div className='line-item'>
                <div className="line-label">{label}</div>
                <div className="line-text">{node}</div>
            </div>
        )
    }

    renderTags = () => {
        const tProps = {
            treeData,
            value: this.state.tagValue,
            onChange: this.checkTag,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '请选择标签',
            style: {
                width: 400
            }
        };
        return <TreeSelect {...tProps} />;
    }


    getArticleById = () => {
        server.get(`/admin/article/${this.state.id}`, {}, article => {
            this.setState({ ...article });
        })
    }

    renderEditor = () => {
        let { content } = this.state;
        let view = '';
        if (content) {
            view = <Editor onChange={this.setArticle} value={content} toggleFull={this.toggleFullscreen} />;
        } else {
            // view = <div><Editor onChange={this.setArticle} toggleFull={this.toggleFullscreen} /></div>;//卡  耗性能
            view = '';
        }
        return view;
    }

    render() {
        let { title, saveLoading } = this.state;
        return (
            <div className='content-write'>
                <p className='title'>编辑文章</p>
                {this.renderItem('文章标题', <Input placeholder='文章标题' value={title} ref={node => this.refsTitle = node} style={{ width: 400 }} onChange={(e) => this.setState({ title: e.target.value || '' })} />)}
                {this.renderItem('选择标签', this.renderTags())}
                {this.renderEditor()}
                <div className="action-area" style={{ left: this.state.footerLeft }}>
                    <Button type='primary' className='btn-pub' onClick={this.pubArticle} loading={saveLoading}>重新发布文章</Button>
                </div>
            </div>
        )
    }
}
