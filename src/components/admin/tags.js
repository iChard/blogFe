import React, { Component } from 'react';
import { Input, Button, Icon, message, notification } from 'antd';
import './index.css';
import server from '../../lib/server';

export default class TagManage extends Component {

    state = {
        tags: [],
        categories: [],
        delTags: '',
        delCates: ''
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

    renderLabel = (label, node) => {
        return (
            <div className="labelBox">
                <div className="labelTitle">{label}</div>
                <div className="labelNode">{node}</div>
            </div>
        )
    }

    setCategories = (e) => {
        let { categories } = this.state;
        let v = e.target.value.trim();
        if (!v) return;
        if (categories.filter(item => (item.name + '').toUpperCase() == (v + '').toUpperCase()).length) {
            message.info(`已经存在${v.toLowerCase()}分类！`);
            return;
        }
        this.setState({
            categories: categories.concat([{ id: null, name: v }])
        }, () => {
            this.refs.cateInput.input.value = '';
        })
    }

    setTags = (e) => {
        let { tags } = this.state;
        let v = e.target.value.trim();
        if (!v) return;
        if (tags.filter(item => (item.name + '').toUpperCase() == (v + '').toUpperCase()).length) {
            message.info(`已经存在${v}标签！`);
            return;
        }
        this.setState({
            tags: tags.concat([{ id: null, name: v }])
        }, () => {
            this.refs.tagInput.input.value = '';
        })
    }

    geneColor() {
        let r = Math.ceil(Math.random() * (50+(Math.random()*200)));
        let g = Math.ceil(Math.random() * (50+(Math.random()*200)));
        let b = Math.ceil(Math.random() * (50+(Math.random()*200)));
        let a = Math.random();
        return { r, g, b, a }
    }

    renderItems = (key) => {
        return this.state[key].map((item, index) => {
            let { r, g, b, a } = this.geneColor();
            return (
                <div className="tagItem" key={index.toString()}
                    style={{    
                        borderColor: `rgba(${r},${g},${b},${a})`,
                        color: `rgb(${r},${g},${b})`,
                        boxShadow: `0 0 1px 1px rgba(${r},${g}, ${b},${a})`
                }}>
                    <span className="tagText"
                        style={{
                            color: `rgb(${r},${g},${b})`
                        }}>{item.name}</span>
                    <Icon type="close" className="tranScale" style={{ cursor: 'pointer'}} onClick={() => this.deleteItem(key, item.id || null, index)} />
                </div>
            )
        })
    }

    deleteItem = (type, id, index) => {
        let { tags, categories, delTags, delCates } = this.state;
        let delkey = type == 'tags' ? 'delTags' : 'delCates';
        if (id) {
            this.setState({
                [type]: this.state[type].filter(item => item.id != id),
                [delkey]: this.state[delkey] += id + ','
            })
        } else {
            this.setState({
                [type]: this.state[type].filter((item, i) => i !== index)
            })
        }
    }

    saveSetting = () => {
        let { tags, categories, delTags, delCates } = this.state;
        let st = tags.filter(item => !item.id);
        let sc = categories.filter(item => !item.id);

        server.post('/admin/saveTag', { tags: JSON.stringify(st), categories: JSON.stringify(sc), delTags: delTags.replace(/,$/, ''), delCates: delCates.replace(/,$/, '') }, () => {
            notification.success({
                message: '通知',
                description: '标签分类配置成功，快去写文章吧！',
                duration: 3,
                icon: <Icon type="smile-circle"/>,
                btn: <Button><a href={`/admin/write`}>去写文章</a></Button>
            })
        })
    }

    render() {
        return (
            <div className="tagsBox">
                <div className="headerLine">
                    {this.renderLabel('添加分类', <Input onPressEnter={this.setCategories} ref="cateInput" placeholder="按下enter键添加分类" />)}
                    {this.renderLabel('添加标签', <Input onPressEnter={this.setTags} ref="tagInput" placeholder="按下enter键添加标签" />)}
                </div>
                <div className="title">分类管理</div>
                <div className="itemsBox">{this.renderItems('categories')}</div>
                <div className="title">标签管理</div>
                <div className="itemsBox">{this.renderItems('tags')}</div>
                <div className="actionBox">
                    <Button type="primary" onClick={this.saveSetting}>保存配置</Button>
                </div>
            </div>
        )
    }
}
