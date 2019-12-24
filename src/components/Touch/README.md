# Touch
点击触控组件

### 示例代码

```javascript
  <Touch onPress={() => {...}}>
    {...}
  </Touch>

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `noDebounce` | 是否防重复点击 | `bool` | false |

其他参数参考react-native TouchableOpacity组件


## 埋点特殊设置

### 针对点击做埋点处理  新增actionId、actionType 分别对应埋点数据字段的e_id 和b_t