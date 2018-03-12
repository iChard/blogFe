import React, { Component } from 'react';
import PropTypes from 'prop-types';
import db from '../../lib/db';

export default class CommentInput extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }

    constructor() {
        super();
        this.state = {
            username: '',
            content: ''
        }
    }

    getLocalData() {
        let cacheData = db.cacheData.get();
        if(cacheData && cacheData.username) {
            this.setState({username: cacheData.username});
        }
    }

    setLocalData() {
        let {username} = this.state;
        db.cacheData.set({username})
    }

    componentWillMount() {
        this.getLocalData();
    }


    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit() {
        if(this.props.onSubmit) {
            const { username, content} = this.state;
            this.props.onSubmit({username, content, createdTime: +new Date()});
        }
        this.setState({content: ''})
    }

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            ref="name"
                            value={this.state.username}
                            onBlur={this.setLocalData.bind(this)}
                            onChange={this.handleUsernameChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref="content"
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button
                        onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
    
    componentDidMount() {
        let {content} = this.refs;
        content.focus();
    }
}
