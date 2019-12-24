import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Style } from '../../themes'
import Image from '../Image'
import Touch from '../Touch'
import Text from '../Text'

export default class Item extends React.Component {
  static defaultProps = {
    isLast: false,
    placeholder: '请选择',
    showArrow: false,
    onPress: null,
    onLongPress: null,
    title: '',
    right: null,
    rightStyle: null,
    disabled: false,
    value: null,
    style: null,
    required: false,
    children: null,
    noDebounce: false,
    titleStyle: {},
    rightProps: {},
  }

  static propTypes = {
    // 标题
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
    // 右边组件
    right: PropTypes.node,

    rightStyle: PropTypes.any,
    // 禁用
    disabled: PropTypes.bool,
    // 是否是最后一个
    isLast: PropTypes.bool,
    //  占位符
    placeholder: PropTypes.string,
    // 单击
    onPress: PropTypes.func,
    // 长按
    onLongPress: PropTypes.func,
    showArrow: PropTypes.bool,
    value: PropTypes.any,
    style: PropTypes.any,
    // 是否必填
    required: PropTypes.bool,
    children: PropTypes.node,
    noDebounce: PropTypes.bool,
    titleStyle: PropTypes.object,
    rightProps: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      onPress,
      onLongPress,
      title,
      isLast,
      right,
      rightStyle,
      disabled,
      value,
      placeholder,
      showArrow,
      style,
      required,
      noDebounce,
      titleStyle,
      children,
      rightProps,
    } = this.props
    const left =
      typeof title === 'string' || typeof title === 'number' ? (
        <Text numberOfLines={1} style={titleStyle}>
          {title}
        </Text>
      ) : (
        title
      )
    const rightComponent = right || (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {typeof value === 'string' || typeof value === 'number' ? (
          `${value}` ? (
            <Text
              numberOfLines={1}
              style={[disabled && { color: Style.lightGray }, rightStyle]}
              {...rightProps}
            >
              {value}
            </Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )
        ) : (
          value
        )}
        {showArrow && (
          <Image
            source={require('../../assets/images/right_arrow.png')}
            style={{ width: 12, height: 12, marginLeft: 4 }}
          />
        )}
      </View>
    )
    return (
      <View style={[styles.container, style]}>
        <Touch
          noDebounce={noDebounce}
          style={{ flex: 1 }}
          disabled={disabled || (!onPress && !onLongPress)}
          onPress={() => {
            if (onPress) onPress()
          }}
          onLongPress={() => {
            if (onLongPress) onLongPress()
          }}
        >
          <View style={[styles.content, Style.bottomDivider, isLast && styles.noLine]}>
            {children || (
              <Fragment>
                <View style={{ marginRight: left ? 20 : 0, flexDirection: 'row' }}>
                  {required && <Text style={{ color: Style.error }}>*</Text>}
                  {left}
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>{rightComponent}</View>
              </Fragment>
            )}
          </View>
        </Touch>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 14,
    color: Style.placeholder,
  },
  noLine: {
    borderBottomWidth: 0,
  },
})
