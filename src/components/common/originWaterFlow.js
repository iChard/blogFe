var flag = false;
var colsSortMin = [];
var maxHeight = 0;
// TODO:  已加载的不再修改
var container = document.getElementsByClassName('container')[0];
function generate() {
    for (var i = 0; i < list.length; i++) {
        loadImg(i);
    }
}

function loadImg(i) {
    var div = document.createElement('div');
    div.className = 'box';
    var img = new Image();

    img.className = 'img';

    img.addEventListener('load', function () {
        var h = img.clientHeight;
        var option = { width: 250 };
        var posObj = mathPosition(document.querySelector('.container'), option);
        div.className = 'box col-' + posObj.col;
        div.style.left = posObj.left + 'px';
        div.style.top = posObj.top + 'px';
        div.setAttribute('iNum', posObj.iNum)
        div.appendChild(img);
        container.appendChild(div);
    }, false);
    img.src = list[i].src;
}

/**
*@augments: option Object
* width: Number
**/
//先计算再插入
function mathPosition(container, option) {
    var ex = document.querySelectorAll('.box');
    var exLen = ex.length;
    var cWidth = container.clientWidth;//容器宽度
    var itemWidth = option.width || 250;
    var iNum = Math.floor(cWidth / itemWidth);//单行容量

    var obj;
    if (exLen < iNum) {//第一行
        obj = exLen ? {
            left: Number(ex[exLen - 1].style.left.split('px')[0]) + option.width + 10,
            top: 10,
            col: exLen,
            iNum: iNum
        } : { left: 10, top: 10, col: exLen, iNum: iNum }
    } else {
        //计算每一列总高度
        var cols = [];
        for (var i = 0; i < iNum; i++) {
            var o = {
                h: 0,
                col: 0,
                l: 0
            };
            //计算每一列总高度
            document.querySelectorAll('.col-' + i).forEach(function (item) {
                var it = Number(item.style.top.split('px')[0]);
                var ih = Number(item.clientHeight + 2);//2: border
                var il = Number(item.style.left.split('px')[0]);
                o.h = it + ih;
                o.col = i;
                o.l = il;
            })
            cols.push(o)
        }
        colsSortMin = cols.sort(function (a, b) { return a.h > b.h });
        console.log('colsSortMin:', colsSortMin);

        maxHeight = colsSortMin[colsSortMin.length - 1].h
        obj = {
            col: colsSortMin[0].col,
            top: colsSortMin[0].h + 10,
            left: colsSortMin[0].l,
            iNum: iNum
        }
    }
    exLen == list.length ? flag = true : flag = false;
    container.style.height = maxHeight + 'px';
    return obj;
}

/**
*@augments option Object
**/
function mathPosAll(container, option) {
    var ex = document.querySelectorAll('.box');
    var exLen = ex.length;
    var cWidth = container.clientWidth;//容器宽度
    var itemWidth = option.width || 250;
    var iNum = Math.floor(cWidth / itemWidth);//单行容量
    var exInum = ex[0].getAttribute('iNum');
    if (Number(iNum) != Number(exInum)) {
        ex.forEach(function (item, index) {
            clearNextAllClass(index);
            item.setAttribute('iNum', iNum);
            var line = Math.ceil((index + 1) / iNum);
            var next = {};
            if (index < iNum) {//第一行
                item.className = 'box col-' + index;
                item.style.top = '10px';
                item.style.left = index * (option.width + 10) + 'px';
            } else {
                // debugger;
                console.log('非第一行的元素index:', index);
                mathEachCol(item, index, { iNum: iNum });
            }
        })
    }
}

function clearNextAllClass(currentIndex) {
    var ex = document.querySelectorAll('.box');
    var exLen = ex.length;
    for (var i = currentIndex; i < exLen; i++) {
        ex[i].className = 'box';
    }
}

function mathEachCol(itemBox, itemIndex, option) {
    var iNum = option.iNum;//单行容量
    //计算每一列总高度
    var cols = [];
    var obj, colsSortMin;
    for (var i = 0; i < iNum; i++) {
        var o = {
            h: 0,
            col: 0,
            l: 0
        };
        //计算每一列总高度
        document.querySelectorAll('.col-' + i).forEach(function (cell) {
            var it = Number(cell.style.top.split('px')[0]);
            var ih = Number(cell.clientHeight + 2);//2: border
            var il = Number(cell.style.left.split('px')[0]);
            o.h = it + ih;
            o.col = i;
            o.l = il;
        })
        cols.push(o)
    }
    colsSortMin = cols.sort(function (a, b) { return a.h > b.h });
    console.log('colsSortMin:', colsSortMin);

    obj = {
        col: colsSortMin[0].col,
        top: colsSortMin[0].h + 10,
        left: colsSortMin[0].l
    }
    itemBox.style.left = obj.left + 'px';
    itemBox.style.top = obj.top + 'px';
    itemBox.className = 'box col-' + obj.col;
}

window.onload = generate;
window.onscroll = function () {
    var minH = colsSortMin[0].h;
    var scroT = document.documentElement.scrollTop || document.body.scrollTop;
    if (minH < (scroT + document.documentElement.clientHeight)) {
        console.log('onscroll');

        generate()
    }
};
window.onresize = function () {      //窗口改变也调用函数  
    var option = { width: 250 };
    mathPosAll(container, option);
}
import React, { Component } from 'react'
import "./waterFlow.css";