import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Text from '../Text'
import styles from './styles'

const Tag = ({ type, style, textStyle, title }) => (
  <View style={[styles.tagContent, styles[`${type}Content`], style]}>
    <Text style={[styles.tagText, styles[`${type}Text`], textStyle]}>{title}</Text>
  </View>
)
Tag.propTypes = {
  type: PropTypes.oneOf(['primary', 'success', 'error', 'warning', 'normal', 'light']),
  style: PropTypes.any,
  textStyle: PropTypes.any,
  title: PropTypes.string,
}
Tag.defaultProps = {
  type: 'primary',
  style: null,
  textStyle: null,
  title: '',
}
export default Tag
