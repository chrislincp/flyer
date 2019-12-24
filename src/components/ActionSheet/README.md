# ActionSheet

上拉菜单，支持单选和多选两种方式。

### 示例代码

```javascript
  onPress() {
    cosnt opt = {
      data: [{label: '测试', value: 'test'}],
      value,
      onChange: val => console.log(val),
    };
    ActionSheet.show(opt);
  }


  render() {
    return (
      <Touch 
        onPress={() => this.onPress()}
        >
        <Text>Show ActionSheet</Text>
      </Touch>
    )
  }

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `value` | 绑定值，当multiple为 true 时，type为 array，单选为 string | `string / array` | - |
| `data` | 显示的数据, 数组每项内容默认格式为 {label: "测试", value: "test"}, 可通过config参数自定义data数组格式 | `array ` | [ ] |
| `multiple` | 是否多选 | `bool` | false |
| `clear` | 是否显示清除按钮 | `bool` | true |
| `title` | 头部文案  | `string` | 请选择 |
| `config` | 配置data的格式 | `object` | `{label: "label", value: "value"}` |
| `onClose` | 关闭时的回调函数 | `( ) => void` | `-` |
| `onChange` | 选择发生变化的回调函数 | `(val: object) => void` | `-` |


### methods列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `show` | 通过 ActionSheet.show 方法调用, 参数opt参考api | `( opt: object ) => void` | - |




