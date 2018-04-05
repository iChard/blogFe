import React, { Component } from 'react'
import './waterFlow.css';

export default class WaterFlow extends Component {

    state = {
        isInit: false,
        width: 1000,
        itemWidth: 250,
        list: [],
        sortedNum: 0,
        iNum: 0,
        colTotal: [],//每一列的总高度
        colLeft: [],
        commonLeft: 0
    }

    componentWillReceiveProps(nextProps) {
        let { list, width, itemWidth } = nextProps;
        this.dealData({ list, width, itemWidth })
    }

    dealData = (obj) => {
        let { list, width, itemWidth } = obj;
        let { colTotal, isInit } = this.state;
        let exList = this.state.list;
        let filterSameList = this.filterSameList(list);
        list = (filterSameList || []).map(item => {
            return {
                src: item.src,
                left: 0,
                top: 0,
                ih: 0,//图片高度
                it: 0,//整个item高度
                col: 0,//列数
                loaded: false//是否定位完成
            }
        });
        let iNum = Math.floor((width || this.refs.containerWaterFlow.clientWidth) / itemWidth);
        width = width || this.refs.containerWaterFlow.clientWidth;
        itemWidth = itemWidth || 250;
        this.setState({
            list: exList.concat(list),
            width: width,
            itemWidth: itemWidth,
            iNum: iNum,
            colTotal: isInit ? colTotal : new Array(iNum).fill(0),
            commonLeft: (width - iNum * itemWidth) / 2
        })
    }

    filterSameList = (nlist) => {
        let list = this.state.list;
        let tl = nlist.filter(item => {
            let itemSameFlag = true;
            list.forEach(i => {
                if (i.src == item.src) {
                    itemSameFlag = false;
                    return;
                }
            })
            return itemSameFlag;
        })
        return tl;
    }

    //根据加载顺序优先定位  彼此间距为0
    mathPosition = (e, i) => {
        let { width, list, itemWidth, colTotal, colLeft, commonLeft } = this.state;
        let ih = Math.ceil(e.target.clientHeight);
        let it = ih + 10;//10为padding*2
        let iNum = Math.floor(width / itemWidth);
        list[i].iHeight = Math.ceil(e.target.clientHeight);
        let loadedItems = list.filter(item => item.loaded);
        let loadedLen = loadedItems.length;
        let obj;
        if (loadedLen < iNum) {//第一行
            obj = {
                left: loadedLen * itemWidth + commonLeft,
                top: 0,
                ih: ih,
                it: it,
                col: loadedLen,
                loaded: true,
                padding: commonLeft
            }
            colTotal[loadedLen] = it;
            colLeft[loadedLen] = loadedLen * itemWidth + commonLeft;
            this.setState({ isInit: true })
        } else {
            let allCol = [];
            let colTotal = [];
            let sortCol = [];
            for (let i = 0; i < iNum; i++) {
                allCol[i] = loadedItems.filter(item => item.col === i);//统计每一列的item数组
                colTotal.push({ col: i, total: 0 });
            }
            allCol.forEach((items, index) => {
                items.forEach(item => {
                    colTotal[index].total += item.it;
                })
            })
            sortCol = colTotal.sort((a, b) => a.total > b.total);//由小到大排序
            obj = {
                left: allCol[sortCol[0].col][0].left,
                top: sortCol[0].total,
                ih: ih,
                it: it,
                col: sortCol[0].col,
                loaded: true,
                padding: commonLeft
            }
        }
        colTotal[obj.col] = obj.top + obj.it;
        list[i] = Object.assign({}, list[i], obj);
        this.setState({ list });
    }

    _scrollWindow = () => {
        let { pullMore } = this.props;
        console.log('121212');
        
    }

    _resizeWindow = () => {
        let { itemWidth, iNum, colTotal, colLeft, width, list, commonLeft } = this.state;
        let newWidth = this.refs.containerWaterFlow.clientWidth;
        let newInum = Math.floor(newWidth / itemWidth);
        if (newInum != iNum) {
            this.setState({
                iNum: newInum,
                width: newWidth,
                colTotal: newInum > iNum ? colTotal.concat(new Array(newInum - iNum).fill(0)) : colTotal.splice(0, newInum),
                commonLeft: (width - iNum * itemWidth) / 2
            }, () => {
                this.reMathPosition(newInum > iNum)
            })
        } else {
            //仅修改边距
            let lastMinLeft = Math.min.apply(null, colLeft);
            commonLeft = (width - iNum * itemWidth) / 2;
            list = list.map(item => {
                item.left = (item.left - item.padding + commonLeft);
                item.padding = commonLeft;
                colLeft[item.col] = item.left;
                return item;
            })
            this.setState({ list, commonLeft, colLeft, width: newWidth });
        }
    }

