import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View, Animated } from 'react-native'

import Indicator from '../Indicator'
import styles from './styles'

export default class BallIndicator extends PureComponent {
  static defaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 8,
    size: 40,
  }

  static propTypes = {
    ...Indicator.propTypes,
    count: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.renderComponent = this.renderComponent.bind(this)
  }

  renderComponent({ index, count, progress }) {
    const { size, color: backgroundColor } = this.props
    const angle = (index * 360) / count

    const layerStyle = {
      transform: [
        {
          rotate: `${angle}deg`,
        },
      ],
    }

    const inputRange = Array.from(new Array(count + 1), (udf, i) => i / count)

    const outputRange = Array.from(new Array(count), (udf, i) => 1.2 - (0.5 * i) / (count - 1))

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop())
    }

    outputRange.unshift(...outputRange.slice(-1))

    const ballStyle = {
      margin: size / 20,
      backgroundColor,
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      transform: [
        {
          scale: progress.interpolate({ inputRange, outputRange }),
        },
      ],
    }

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={ballStyle} />
      </Animated.View>
    )
  }

  render() {
    const { style, size: width, size: height, ...props } = this.props

    return (
      <View style={[styles.container, style]}>
        <Indicator style={{ width, height }} renderComponent={this.renderComponent} {...props} />
      </View>
    )
  }
}
