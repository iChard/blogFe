import React, { Component } from 'react';
import Editor from 'tui-editor';
import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import utils from '../../utils/utils';
import server from '../../lib/server';
import './index.css';

class ArticleItem extends Component {

    state = {
        id: utils.getQueryObj().id,
        detail: {}
    }
    
    componentWillMount() {
        this.fetchArticle();
    }

    fetchArticle = () => {
        let {id} = this.state;
        server.get(`/article/${id}`, {}, data => {
            this.setState({detail: data});
            this.renderMain(data)
        })
    }

    renderMain = (data) => {
        var viewer = new Viewer({
            el: this.refs.articleitembox,
            viewer: true,
            initialValue: data.content.split('--more--').join('\n')
        })
    }

    addComment = (comment) => {
        let {detail} = this.state;
        console.log('comment', comment);
        console.log('{comments: [comment].concat(detail.comments)}:', {comments: [comment].concat(detail.comments)});
        
        this.setState({detail: Object.assign({}, detail, {comments: [comment].concat(detail.comments)})})
    }

    deleteComment = (id) => {
        let {detail} = this.state;
        server.del('/comments/delete/'+id, '', () => {
            console.log('131213');
            this.setState({detail: Object.assign({}, detail, {comments: detail.comments.filter(item => item.id != id)})})
        })
    }

    render() {
        let {detail} = this.state;
        return (
            <div>
                <div ref="articleitembox" className="article-view-item"></div>
                <div className="comments-area">
                    <CommentEditor update={this.addComment} articleId={this.state.id}/>
                    <Comments list={detail.comments || []} deleteComment={(id) => this.deleteComment(id)}/>
                </div>
            </div>
        )
    }
}

class Comments extends Component {

    renderItem = (item) => {
        return (
            <div className='comment' key={item.id}>
                <div className='comment-user'>
                    <span>{item.authorName}</span>：
                </div>
                <p>{item.comments}</p>
                <span className='comment-createdtime'>
                {item.created}
                </span>
                <span
                    onClick={() => this.props.deleteComment(item.id)}
                    className='comment-delete'>
                    删除
                </span>
            </div>
        )
    }

    render() {
        let {list} = this.props;
        return (
            <div>
                {list.map(item => this.renderItem(item))}
            </div>
        )
    }
}


class CommentEditor extends Component {

    state = {
        comment: ''
    }

    subComment = () => {
        let {comment, id} = this.state;
        let {update, articleId} = this.props;
        server.post('/comments/posts', {articleId: articleId, comment, created: new Date().getTime()}, (res) => {
            update && update({...res})
        })
    }

    render() {
        return (
            <div className="comment-editor">
                <textarea name="" id="" cols="30" rows="10" placeholder="写下你的评论" onChange={(e) => this.setState({comment: e.target.value})}></textarea>
                <div className="comment-editor-block">
                    <span></span>
                    <div>
                        <a className="btn btn-cancel">取消</a>
                        <a className="btn btn-blue btn-sure" onClick={this.subComment}>发送</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default ArticleItem;
