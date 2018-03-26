import reqwest from 'reqwest';
import { Modal, notification } from 'antd';

var fullUrl = (url) => {
    return '/api' + (url || '');
}

var com = (url, method, data = {}, cb, errCb) => {
    let ip = window.returnCitySN && window.returnCitySN.cip;
    reqwest({
        url: url,
        method: method,
        data: data,
        type: 'json',
        crossOrigin: true,
        headers: Object.assign({}, ~url.indexOf('/admin') ? { ip } : {}),
        success: (json) => apiHandle(json, cb, errCb)
    })
}

var apiHandle = (res, cb, errCb) => {
    if (res.result && /^1\d{2}$/.test(res.result)) {
        cb && cb(res.data)
    } else if (res.result && res.result === 700) {
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
    } else if (res.result && res.result === 300) {
        notification.info({
            message: '提示',
            description: res.message || '非管理员不能修改！',
            duration: 3
        })
        errCb && errCb();
    } else {
        Modal.warning({
            title: '温馨提示',
            content: res.message || '接口错误！'
        })
    }

}

var strJoinObj = (url = '', obj = {}) => {
    let query = '';
    for (let key in obj) {
        query += key + '=' + obj[key] + '&'
    }

    if (url.indexOf('?') > -1) {
        url += '&' + query
    } else {
        url += '?' + query
    }
    return url.replace(/&$/, '')
}

var get = (url, data = {}, cb, errCb) => {
    url = strJoinObj(url, data);


    return com(fullUrl(url), 'get', '', cb, errCb);
}
var post = (url, data = {}, cb, errCb) => {
    return com(fullUrl(url), 'post', data, cb, errCb);
}
var del = (url, cb, errCb) => {
    return com(fullUrl(url), 'delete', {}, cb, errCb);
}


var originAjax = (url, method) => {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        // xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readState == 4 && xmlhttp.status == 200) {
            console.log('xmlhttp:', xmlhttp.responseText);
        }
    }
    console.log('223434234324');

    xmlhttp.open(method, url, true);
    // xmlhttp.setRequestHeader('');
    xmlhttp.send();
}

/* //获取本机的网络ip地址
function jsonpCallback(res) {
    var ip = res.Ip;    // ip地址
    var aa = res.Isp.split("市");
    var isp = aa[0];    // ip省份
    alert(ip);
}

function getIntnetIP() {
    var JSONP=document.createElement("script");
    JSONP.type="text/javascript";
    JSONP.src="http://chaxun.1616.net/s.php?type=ip&v=&output=json&callback=jsonpCallback";
    document.getElementsByTagName("head")[0].appendChild(JSONP);
}
getIntnetIP();

let initIp = () => {
    return com('http://ip.chinaz.com/getip.aspx', 'get')
}
initIp(); */

export default {
    get: (url, data, cb, errCb) => get(url, data, cb, errCb),
    post: (url, data, cb, errCb) => post(url, data, cb, errCb),
    del: (url, cb, errCb) => del(url, cb, errCb),
    // init:
}