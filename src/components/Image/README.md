# Image

图片组件

### 示例代码

```javascript
  render() {
    return (
      <Image source={...} />
    )
  }

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `onPress` | 点击图片事件 | `() => void` | - |
| `showDetail` | 是否显示图片预览, 不支持本地图片预览,即source={require('...')} | `bool` | false |

其他参数设置参考react-native 官网  Image组件


### methods列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `show` | 手动调用显示图片预览 | `(data = [], index = 0) => void` | - |


