var reqwest = require('reqwest');

var fullUrl = (url) => {
    return '/api'+(url || '');
}

var com = (url, method, data={}, cb) => {
    reqwest({
        url: url,
        method: method,
        data: data,
        crossOrigin: true,
        success: (json) => {
            if(json.result && /^1\d{2}$/.test(json.result)) {
                cb && cb(json.data)
            } else {
                alert(json.message)
            }
        }
    })
}

var strJoinObj = (url='', obj={}) => {
    let query = '';
    for(let key in obj) {
        query += key+'='+obj[key] + '&'
    }

    if(url.indexOf('?') > -1){
        url += '&'+query
    }else{
        url += '?'+query
    }
    return url.replace(/&$/, '')
}

var get = (url, data={}, cb) => {
    url = strJoinObj(url, data);
    
    
    return com(fullUrl(url), 'get', '', cb);
}
var post = (url, data={}, cb) => {
    return com(fullUrl(url), 'post', data, cb);
}
var del = (url, cb) => {
    return com(fullUrl(url), 'delete', {}, cb);
}

module.exports = {
    get: (url, data, cb) => get(url, data, cb),
    post: (url, data, cb) => post(url, data, cb),
    del: (url, cb) => del(url, cb)
}