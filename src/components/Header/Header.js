import React, { Component, Fragment } from 'react'
import { Animated, View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { Size, Style } from '../../themes'
import { ifAndroid, ifIphoneX } from '../../utils'
import Touch from '../Touch'
import Text from '../Text'
import Image from '../Image'
import styles from './styles'

class Header extends Component {
  static propTypes = {
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    titleStyle: PropTypes.any,
    centerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    left: PropTypes.node,
    leftStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    leftPress: PropTypes.func,
    onSearch: PropTypes.func,
    right: PropTypes.node,
    rightStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    translucent: PropTypes.bool,
    titleTransparent: PropTypes.bool,
    children: PropTypes.node,
    opacityConf: PropTypes.array,
  }

  static defaultProps = {
    height: 44,
    backgroundColor: 'white',
    style: {},
    title: '',
    titleStyle: null,
    centerStyle: {},
    left: null,
    leftStyle: {},
    leftPress: () => {},
    onSearch: null,
    right: null,
    rightStyle: {},
    translucent: false,
    titleTransparent: false,
    children: null,
    opacityConf: [10, 170],
  }

  constructor(props) {
    super(props)
    this.opacity = new Animated.Value(0)
    this.state = {
      fontColor: '#333',
    }
  }

  setOpacity = value => {
    this.opacity.setValue(value)
  }

  getHeight() {
    const paddingTop = ifAndroid(StatusBar.currentHeight, ifIphoneX(44, 24))
    const { height } = this.props
    return height + paddingTop
  }

  render() {
    const {
      left,
      leftPress,
      title,
      titleStyle,
      right,
      style,
      leftStyle,
      rightStyle,
      centerStyle,
      backgroundColor,
      translucent,
      height,
      children,
      opacityConf,
      onSearch,
      titleTransparent,
    } = this.props
    const { fontColor } = this.state

    const paddingTop = ifAndroid(StatusBar.currentHeight, ifIphoneX(44, 24))

    const leftComponent = left || (
      <Touch style={styles.back} onPress={leftPress}>
        <Image source={require('../../assets/images/back.png')} style={styles.backIcon} />
      </Touch>
    )

    const centerComponent =
      typeof title === 'string' ? (
        <Text style={[Style.headerTitle, { color: fontColor }, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
      ) : (
        title
      )

    const rightComponent =
      right ||
      (onSearch ? (
        <Touch onPress={() => onSearch()} style={{ padding: 10 }}>
          <Image
            source={require('../../assets/images/search_black.png')}
            style={{ width: 24, height: 24 }}
          />
        </Touch>
      ) : null)

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: translucent ? 'transparent' : backgroundColor,
          },
          { paddingTop, height: height + paddingTop },
          style,
        ]}
      >
        {translucent && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: -1,
                width: Size.width,
                backgroundColor,
              },
              {
                opacity: this.opacity.interpolate({
                  inputRange: opacityConf,
                  outputRange: [0, 1],
                }),
              },
            ]}
          />
        )}
        {children || (
          <Fragment>
            <View style={[styles.left, leftStyle]}>{leftComponent}</View>
            <Animated.View
              style={[
                styles.center,
                centerStyle,
                translucent &&
                  titleTransparent && {
                    opacity: this.opacity.interpolate({
                      inputRange: opacityConf,
                      outputRange: [0, 1],
                    }),
                  },
              ]}
            >
              {centerComponent}
            </Animated.View>
            <View style={[styles.right, rightStyle]}>{rightComponent}</View>
          </Fragment>
        )}
      </View>
    )
  }
}

export default Header
