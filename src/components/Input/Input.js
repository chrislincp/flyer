import React from 'react'
import { View, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import Touch from '../Touch'
import { Style } from '../../themes'
import styles from './styles'
import Toast from '../Toast'
import Image from '../Image'

export default class Input extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    multiline: PropTypes.bool,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    clear: PropTypes.bool,
    disabled: PropTypes.bool,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    checkType: PropTypes.oneOf(['phone', 'idCard']),
    left: PropTypes.node,
    right: PropTypes.node,
    transparent: PropTypes.bool,
  }

  static defaultProps = {
    style: {},
    inputStyle: {},
    multiline: false,
    placeholder: '请填写',
    placeholderTextColor: Style.placeholder,
    clear: false,
    disabled: false,
    onChangeText: () => {},
    onFocus: () => {},
    onBlur: () => {},
    left: null,
    right: null,
    transparent: false,
    checkType: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
  }

  onClear() {
    const { onChangeText } = this.props
    this.input.clear()
    this.input.focus()
    onChangeText('')
  }

  onFocus() {
    this.setState({ focused: true })
    const { onFocus } = this.props
    onFocus()
  }

  onBlur() {
    const { checkType } = this.props
    if (checkType) this.checkInputValue(checkType)
    this.setState({ focused: false })
    const { onBlur } = this.props
    onBlur()
  }

  checkInputValue(type) {
    const { value } = this.props
    let reg
    let msg
    switch (type) {
      case 'phone':
        reg = /^1[3456789]\d{9}$/
        msg = '请输入正确的手机号'
        break
      case 'idCard':
        reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
        msg = '请输入正确的身份证号'
        break
      default:
        break
    }
    if (reg && value && !reg.test(value)) {
      Toast.show(msg)
      const { onChangeText } = this.props
      this.input.clear()
      onChangeText('')
    }
  }

  render() {
    const {
      value,
      clear,
      placeholderTextColor,
      multiline,
      style,
      inputStyle,
      disabled,
      onChangeText,
      left,
      right,
      transparent,
      ...props
    } = this.props
    const { focused } = this.state
    const val = value === undefined ? null : `${value}`
    return (
      <View style={[styles.container, style, transparent && { backgroundColor: 'transparent' }]}>
        {left && left}
        <TextInput
          ref={c => {
            this.input = c
          }}
          style={[
            {
              textAlignVertical: multiline ? 'top' : 'center',
              color: disabled ? Style.lightGray : Style.defaultColor,
            },
            styles.defaultText,
            styles.input,
            inputStyle,
            { color: disabled ? Style.lightGray : Style.dark },
          ]}
          placeholderTextColor={placeholderTextColor}
          clearButtonMode="never"
          underlineColorAndroid="transparent"
          selectionColor={Style.themeColor}
          editable={!disabled}
          value={val}
          onChangeText={text => onChangeText(text)}
          multiline={multiline}
          {...props}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
        />
        {clear && val.length > 0 && focused && (
          <Touch onPress={() => this.onClear()} keyboardDismiss={false}>
            <Image style={styles.clear} source={require('../../assets/images/input_clear.png')} />
          </Touch>
        )}
        {right && right}
      </View>
    )
  }
}
