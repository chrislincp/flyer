import { Animated, Easing } from 'react-native'
import PropTypes from 'prop-types'
import RN from 'react-native/package'
import React, { PureComponent } from 'react'

const [major, minor] = RN.version.split('.').map(item => Number(item))
const hasLoopSupport = !major && minor >= 45

export default class Indicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,

    animating: true,
    interaction: true,
    renderComponent: null,
    count: 1,
  }

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.renderComponent = this.renderComponent.bind(this)
    this.startAnimation = this.startAnimation.bind(this)
    this.stopAnimation = this.stopAnimation.bind(this)

    this.state = {
      progress: new Animated.Value(0),
    }

    this.mounted = false
  }

  startAnimation({ finished } = {}) {
    const { progress } = this.state
    const { interaction, animationEasing, animationDuration } = this.props

    if (!this.mounted || finished === false) {
      return
    }

    const animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    })

    if (hasLoopSupport) {
      Animated.loop(animation).start()
    } else {
      progress.setValue(0)
      animation.start(this.startAnimation)
    }

    this.setState({ animation })
  }

  stopAnimation() {
    const { animation } = this.state

    if (animation == null) {
      return
    }

    animation.stop()

    this.setState({ animation: null })
  }

  componentDidMount() {
    const { animating } = this.props

    this.mounted = true

    if (animating) {
      this.startAnimation()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentWillReceiveProps(props) {
    const { animating } = this.props

    if (animating ^ props.animating) {
      if (animating) {
        this.stopAnimation()
      } else {
        this.startAnimation()
      }
    }
  }

  renderComponent(udf, index) {
    const { progress } = this.state
    const { renderComponent, count } = this.props

    if (typeof renderComponent === 'function') {
      return renderComponent({ index, count, progress })
    }
    return null
  }

  render() {
    const { count, ...props } = this.props

    return (
      <Animated.View {...props}>{Array.from(new Array(count), this.renderComponent)}</Animated.View>
    )
  }
}
