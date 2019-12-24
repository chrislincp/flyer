import React from 'react'
import PropTypes from 'prop-types'
import Touch from '../Touch'
import Text from '../Text'
import styles from './styles'

export default class Button extends React.Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    type: PropTypes.oneOf(['success', 'warning', 'error', 'primary', 'normal']),
    disabled: PropTypes.bool,
    style: PropTypes.any,
    titleStyle: PropTypes.any,
    onPress: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }

  static defaultProps = {
    title: '',
    type: 'primary',
    disabled: false,
    style: null,
    titleStyle: null,
    onPress: () => {},
    children: null,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { title, type, style, disabled, onPress, titleStyle, children, ...props } = this.props
    const content = children || title
    return (
      <Touch
        style={[styles.btn, disabled && styles.disabledBtn, styles[`${type}Btn`], style]}
        disabled={disabled}
        onPress={() => onPress()}
        {...props}
      >
        {typeof content === 'string' ? (
          <Text style={[styles.title, styles[`${type}Title`], titleStyle]}>{content}</Text>
        ) : (
          content
        )}
      </Touch>
    )
  }
}
