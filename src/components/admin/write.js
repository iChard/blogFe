import React, { Component } from 'react';
import { Input, TreeSelect, Button } from "antd";
import server from '../../lib/server';
import Editor from '../editor';
import './index.css';

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

class WriteArticle extends Component {

    state = {
        footerLeft: 200,
        saveLoading: false,
        title: '',
        tagValue: ['0-0-0'],
        markDown: '',
    }

    pubArticle = () => {
        let {title, markDown} = this.state;
        if(title && markDown) {
            this.setState({saveLoading: true});
            server.post('/saveArticle', {
                created: new Date().getTime(),
                title: title,
                content: markDown,
                tags: 'javascript, node,express',
                category: '技术'
            }, () => {
                this.setState({saveLoading: false});
            })
        }
    }

    setArticle = (markDown) => {
        this.setState({markDown})
    }

    toggleFullscreen = (isFull) => {
        this.setState({footerLeft: isFull ? 0 : 200});
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

    render() {
        return (
            <div className='content-write'>
                <p className='title'>新建文章</p>
                {this.renderItem('文章标题', <Input placeholder='文章标题' ref={node => this.refsTitle = node} style={{width: 400}} onChange={(e) => this.setState({title: e.target.value || ''})}/>)}
                {this.renderItem('选择标签', this.renderTags())}
                <Editor onChange={this.setArticle} toggleFull={this.toggleFullscreen}/>
                <div className="action-area" style={{left: this.state.footerLeft}}>
                    <Button type='primary' className='btn-pub' onClick={this.pubArticle}>发布文章</Button>
                </div>
            </div>
        )
    }
}

export default WriteArticle;
