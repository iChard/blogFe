import hljs from 'highlight.js';
// import hljs from "../../lib/highlight";
import {getLanguage,highlight} from 'highlight.js'
var Remarkable = require('remarkable');

const md = new Remarkable('full', {
    html: false,
    xhtmlOut: true,
    breaks: true,
    labgPrefix: 'language-',
    linkify: true,
    typographer: false,
    quotes: '“”‘’'
    ,
    highlight: function (str, lang) {
        if(lang && hljs.getLanguage(lang)) {
            try{
                return hljs.highlight(lang, str).value;
            } catch(__) {}
        }

        try {
            return hljs.highlight(str).value;
        } catch(__) {}

        return ''
    }
})

export default md;
