import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'

export default class Scroll extends React.Component {
  static propTypes = {
    showsVerticalScrollIndicator: PropTypes.bool,
    keyboardShouldPersistTaps: PropTypes.oneOf(['never', 'always', 'handled']),
    style: PropTypes.any,
    children: PropTypes.node,
  }

  static defaultProps = {
    showsVerticalScrollIndicator: true,
    keyboardShouldPersistTaps: 'handled',
    style: null,
    children: null,
  }

  render() {
    const {
      keyboardShouldPersistTaps,
      showsVerticalScrollIndicator,
      children,
      style,
      ...props
    } = this.props
    return (
      <KeyboardAwareScrollView
        style={style}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        {...props}
      >
        {children}
      </KeyboardAwareScrollView>
    )
  }
}
