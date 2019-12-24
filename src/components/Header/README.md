# Header

顶部导航栏

### 示例代码

```javascript
  render() {
    return (
      <Header title="首页" />
    )
  }

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `height` | 导航高度 | `number` | 44 |
| `backgroundColor` | 背景色 | `string ` | white |
| `title` | 标题 | `string / node` | - |
| `centerStyle` | 中间外层样式 | `object` | - |
| `left` | 左侧自带后退功能 | `node` | - |
| `leftStyle` | `左侧外层样式` | `node` | - |
| `leftPress` | `替换左侧默认后退事件` | `() => void` | - |
| `right` | `右侧node元素` | `node` | - |
| `rightStyle` | `又侧外层样式` | `node` | - |
| `translucent` | `是否透明` | `bool` | false |
| `opacityConf` | `当translucent 为true时， opacity映射范围` | `array` | [10, 170] |



