# CkList

长数据列表

### 示例代码

```javascript
  <CkList 
    service={...} 
    params={...} 
    renderItem={item => this.renderItem(item)} 
    />
```

## API

### props列表
属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `renderItem` | 列表每项的渲染函数 | `item => void` | null |
| `renderHeader` | 列表头部的渲染函数 | `() => void` | null |
| `renderSeparator` | 列表每项分割线的渲染函数 参考FlatList ItemSeparatorComponent | `() => void` | null |
| `keyExtractor` | key值设置  默认为每项的下标 可自定义覆盖 | `() => void` | null |
| `onEndReachedThreshold` | 距离底部多少触发上拉加载 参考 FlatList onEndReachedThreshold | `number` | 0.2 |
| `onScroll` | 监听滚动 | `event => void` | null |
| `service` | 请求方法 必填 | `func` | null |
| `pageSize` | 每页请求数据长度 | `number` | 10 |
| `params` | 请求参数 | `object` | {} |
| `convertData` | 请求结果返回值处理函数 必须return Array | `res => void` | res => res.data |
| `mountLoad` | 是否默认加载 | `bool` | true |
| `onStatus` | 状态变更触发 | `(status) => void` | null |
| `renderEmpty` | 空数据页面渲染函数 | `() => void` | null |
| `renderError` | 请求错误页面渲染函数 | `() => void` | null |
| `renderOffline` | 网络错误页面渲染函数 | `() => void` | null |
| `renderLoading` | loading页面渲染函数 | `() => void` | null |

参数参考react-native FlatList 组件
