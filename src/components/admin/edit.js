import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import util from '../../utils/utils';
import server from '../../lib/server';
import Editor from '../editor';

const Option = Select.Option;

export default class Edit extends Component {

    state = {
        id: null,
        footerLeft: 200,
        saveLoading: false,
        title: '',
        content: '',
        tagAll: [],
        cateAll: [],
        tagIds: [],
        cateIds: [],
        tagNames: '',
        cateNames: '',
        clearEditor: false
    }

    componentDidMount() {
        let id = util.getQueryObj(window.location.href).id;
        this.pullTagList();
        this.setState({ id }, () => {
            this.getArticleById();
        });
    }

    pullTagList() {
        server.get('/admin/tags', {}, res => {
            this.setState({
                tagAll: res.tags || [],
                cateAll: res.categories || []
            })
        })
    }

    pubArticle = () => {
        let { title, content,tagNames, cateNames, tagIds, cateIds } = this.state;
        if (title && content) {
            this.setState({ saveLoading: true });
            server.post('/admin/editArticle/' + this.state.id, {
                updated: new Date().getTime(),
                title: title,
                content: content,
                tagIds: tagIds.join(','),
                cateIds: cateIds.join(','),
                tagNames: tagNames,
                cateNames: cateNames
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


    setTags = (v) => {
        let { tagAll } = this.state;
        let c = tagAll.filter(item => ~v.indexOf(item.id+''));
        let t = '';
        c.forEach(item => t+=item.name+',');
        this.setState({tagNames: t.replace(/,$/, ''), tagIds: v});        
    }

    setCategories = (v) => {
        let { cateAll } = this.state;
        let c = cateAll.filter(item => ~v.indexOf(item.id+''));
        let t = '';
        c.forEach(item => t+=item.name+',');
        this.setState({cateNames: t.replace(/,$/, ''), cateIds: v}); 
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
        let { tagAll, tagIds } = this.state;
        let view = (
            <Select
                mode="multiple"
                placeholder="请选择标签"
                onChange={this.setTags}
                style={{ width: '400px' }}
                value={tagIds}>
                {tagAll.map(item => (
                    <Option key={item.id}>{item.name}</Option>
                ))}
            </Select>
        )
        return view;
    }

    renderCates = () => {
        let { cateAll, cateIds } = this.state;
        let view = (
            <Select
                mode="multiple"
                placeholder="请选择标签"
                onChange={this.setCategories}
                style={{ width: '400px' }}
                value={cateIds}>
                {cateAll.map(item => (
                    <Option key={item.id}>{item.name}</Option>
                ))}
            </Select>
        )
        return view;
    }


    getArticleById = () => {
        server.get(`/admin/article/${this.state.id}`, {}, article => {
            this.setState(Object.assign({}, this.state, { ...article }, {
                cateIds: article.cateIds ? article.cateIds.split(',') : [],
                tagIds: article.tagIds ? article.tagIds.split(',') : []
            }));
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
                {this.renderItem('选择分类', this.renderCates())}
                {this.renderEditor()}
                <div className="action-area" style={{ left: this.state.footerLeft }}>
                    <Button type='primary' className='btn-pub' onClick={this.pubArticle} loading={saveLoading}>重新发布文章</Button>
                </div>
            </div>
        )
    }
}
