# Popup

Popup组件

### 示例代码

```javascript
  showPopup() {
    const opt = {
      position: 'bottom'
    }

    Popup.show(opt)
  }

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `position` | 出现的位置 | `top | bottom | left | right` | bottom |
| `offset` | 偏移量 | `number` | 0 |
| `style` | 通过style设置popup宽高 | `object` | - |
| `onClose` | 关闭回调 | `( ) => void` | - |


### methods列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `show` | 通过 Popup.show 方法调用, 参数opt参考api | `( opt: object ) => void` | - |
| `hide` | 通过 Popup.hide 方法调用, 手动关闭Popup | `( ) => void` | - |

