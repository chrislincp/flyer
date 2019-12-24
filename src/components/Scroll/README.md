# Scroll

滚动组件

### 示例代码

```javascript
  <Scroll>
    {...}
  </Scroll>

```

## API

### props列表
属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `onRefresh` | 监听开始刷新 只有设置了该方法才会启用下拉刷新功能 可以通过ref手动调用内部startRefresh 和finishRefresh方法 | `event => void` | null |

参数参考react-native ScrollView 组件
