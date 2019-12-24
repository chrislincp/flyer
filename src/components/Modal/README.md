# Modal

模态框Modal组件

### 示例代码

```javascript
  render() {
    return (
      <Modal>
        {...}
      </Modal>
    )
  }

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `visible` | 是否显示模态框 | ` bool` | false |
| `animationType` | 动画类型 | `none(没有)| fade（渐隐渐显）| slide（从底部出现）| slide-down（从顶部出现）| slide-left（从左侧出现）| slide-right（从右侧出现）| scale(放缩) | fade_scale(渐隐渐现放缩)|alert(弹窗)` | alert |
| `animationDuration` | 动画时长 单位毫秒 | ` number` | 200 |
| `maskClosable` | 点击遮罩是否可关闭 | ` bool` | true |
| `animateWhenMount` | 默认加载动画 | ` bool` | false |
| `springEffect` | 是否有弹簧效果 | ` bool` | false |
| `onClose` | 关闭回调 | ` () => void` | - |
| `onAnimationEnd` | 动画结束回调 | ` () => void ` | - |
| `onAnimationEnd` | 动画结束回调 | ` () => void ` | - |
| `style` | Modal样式 | ` object ` | - |
| `maskStyle` | 阴影样式 | ` object ` | - |
| `bodyStyle` | 内容样式 | ` object ` | - |
| `offset` | 偏移距离 | ` number ` | 0 |


### methods列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `show` | 通过 Modal.show 方法调用, 参数opt参考api | `( opt: object ) => void` | - |
| `hide` | 通过 Modal.hide 方法调用, 手动关闭modal | `( ) => void` | - |

