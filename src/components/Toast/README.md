# Toast

轻提示Toast组件

### 示例代码

```javascript
  Toast.show('some msg')
  Toast.hide()
  Toast.success()
  Toast.fail()
  Toast.loading()
```

### methods列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `show` | 显示文字提示 | `( msg = '' ) => void` | - |
| `hide` | 关闭Toast | `( ) => void` | - |
| `success` | 成功提示 | `( msg = '成功' ) => void` | - |
| `fail` | 失败提示 | `( msg = '失败' ) => void` | - |
| `loading` | loading | `( msg = '请稍后' ) => void` | - |

