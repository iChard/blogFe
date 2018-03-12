import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class CommentList extends Component {

    handleDeleteComment(index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return (
            <div>
                {this.props.comments.map((comment, i) => <Comment comment={comment} key={i} index={i} onDeleteComment={this.handleDeleteComment.bind(this)}/>)}
            </div>
        )
    }
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    onDeleteComment: PropTypes.func
}

CommentList.defaultProps = {
    comments: [{
        username: '测试发布',
        content: '文案'
    }]
}

export default CommentList;