import React, { Component } from 'react';
import { Input, Button, Select } from "antd";
import server from '../../lib/server';
import Editor from '../editor';
import './index.css';

const Option = Select.Option;
class WriteArticle extends Component {

    state = {
        footerLeft: 200,
        saveLoading: false,
        title: '',
        markDown: '',
        tags: [],
        categories: [],
        tagVal: [],
        cateVal: [],
        checkTag: '',
        checkCate: '',
        clearEditor: false
    }


    componentWillMount() {
        this.pullTagList();
    }


    pullTagList() {
        server.get('/admin/tags', {}, res => {
            this.setState({
                tags: res.tags || [],
                categories: res.categories || []
            })
        })
    }

    pubArticle = () => {
        let { title, markDown, checkTag, checkCate } = this.state;
        if (title && markDown && checkTag && checkCate) {
            this.setState({ saveLoading: true });
            server.post('/saveArticle', {
                created: new Date().getTime(),
                title: title,
                content: markDown,
                tags: checkTag,
                category: checkCate
            }, () => {
                this.setState({ saveLoading: false });
            }, () => {
                this.setState({ saveLoading: false });
            })
        }
    }

    resetData = () => {
        this.setState({
            markDown: '',
            checkTag: '',
            checkCate: ''
        })
    }

    setArticle = (markDown) => {
        this.setState({ markDown })
    }

    setTags = (v) => {
        let { tags } = this.state;
        let c = tags.filter(item => ~v.indexOf(item.id+''));
        let t = '';
        c.forEach(item => t+=item.name+',');
        this.setState({checkTag: t.replace(/,$/, ''), tagVal: v});        
    }

    setCategories = (v) => {
        let { categories } = this.state;
        let c = categories.filter(item => ~v.indexOf(item.id+''));
        let t = '';
        c.forEach(item => t+=item.name+',');
        this.setState({checkCate: t.replace(/,$/, ''), cateVal: v}); 
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
        let { tags } = this.state;
        let view = (
            <Select
                mode="multiple"
                placeholder="请选择标签"
                onChange={this.setTags}
                style={{ width: '400px' }}>
                {tags.map(item => (
                    <Option key={item.id}>{item.name}</Option>
                ))}
            </Select>
        )
        return view;
    }

    renderCates = () => {
        let { categories } = this.state;
        let view = (
            <Select
                mode="multiple"
                placeholder="请选择标签"
                onChange={this.setCategories}
                style={{ width: '400px' }}>
                {categories.map(item => (
                    <Option key={item.id}>{item.name}</Option>
                ))}
            </Select>
        )
        return view;
    }

    render() {
        return (
            <div className='content-write'>
                <p className='title'>新建文章</p>
                {this.renderItem('文章标题', <Input placeholder='文章标题' ref={node => this.refsTitle = node} style={{ width: 400 }} onChange={(e) => this.setState({ title: e.target.value || '' })} />)}
                {this.renderItem('选择标签', this.renderTags())}
                {this.renderItem('选择分类', this.renderCates())}
                <Editor onChange={this.setArticle} toggleFull={this.toggleFullscreen} value={undefined}/>
                <div className="action-area" style={{ left: this.state.footerLeft }}>
                    <Button type='primary' className='btn-pub' onClick={this.pubArticle} loading={this.state.saveLoading}>发布文章</Button>
                </div>
            </div>
        )
    }
}

export default WriteArticle;
