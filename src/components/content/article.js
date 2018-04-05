import React, { Component } from 'react';
import utils from '../../utils/utils';
import server from '../../lib/server';
import './index.css';
import MdParser from '../common/mdParser';

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
        })
    }

    addComment = (comment) => {
        let {detail} = this.state;
        this.setState({detail: Object.assign({}, detail, {comments: [comment].concat(detail.comments)})})
    }

    deleteComment = (id) => {
        let {detail} = this.state;
        server.del('/comments/delete/'+id, '', () => {
            this.setState({detail: Object.assign({}, detail, {comments: detail.comments.filter(item => Number(item.id) !== Number(id))})})
        })
    }

    render() {
        let {detail} = this.state;
        // console.log('', React.createElement());
        
        return (
            <div>
                <div className="article-view-item">
                    <h1 className="artitle-title">{detail.title}</h1>
                    <div ref="articleitembox" dangerouslySetInnerHTML={{__html: utils.escapeHtml(MdParser.render(detail.content))}}></div>
                </div>
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
        let {comment} = this.state;
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
