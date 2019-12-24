import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View, Animated, Easing } from 'react-native'

import Indicator from '../Indicator'
import styles from './styles'

export default class SkypeIndicator extends PureComponent {
  static defaultProps = {
    animationDuration: 1600,

    color: 'rgb(0, 0, 0)',
    count: 5,
    size: 40,

    minScale: 0.2,
    maxScale: 1.0,
  }

  static propTypes = {
    ...Indicator.propTypes,
    animationDuration: PropTypes.number,
    count: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,

    minScale: PropTypes.number,
    maxScale: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.renderComponent = this.renderComponent.bind(this)
  }

  renderComponent({ index, count, progress }) {
    const { size, minScale, maxScale, color: backgroundColor, animationDuration } = this.props
    const frames = (60 * animationDuration) / 1000
    const offset = index / (count - 1)
    const easing = Easing.bezier(0.5, offset, 0.5, 1.0)

    const inputRange = Array.from(new Array(frames), (udf, i) => i / (frames - 1))

    const outputRange = Array.from(
      new Array(frames),
      (udf, i) => `${easing(i / (frames - 1)) * 360}deg`,
    )

    const layerStyle = {
      transform: [
        {
          rotate: progress.interpolate({ inputRange, outputRange }),
        },
      ],
    }

    const ballStyle = {
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      backgroundColor,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [
              maxScale - (maxScale - minScale) * offset,
              minScale + (maxScale - minScale) * offset,
            ],
          }),
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
