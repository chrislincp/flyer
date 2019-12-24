# Dialog

弹窗提示

### 示例代码

```javascript
  onPress() {
    Dialog.alert('some tips')
  }


  render() {
    return (
      <Touch 
        onPress={() => this.onPress()}
        >
        <Text>Show dialog</Text>
      </Touch>
    )
  }

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `type` | 弹窗类型 alert确定  confirm 提示 | `[ alert, confirm ]` | alert |
| `title` | 弹窗标题 | `string / node` | 提示 |
| `content` | 弹窗内容 | `string / node` | - |
| `okText` | 确定按钮文字 | `string` | 确定 |
| `showClose` | 显示关闭按钮 | `bool` | false |
| `cancelText` | 取消按钮文字  | `string` | 取消 |
| `onClose` | 关闭时的回调函数 | `( ) => void` | - |
| `onCancel` | 取消时的回调函数 | `( ) => void` | - |
| `onOk` | 确定时的回调函数 | `(val: object) => void` | `-` |
| `okStyle` | 确定按钮样式 | `object` | `-` |
| `okTextStyle` | 确定按钮文字样式 | `object` | `-` |
| `cancelStyle` | 取消按钮样式 | `object` | `-` |
| `cancelTextStyle` | 取消按钮文字样式 | `object` | `-` |
| `footer` | 自定义底部样式 | `node` | `-` |


### methods列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `confirm` | 通过 Dialog.confirm 方法调用, 参数opt参考api | `( opt: object / string ) => void ` | - |
| `alert` | 通过 Dialog.alert 方法调用, 参数opt参考api | `( opt: object / string ) => void ` | - |




