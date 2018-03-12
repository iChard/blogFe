## jsx就是javascript对象
> 通过javascript对象描述html
> JSX-->js对象--->DOM--->ReactDom.render插入页面

1. jsx只是js的一种语言扩展
2. react可以用jsx描述html
3. jsx在编译时会被编译成相应的js对象描述
4. 最后由react-dom将上述的js对象描述转换成dom并通过render插入到页面

## 关键字
1. class==>className
2. for ===> htmlFor

1. 数据是在组件树内自上往下。
2. 事件需要通过bind(this)的方式绑定到当前实例 （执行事件时react不是通过对象方法的方式调用事件处理，而是直接调用事件处理函数，因此并不知道当前所属的环境及this）

```js
    //承接上一步计算过的state
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    //多次setState并不会多次重新渲染组件，而是在一个队列中记录setState的记录，一次渲染
```

3. 函数式组件
4. 组件渲染、构造DOM元素并插入到页面的过程叫组件的挂载
5. 自定义组件容器
6. `<div dangerouslySetInnerHTML={{__html: this.state.dangerHtml}}></div>`

### 样式
```html
  <h1 style={{fontSize: '12px', color: 'red'}}></h1>
````
> markdown 样式
> github-markdown-css

## React-router
1. hashHistory现在在react-router-dom包里面