    //isStretch  是否是延伸
    reMathPosition = (isStretch) => {
        let { list, iNum, width } = this.state;
        let needChangeCols = list.filter(item => item.col && (item.col >= iNum));//需修改布局
        let loadedItems = list.filter(item => item.col && (item.col < iNum));//无需修改布局
        let p = { needChangeCols, loadedItems };
        isStretch ? this.widthStretch(p) : this.widthShrink(p);
    }

    //iNum变小时  超过的迁移
    widthShrink = (p) => {
        let { list, iNum, width, colTotal, colLeft, itemWidth, commonLeft } = this.state;
        let { needChangeCols, loadedItems } = p;
        commonLeft = (width - iNum * itemWidth) / 2;
        list = list.map((item, index) => {
            let minIndex = colTotal.indexOf(Math.min.apply(null, colTotal));
            item.left = (item.left - item.padding + commonLeft);
            item.padding = commonLeft;
            colLeft[item.col] = item.left;
            if (item.col >= iNum) {
                item = Object.assign({}, item, {
                    left: colLeft[minIndex],
                    top: colTotal[minIndex],
                    col: minIndex,
                    loaded: true
                })
                colTotal[item.col] += item.it;
            }
            return item;
        })
        this.setState({ list, commonLeft, colLeft, colTotal });
    }

    // iNum变大时  list, commonLeft, colLeft
    // 方式一：依次从之前的col取最长item迁移到新增列的由上往下位置   当iNum增长数目超过1时  TODO:后续
    // 方式二：整个重新计算
    widthStretch = (p) => {
        let { list, iNum, width, colTotal, colLeft, itemWidth, commonLeft } = this.state;
        let { needChangeCols, loadedItems } = p;
        commonLeft = (width - iNum * itemWidth) / 2;
        list = list.map((item, i) => {
            if (i < iNum) {//第一行
                item = Object.assign({}, item, {
                    left: i * itemWidth + commonLeft,
                    top: 0,
                    col: i,
                    padding: commonLeft
                })
                colTotal[i] = item.it;

                colLeft[i] = i * itemWidth + commonLeft;
            } else {
                let minIndex = colTotal.indexOf(Math.min.apply(null, colTotal));
                item = Object.assign({}, item, {
                    left: colLeft[minIndex],
                    top: colTotal[minIndex],
                    col: minIndex,
                    padding: commonLeft
                })
                colTotal[minIndex] += item.it;
            }
            return item;
        })
        this.setState({ list, commonLeft, colLeft, colTotal });
    }

    renderItem = () => {
        let { list, itemWidth } = this.state;
        return list.map((item, index) => (
            <div className="waterflow-item" style={{ top: item.top + 'px', left: item.left + 'px' }} key={item.src}>
                <img style={{ width: (itemWidth - 10) + 'px' }} src={item.src} alt={index} onLoad={(e) => this.mathPosition(e, index)} onError={(e) => this.loadImgError(e, index)} />
            </div>
        ))
    }

    render() {
        let { colTotal } = this.state;
        return (
            <div onScroll={this._scrollWindow.bind(this)} className="container containerWaterFlow" ref="containerWaterFlow" style={{ height: Math.max.apply(null, colTotal) + 'px' }}>
                {this.renderItem()}
            </div>
        )
    }

    loadImgError = (e, i) => {
        console.log(`第${i}张图片加载错误`);
    }

    componentDidMount() {
        let { list, width, itemWidth } = this.props;
        this.dealData({ list, width, itemWidth });
        window.addEventListener('resize', this._resizeWindow.bind(this))
        // window.addEventListener('scroll', this._scrollWindow.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resizeWindow.bind(this))
        // window.removeEventListener('scroll', this._scrollWindow.bind(this))
    }

}
