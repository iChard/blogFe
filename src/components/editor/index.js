import React, { Component } from 'react';
// import SimpleMDE from 'react-simplemde-editor';
import SimpleMDE from 'simplemde';
import server from '../../lib/server';
import MdParser from '../common/mdParser';
import './index.css';

class Editor extends Component {

    state = {
        mdVal: '',
        isFullScreen: false
    }

    renderEditor = () => {
        let { toggleFull } = this.props;
        const handleToggleFullscreen = () => {
            simplemde.toggleFullScreen();
            toggleFull && toggleFull(simplemde.isFullscreenActive() || false);
            this.setState({ isFullScreen: simplemde.isFullscreenActive() || false });
        }
        const handleToggleSideToSide  =() => {
            simplemde.toggleSideBySide();
            handleToggleFullscreen();
        }
        var simplemde = new SimpleMDE({
            element: document.getElementById('ichard-blog-editor'),
            placeholder: '正文...',
            tabSize: 4,
            indentWithTabs: true,
            previewRender: (v) => MdParser.render(v),
            toolbar: [{
                name: "bold",
                action: SimpleMDE.toggleBold,
                className: "fa fa-bold",
                title: "Bold",
            }, {
                name: 'italic',
                action: SimpleMDE.toggleItalic,
                className: 'fa fa-italic',
                title: 'italic'
            }, {
                name: 'strikethrough',
                action: SimpleMDE.toggleStrikethrough,
                className: 'fa fa-strikethrough',
                title: 'strikethrough'
            }, {
                name: 'heading',
                action: SimpleMDE.toggleHeadingSmaller,
                className: 'fa fa-header',
                title: 'heading'
            }, {
                name: 'code',
                action: SimpleMDE.toggleCodeBlock,
                className: 'fa fa-code',
                title: 'code'
            }, {
                name: 'quote',
                action: SimpleMDE.toggleCodeBlock,
                className: 'fa fa-quote-left',
                title: 'quote'
            }, {
                name: 'unordered-list',
                action: SimpleMDE.toggleUnorderedList,
                className: 'fa fa-list-ul',
                title: 'unordered-list'
            }, {
                name: 'ordered-list',
                action: SimpleMDE.toggleOrderedList,
                className: 'fa fa-list-ol',
                title: 'ordered-list'
            }, {
                name: 'clean-block	',
                action: SimpleMDE.cleanBlock,
                className: 'fa fa-eraser fa-clean-block',
                title: 'clean block'
            }, {
                name: 'link',
                action: SimpleMDE.drawLink,
                className: 'fa fa-link',
                title: 'link'
            }, {
                name: 'image',
                action: SimpleMDE.drawImage,
                className: 'fa fa-picture-o',
                title: 'image'
            }, {
                name: 'table',
                action: SimpleMDE.drawTable,
                className: 'fa fa-table',
                title: 'table'
            }, {
                name: 'horizontal-rule	',
                action: SimpleMDE.drawHorizontalRule,
                className: 'fa fa-minus',
                title: 'horizontal-rule'
            }, {
                name: 'preview',
                action: SimpleMDE.togglePreview,
                className: 'fa fa-eye no-disable',
                title: 'preview'
            }, {
                name: 'side-by-side',
                action: handleToggleSideToSide,
                className: 'fa fa-columns no-disable no-mobile',
                title: 'side-by-side'
            }, {
                name: "fullscreen",
                action: handleToggleFullscreen,
                className: "fa fa-arrows-alt no-disable no-mobile",
                title: "Toggle Fullscreen"
            }, {
                name: 'guide',
                action: 'https://simplemde.com/markdown-guide',
                className: 'fa fa-question-circle'
            }]
        });
        simplemde.codemirror.on('change', () => {
            this.handleChange(simplemde.value());
        })
    }

    handleChange = (v) => {
        let { onChange } = this.props;
        let { isFullScreen } = this.state;
        this.setState({ mdVal: v });
        onChange && onChange(v);
    }

    renderComponent() {
        return (
            <SimpleMDE
                onChange={this.handleChange}
                value={this.state.mdVal}
                options={{
                    placeholder: '哈哈哈',
                    tabSize: 4,
                    indentWithTabs: true,
                    previewRender: (v) => MdParser.render(v)
                }}
            />
        )
    }

    render() {
        return <textarea id='ichard-blog-editor'></textarea>
    }

    componentDidMount() {
        this.renderEditor();
    }

}

export default Editor;
