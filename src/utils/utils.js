function getQueryObj(url) {
    url = url || window.location.href;
    let o = {};
    let sa = url.split('?')[1];
    let item = sa.split('&');
    for(let i = 0;i < item.length;i++) {
        o[item[i].split('=')[0]] = item[i].split('=')[1]
    }
    return o;
}

function escapeHtml(htmlStr) {
    return (htmlStr ? (htmlStr+'') : '').replace(/<script>/g, '<!--').replace(/<\/script>/g, '-->');
}

module.exports = {
    getQueryObj,
    escapeHtml
}