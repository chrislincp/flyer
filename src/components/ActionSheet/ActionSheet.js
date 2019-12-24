import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import Modal from '../Modal'
import Text from '../Text'
import { ifIphoneX, typeOf, cloneDeep } from '../../utils'
import { Style } from '../../themes'
import styles from './styles'
import Touch from '../Touch'
import Scroll from '../Scroll'

export default class ActionSheet extends React.Component {
  static defaultProps = {
    // visible: true,
    clear: true,
    multiple: false,
    title: '请选择',
    data: [],
    onClose: () => {},
    onChange: () => {},
    config: {
      value: 'value',
      key: 'key',
    },
    value: '',
  }

  static propTypes = {
    // visible: PropTypes.bool,
    clear: PropTypes.bool,
    multiple: PropTypes.bool,
    title: PropTypes.string,
    data: PropTypes.array,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.oneOfType([PropTypes.object]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  }

  static show(opt = {}) {
    const close = () => {
      if (this._actionSheet) {
        this._actionSheet.destroy()
        this._actionSheet = null
      }
    }
    close()
    this._actionSheet = new RootSiblings(<ActionSheet {...opt} />)
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedValue: this.initValue(props),
      visible: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedValue: this.initValue(nextProps),
      // visible: nextProps.visible,
    })
  }

  initValue(props) {
    const { data, value, config } = props
    let selectedValue = {}
    if (typeOf(value) == 'string' || typeOf(value) == 'number') {
      data.forEach(item => {
        if (`${item[config.key]}` == value) {
          selectedValue = { [value]: true }
        }
      })
    } else if (typeOf(value) == 'array') {
      value.forEach(val => {
        data.forEach(item => {
          if (`${item[config.key]}` == val) {
            selectedValue[val] = true
          }
        })
      })
    }
    return selectedValue
  }

  _onClose() {
    this.setState({ visible: false })
    const { onClose } = this.props
    onClose()
  }

  _onSelect(item, index) {
    const { multiple, config } = this.props
    let { selectedValue } = this.state
    if (multiple) {
      if (selectedValue[item[config.key]]) {
        delete selectedValue[item[config.key]]
      } else {
        selectedValue[item[config.key]] = true
      }
      this.setState({ selectedValue })
    } else {
      selectedValue = {
        [item[config.key]]: true,
      }
      // this.setState({ selectedValue });
      this._onChange(selectedValue, item, index)
    }
  }

  _onClear() {
    this.setState({ selectedValue: {} })
  }

  _onChange(selectedValue, dataItem, index) {
    let value
    const { data, multiple, config, onChange } = this.props
    const valueKeys = Object.keys(selectedValue)
    if (multiple) {
      value = []
      dataItem = []
      index = []
      if (valueKeys.length) {
        valueKeys.forEach(key => {
          data.forEach((item, i) => {
            if (key == item[config.key]) {
              value.push(item[config.key])
              dataItem.push(cloneDeep(item))
              index.push(i)
            }
          })
        })
      }
    } else {
      value = ''
      if (valueKeys.length) {
        valueKeys.forEach(key => {
          data.forEach(item => {
            if (key == `${item[config.key]}`) value = item[config.key]
          })
        })
      }
    }
    onChange(value, dataItem, index)
    this.setState({ visible: false })
  }

  _contentRender() {
    const { data, config, title, clear, multiple } = this.props
    const { selectedValue } = this.state
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          {multiple && (
            <View style={styles.btns}>
              {clear && (
                <Touch
                  style={styles.btn}
                  disabled={!Object.keys(selectedValue).length && clear}
                  onPress={() => this._onClear()}
                >
                  <Text
                    style={[
                      styles.btnText,
                      { color: Style.themeColor },
                      !Object.keys(selectedValue).length && { opacity: 0.5 },
                    ]}
                  >
                    清空
                  </Text>
                </Touch>
              )}
              <Touch style={styles.btn} onPress={() => this._onChange(selectedValue)}>
                <Text style={[styles.btnText, { color: Style.themeColor }]}>确定</Text>
              </Touch>
            </View>
          )}
        </View>
        <Scroll style={styles.scroll}>
          {data.map((item, index) => (
            <Touch
              style={[styles.item, index + 1 == data.length && { marginBottom: 6 }]}
              key={item[config.key]}
              onPress={() => this._onSelect(item, index)}
              noDebounce
            >
              <Text
                style={[
                  styles.itemTitle,
                  selectedValue[item[config.key]] && { color: Style.themeColor },
                ]}
              >
                {item[config.value]}
              </Text>
            </Touch>
          ))}
        </Scroll>
      </View>
    )
  }

  render() {
    const { visible } = this.state
    const { onClose, ...props } = this.props
    return (
      <Modal
        visible={visible}
        onClose={() => {
          this._onClose()
        }}
        springEffect={false}
        animationType="slide"
        style={{ justifyContent: 'flex-end' }}
        bodyStyle={{
          width: '90%',
          backgroundColor: '#fff',
          alignSelf: 'center',
          borderRadius: 20,
          marginBottom: ifIphoneX(40, 10),
          overflow: 'hidden',
        }}
        animateWhenMount
        {...props}
      >
        {this._contentRender()}
      </Modal>
    )
  }
}
