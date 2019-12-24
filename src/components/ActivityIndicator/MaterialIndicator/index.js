import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View, Animated, Easing } from 'react-native'

import Indicator from '../Indicator'
import styles from './styles'

class MIndicator extends PureComponent {
  static defaultProps = {
    animationDuration: 2400,

    color: 'rgb(0, 0, 0)',
    size: 30,
  }

  static propTypes = {
    ...Indicator.propTypes,
    animationDuration: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  constructor(props) {
    super(props)

    this.renderComponent = this.renderComponent.bind(this)
  }

  renderComponent({ index, progress }) {
    const { size, color, animationDuration } = this.props

    const frames = (60 * animationDuration) / 1000
    const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0)

    const inputRange = Array.from(new Array(frames), (udf, frameIndex) => frameIndex / (frames - 1))

    const outputRange = Array.from(new Array(frames), (udf, frameIndex) => {
      let outputProgress = (2 * frameIndex) / (frames - 1)
      const rotation = index ? +(360 - 15) : -(180 - 15)

      if (outputProgress > 1.0) {
        outputProgress = 2.0 - outputProgress
      }

      const direction = index ? -1 : +1

      return `${direction * (180 - 30) * easing(outputProgress) + rotation}deg`
    })

    const layerStyle = {
      width: size,
      height: size,
      transform: [
        {
          rotate: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [`${0 + 30 + 15}deg`, `${2 * 360 + 30 + 15}deg`],
          }),
        },
      ],
    }

    const viewportStyle = {
      width: size,
      height: size,
      transform: [
        {
          translateY: index ? -size / 2 : 0,
        },
        {
          rotate: progress.interpolate({ inputRange, outputRange }),
        },
      ],
    }

    const containerStyle = {
      width: size,
      height: size / 2,
      overflow: 'hidden',
    }

    const offsetStyle = index ? { top: size / 2 } : null

    const lineStyle = {
      width: size,
      height: size,
      borderColor: color,
      borderWidth: 2,
      borderRadius: size / 2,
    }

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={layerStyle}>
          <Animated.View style={[containerStyle, offsetStyle]} collapsable={false}>
            <Animated.View style={viewportStyle}>
              <Animated.View style={containerStyle} collapsable={false}>
                <Animated.View style={lineStyle} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    )
  }

  render() {
    const { style, size: width, size: height, ...props } = this.props

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
          count={2}
        />
      </View>
    )
  }
}

const MaterialIndicator = MIndicator
export default MaterialIndicator
