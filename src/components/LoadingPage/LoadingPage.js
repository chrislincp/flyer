import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { MaterialIndicator } from '../ActivityIndicator'
import Text from '../Text'
import { Style } from '../../themes'
import styles from './styles'

export default class LoadingPage extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    titleStyle: PropTypes.any,
    title: PropTypes.string,
  }

  static defaultProps = {
    style: null,
    titleStyle: null,
    title: '加载中，请稍后',
  }

  render() {
    const { style, titleStyle, title } = this.props
    return (
      <View style={[style, styles.container]}>
        <MaterialIndicator color={Style.themeColor} />
        <Text style={[styles.text, titleStyle]}>{title}</Text>
      </View>
    )
  }
}
