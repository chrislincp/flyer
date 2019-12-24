# Input

Input组件

### 示例代码

```javascript
  render() {
    return (
      <Input value={...} />
    )
  }

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `value` | 绑定值 | `string / number` | - |
| `style` | 输入框外层样式 | `object` | - |
| `inputStyle` | 输入框样式 | `object` | - |
| `multiline` | 是否多行输入 | `bool` | false |
| `placeholderTextColor` | placeholder颜色 | `string` | 主题色 |
| `clear` | 是否显示清空按钮 | `bool` | false |
| `disabled` | 是否禁用 | `bool` | false |
| `onChangeText` | 输入回调 | `(val) => void` | - |
| `onFocus` | 聚焦回调 | `() => void` | - |
| `onBlur` | 失焦回调 | `() => void` | - |
| `left` | 自定义输入框左侧样式 | `node` | - |
| `right` | 自定义输入框右侧样式 | `node` | - |

其他参数设置参考react-native 官网  TextInput组件


