import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import db from '../../lib/db';
import './index.css';

export default class CommmentApp extends Component {

    constructor() {
        super();
        this.state = {
            comments: [],
            showTime: true,
            dangerHtml: '<h5>标题5</h5>'
        }
    }


    componentWillMount() {
        this._loadComments();
    }

    _loadComments() {
        let comments = db.cacheData.get('comments');
        if (comments) {
            this.setState({ comments: JSON.parse(comments) });
        }
    }

    _saveComments(comments) {
        db.cacheData.set({ comments: JSON.stringify(comments) });
    }

    handleDeleteComment(index) {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        this._saveComments(comments)
    }

    handleSubmitComment(comment) {
        let { comments } = this.state;
        if (!comment) return;
        if (!comment.username) return alert('用户名！');
        if (!comment.content) return alert('内容！');
        comments.push(comment);
        this.setState({ comments });
        this._saveComments(comments);
    }

    handleToggleClock() {
        this.setState({ showTime: !this.state.showTime });
    }

    render() {
        return (
            <div className='wrapper'>
                <div dangerouslySetInnerHTML={{ __html: this.state.dangerHtml }}></div>
                <button onClick={this.handleToggleClock.bind(this)}>{this.state.showTime ? '隐藏' : '显示'}日期</button>
                {this.state.showTime ? this.props.children : ''}
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)} />
            </div>
        )
    }
}
