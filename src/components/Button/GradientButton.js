import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types'
import Touch from '../Touch'
import Text from '../Text'

class GradientButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.any,
    textStyle: PropTypes.any,
    title: PropTypes.string,
    colors: PropTypes.array,
    start: PropTypes.object,
    end: PropTypes.object,
    circle: PropTypes.bool,
    disabled: PropTypes.bool,
    height: PropTypes.number,
    type: PropTypes.oneOf(['primary', 'success', 'error']),
  }

  static defaultProps = {
    onPress: () => {},
    style: null,
    textStyle: null,
    title: '',
    colors: null,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    circle: false,
    disabled: false,
    height: 45,
    type: 'primary',
  }

  getColorsByType(type) {
    let colors = ['#007AFF', '#459EFF']
    switch (type) {
      case 'success':
        colors = ['#2AB98E', '#61DFC6']
        break
      case 'error':
        colors = ['#FA577D', '#F32C61']
        break
      default:
        break
    }
    return colors
  }

  render() {
    const {
      onPress,
      style,
      textStyle,
      title,
      colors,
      start,
      end,
      circle,
      disabled,
      height,
      type,
      ...props
    } = this.props
    return (
      <Touch
        disabled={disabled}
        style={[
          { width: '100%', borderRadius: 4, overflow: 'hidden' },
          circle && { borderRadius: height },
          style,
        ]}
        onPress={onPress}
        {...props}
      >
        <LinearGradient
          start={start}
          end={end}
          colors={colors || this.getColorsByType(type)}
          style={[{ height }, disabled && { opacity: 0.3 }, styles.bg]}
        >
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </LinearGradient>
      </Touch>
    )
  }
}

const styles = StyleSheet.create({
  bg: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default GradientButton
