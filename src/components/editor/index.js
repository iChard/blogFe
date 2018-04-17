import React, { Component } from 'react';
import SimpleMDE from 'simplemde';
import editorConfig from '../common/editorConf';
import './index.css';

class Editor extends Component {

    state = {
        mdVal: '',
        isFullScreen: false,
        value: ''
    }
    
    componentWillReceiveProps(newProps) {
        this.setState({value: newProps.value})
    }

    renderEditor = () => {
        let { toggleFull, value } = this.props;
        const handleToggleFullscreen = () => {
            this.simplemde.toggleFullScreen();
            toggleFull && toggleFull(this.simplemde.isFullscreenActive() || false);
            this.setState({ isFullScreen: this.simplemde.isFullscreenActive() || false });
        }
        const handleToggleSideToSide  =() => {
            this.simplemde.toggleSideBySide();
            handleToggleFullscreen();
        }

        let econf = editorConfig(SimpleMDE,Object.assign({}, {
            element: this.refs.textarea,
        }, value ?  {
            initialValue: value
        } : {}));
        econf.toolbar.splice(-3, 2, {
            name: 'side-by-side',
            action: handleToggleSideToSide,
            className: 'fa fa-columns no-disable no-mobile',
            title: 'side-by-side'
        }, {
            name: "fullscreen",
            action: handleToggleFullscreen,
            className: "fa fa-arrows-alt no-disable no-mobile",
            title: "Toggle Fullscreen"
        });
        this.simplemde = new SimpleMDE(econf);
        this.simplemde.codemirror.on('change', () => {
            this.handleChange(this.simplemde.value());
        })
    }

    handleChange = (v) => {
        let { onChange } = this.props;
        this.setState({ mdVal: v });
        onChange && onChange(v);
    }

    render() {
        return <textarea ref='textarea' id='ichard-blog-editor'></textarea>
    }

    componentDidMount() {
        this.renderEditor();
    }
}

export default Editor;
