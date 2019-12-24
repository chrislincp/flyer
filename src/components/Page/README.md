##  Page使用文档

###  保证所有的页面继承Page
```javascript
  export const Test extends Page {
    ...
  }
```


###  Page集成的内容
Page 集成了以下功能：

router: 对于继承Page的页面可以通过this.router进行页面的导航功能 

```javascript
this.router.push('Test'))
```

navParams: 通过this.navParams 获取其他页面传递的参数

```javascript
console.log(this.navParams)
```

screenState: 当前页面状态

```javascript
  // screenState 状态: ['success', 'loading', 'error', 'offline']
  //  默认情况下你可以不需要在你的页面设置screenState
  //  设置为success将会渲染你页面的内容
  //  设置loading将会在你的页面显示加载页内容
  //  设置error将会在你的页面显示错误页内容
  //  设置offline将会在你的页面显示断网页内容

  //  你也可以通过_renderLoading、_renderError、_renderOffline 重写你的页面的对应状态页样式
  this.state = {
    screenState: 'success'
  }
```

_render: 一般情况下，你需要在_render函数内编写你的页面元素内容，_render 函数默认会在你的页面元素外层包裹一个Scroll，如果有特殊情况请使用_renderBase

_renderBase: 对不需要Scroll包裹的页面使用_renderBase


```javascript
// 正常情况下请使用 _render
_render() {
  return (
    <View>
      {...}
    </View>
  )
}

//  其他特殊情况可使用 _renderBase

_renderBase() {
  return (
    <View>
      {...}
    </View>
  )
}

//  你可以通过_renderProps来对你的页面外层元素传递参数配置
_renderProps() {
  return {}
}

```

Header: 所有继承Page的页面会自带Header，Header会置于页面顶部，如果想配置Header参数请通过_headerProps 方法暴露参数对象, 如果要自己实现Header，可通过_renderHeader方法重写Header

_headerProps: 对当前页面的Header进行配置，必须return一个对象

_renderHeader: 页面Header的渲染函数

```javascript
_headerProps() {
  //  header具体参数查看Header组件
  return {
    title: '测试页面',
    {...}
  }
}

_renderHeader() {
  //  你也可以通过_renderHeader方法重写你的页面Header
  return <Header />
}

```


_safeAreaInset: 默认情况下，对于全面屏机型Page会设置一个底部的安全距离，不需要单独做全面屏底部的适配，如果需要去除安全距离，请使用_safeAreaInset

```javascript
_safeAreaInset() {
  return {
    bottom: 'never',
  }
}
```


### 生命周期 

mounted: 使用mounted代替react componentDidMount 生命周期
unmount: 使用unmount代替react componentWillUnmount 生命周期

onWillFocus: 处于当前页面的时候回触发该方法
onWillBlur：离开当前页的时候会触发该方法


```javascript
mounted() {
  // do something
}

unmount() {
  // do something
}

onWillFocus() {
  console.log('focus')
}

onWillBlur() {
  console.log('blur')
}

```



