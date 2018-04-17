var hljs = require('./highlight');

hljs.registerLanguage('css', require('./languages/css'));
hljs.registerLanguage('markdown', require('./languages/markdown'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('json', require('./languages/json'));
hljs.registerLanguage('less', require('./languages/less'));
hljs.registerLanguage('nginx', require('./languages/nginx'));
hljs.registerLanguage('scss', require('./languages/scss'));
hljs.registerLanguage('sql', require('./languages/sql'));

module.exports = hljs;
