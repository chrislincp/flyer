import React, { Component } from 'react'
import { View, Animated, PanResponder, ColorPropType } from 'react-native'
import PropTypes from 'prop-types'
import { Style } from '../../themes'
import Text from '../Text'

class Switch extends Component {
  rightAnim = new Animated.Value(0)

  leftAnim = new Animated.Value(0)

  onProgressAnim = new Animated.Value(0)

  static defaultProps = {
    style: null,
    active: false,
    height: 31,
    width: 60,
    activeColor: Style.themeColor,
    disabledActiveColor: '#87bbf8',
    inactiveColor: '#f3f3f3',
    disabledInactiveColor: '#f3f3f3',
    dotColor: '#fff',
    disabledDotColor: '#fbfeff',
    disabled: false,
    title: [],
    onChange: () => {},
  }

  static propTypes = {
    style: PropTypes.any,
    active: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    disabled: PropTypes.bool,
    activeColor: ColorPropType,
    disabledActiveColor: ColorPropType,
    inactiveColor: ColorPropType,
    disabledInactiveColor: ColorPropType,
    disabledDotColor: ColorPropType,
    dotColor: ColorPropType,
    onChange: PropTypes.func,
    title: PropTypes.array,
  }

  constructor(props) {
    super(props)
    const { width, height, active } = this.props
    if (active) {
      const margin = width - height
      this.rightAnim.setValue(0)
      this.leftAnim.setValue(margin)
      this.onProgressAnim.setValue(1)
    } else {
      const margin = width - height
      this.rightAnim.setValue(margin)
      this.leftAnim.setValue(0)
      this.onProgressAnim.setValue(0)
    }
  }

  render() {
    const {
      activeColor,
      inactiveColor,
      dotColor,
      disabledActiveColor,
      disabledInactiveColor,
      disabledDotColor,
      style,
      height,
      width,
      disabled,
      active,
      title,
    } = this.props
    const dotSize = height * 0.84
    const dotMargin = height * 0.08
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          style,
          {
            backgroundColor: !disabled ? inactiveColor : disabledInactiveColor,
            borderRadius: height / 2,
            flexDirection: 'row',
            alignItems: 'center',
            height,
            width,
          },
        ]}
      >
        <Animated.View
          style={{
            alignSelf: 'stretch',
            flex: 1,
            backgroundColor: !disabled ? activeColor : disabledActiveColor,
            borderRadius: height / 2,
            opacity: this.onProgressAnim,
          }}
        >
          <View
            style={{
              width: width - dotSize,
              height,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {title[0] ? <Text style={{ color: 'white' }}>{title[0]}</Text> : null}
          </View>
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: !disabled ? dotColor : disabledDotColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.64,
            elevation: 2,
            margin: dotMargin,
            right: this.rightAnim,
            left: this.leftAnim,
          }}
        ></Animated.View>
        {!active && (
          <View
            style={{
              width: width - dotSize,
              height,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {title[1] ? <Text style={{ color: Style.dark }}>{title[1]}</Text> : null}
          </View>
        )}
      </Animated.View>
    )
  }

  componentWillReceiveProps(props) {
    if (props.active === true) {
      this.animOn()
    }
    if (props.active === false) {
      this.animOff()
    }
    // if (props.active !== this.state.active) {
    //   this.setState({
    //     active: !!props.active,
    //     disabled: !!props.disabled,
    //   })
    //   if (props.active === true) {
    //     this.animOn()
    //   }
    //   if (props.active === false) {
    //     this.animOff()
    //   }
    // } else if (this.props.disabled !== props.disabled) {
    //   this.setState({
    //     disabled: !!props.disabled,
    //   })
    // }
  }

  animOn() {
    const { width, height } = this.props
    const blankSize = width - height
    Animated.timing(this.rightAnim, {
      toValue: 0,
      duration: 200,
    }).start()

    Animated.timing(this.leftAnim, {
      toValue: blankSize,
      duration: 200,
    }).start()

    Animated.timing(this.onProgressAnim, {
      toValue: 1,
      duration: 200,
    }).start()
  }

  animOff() {
    const { width, height } = this.props
    const blankSize = width - height
    Animated.timing(this.leftAnim, {
      toValue: 0,
      duration: 200,
    }).start()

    Animated.timing(this.rightAnim, {
      toValue: blankSize,
      duration: 200,
    }).start()

    Animated.timing(this.onProgressAnim, {
      toValue: 0,
      duration: 200,
    }).start()
  }

  animPushDown() {
    const { width, height, active } = this.props
    const blankSize = width - height
    const value = active ? this.leftAnim : this.rightAnim
    Animated.timing(value, {
      toValue: blankSize * 0.5,
      duration: 200,
    }).start()
  }

  toggle() {
    const { active, onChange } = this.props
    if (active) {
      this.animOff()
    } else {
      this.animOn()
    }

    onChange(!active)
    // this.setState(
    //   {
    //     active: !active,
    //   },
    //   () => {
    //     if (this.props.onChange) {
    //       this.props.onChange(this.state.active)
    //     }
    //   },
    // )
  }

  reset() {
    const { active } = this.props
    if (active) {
      this.animOn()
    } else {
      this.animOff()
    }
  }

  panResponder = PanResponder.create({
    // 在开始触摸时的捕获期，是否成为响应者
    onStartShouldSetPanResponder: () => true,
    // 在用户开始触摸的时候，是否成为响应者
    onStartShouldSetPanResponderCapture: () => true,
    // 确定是否处理移动事件
    onMoveShouldSetPanResponder: () => true,
    // 在捕获期确定是否捕获移动时间
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: () => {
      // console.log('onPanResponderGrant')
      this.animPushDown()
    },
    onPanResponderMove: () => {
      // console.log('onPanResponderMove')
    },
    onPanResponderTerminationRequest: () => true,
    // 监视器释放时
    onPanResponderRelease: () => {
      // console.log('onPanResponderRelease')
      const { disabled } = this.props
      if (!disabled) {
        this.toggle()
      } else {
        this.reset()
      }
    },
    onPanResponderTerminate: () => {
      // console.log('onPanResponderTerminate')
      this.reset()
    },
    onShouldBlockNativeResponder: () => true,
  })
}

export default Switch
