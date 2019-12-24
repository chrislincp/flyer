import React from 'react'

import { View } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'
import ImageSource from './ImageSource'
import Touch from '../Touch'
import Text from '../Text'
import Image from '../Image'

export default class DefaultPage extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    source: PropTypes.any,
    showButton: PropTypes.bool,
    buttonText: PropTypes.string,
    onPress: PropTypes.func,
    type: PropTypes.oneOf(['empty', 'error', 'offline']),
  }

  static defaultProps = {
    title: '',
    source: null,
    showButton: false,
    buttonText: '刷新重试',
    onPress: () => {},
    type: null,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { title, source, showButton, buttonText, onPress, type } = this.props
    let img
    switch (type) {
      case 'error':
        img = ImageSource.serverErrorImg
        break
      case 'offline':
        img = ImageSource.offlineImg
        break
      case 'empty':
        img = ImageSource.noDataImg
        break
      default:
        break
    }
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={img || source} />
        <Text style={styles.title}>{title}</Text>
        {showButton && (
          <Touch style={styles.button} onPress={() => onPress()}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Touch>
        )}
      </View>
    )
  }
}
