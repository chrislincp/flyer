# Button

按钮Button组件

### 示例代码

```javascript
  onPress() {
    
  }

  render() {
    return (
      <Button title="button" onPress={() => this.onPress()} />
    )
  }

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `title` | 按钮标题 可自定义内容 | `string / node` | - |
| `onPress` | 点击事件 | `( ) => void ` | - |
| `disabled` | 是否禁用 | `bool` | false |
| `titleStyle` | title为string时  title的样式 | `object` | - |


