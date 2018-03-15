import reqwest from 'reqwest';
import {Modal} from 'antd';

var fullUrl = (url) => {
    return '/api'+(url || '');
}

var com = (url, method, data={}, cb) => {
    reqwest({
        url: url,
        method: method,
        data: data,
        crossOrigin: true,
        success: (json) => apiHandle(json, cb)
    })
}

var apiHandle = (res, cb) => {
    if(res.result && /^1\d{2}$/.test(res.result)) {
        cb && cb(res.data)
    }else if(res.result && res.result === 700) {
        Modal.warning({
            title: '温馨提示！',
            content: '您还没有登录或者登录失效，点击确认跳转到登录页面！',
            width: 416,
            okText: '确定',
            onOk: () => {
                console.log('重新登录！');
                
                window.location.href = '/login'
            }
        })
    }else {
        Modal.warning({
            title: '温馨提示',
            content: res.message || '接口错误！'
        })
    }

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

export default {
    get: (url, data, cb) => get(url, data, cb),
    post: (url, data, cb) => post(url, data, cb),
    del: (url, cb) => del(url, cb)
}