import React from 'react'
import { TouchableOpacity, Keyboard } from 'react-native'
import PropTypes from 'prop-types'

export default class Touch extends React.Component {
  static defaultProps = {
    activeOpacity: 0.6,
    onPress: null,
    disabled: false,
    children: null,
    noDebounce: false,
    keyboardDismiss: true,
  }

  static propTypes = {
    activeOpacity: PropTypes.number,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    noDebounce: PropTypes.bool,
    keyboardDismiss: PropTypes.bool,
  }

  constructor(props) {
    super(props)
  }

  _onPress = e => {
    const { noDebounce, onPress, keyboardDismiss } = this.props
    const clickTime = Date.now()
    if (noDebounce || !this.lastClickTime || Math.abs(this.lastClickTime - clickTime) > 500) {
      this.lastClickTime = clickTime
      if (keyboardDismiss) Keyboard.dismiss()
      if (onPress) onPress(e)
    }
  }

  render() {
    const {
      activeOpacity,
      onPress,
      disabled,
      noDebounce,
      keyboardDismiss,
      children,
      ...props
    } = this.props
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        disabled={disabled || !onPress}
        onPress={this._onPress}
        {...props}
      >
        {children}
      </TouchableOpacity>
    )
  }
}
