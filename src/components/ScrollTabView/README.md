# ScrollTabView

Tab侧滑组件

### 示例代码

```javascript
  <ScrollTabView>
     <View tabLabel="test 1">
      <Text>test 1</Text>
    </View>
    <View tabLabel="test 2">
      <Text>test 2</Text>
    </View>
    <View tabLabel="test 3">
      <Text>test 3</Text>
    </View>
  </ScrollTabView>

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `index` | 默认选中tab index | `number` | 0 |
| `position` | tab位置 | `top | bottom` | top |
| `onChangeTab` | tab改变回调 | `( obj ) => void` | - |
| `disabled` | 是否禁用手势滑动 | `bool` | false |
| `tabBarStyle` | tabBar样式 | `object` | - |
| `underlineStyle` | 下划线样式 | `object` | - |
| `renderTab` | tab渲染函数 | `(name, pageIndex, isTabActive, goToPage) => void` | - |
| `tabStyle` | tab样式自定义 | `object` | - |


