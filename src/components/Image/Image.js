import React, { Fragment } from 'react'
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'
import Touch from '../Touch'
import ImagePreview from './ImagePreview'

export default class Image extends React.Component {
  static propTypes = {
    source: PropTypes.any,
    style: PropTypes.any,
    onPress: PropTypes.func,
    showDetail: PropTypes.bool,
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
  }

  static defaultProps = {
    source: null,
    style: null,
    onPress: null,
    showDetail: false,
    resizeMode: 'cover',
  }

  constructor(props) {
    super(props)
    this.state = {
      showDefault: true,
    }
  }

  onPress() {
    const { onPress, showDetail, source } = this.props
    if (onPress) onPress()
    if (showDetail && source.uri) {
      this.show([source.uri], 0)
    }
  }

  show(data = [], index = 0) {
    ImagePreview.show({ data, index })
  }

  static show = (data = [], index = 0) => {
    ImagePreview.show({ data, index })
  }

  render() {
    const { showDefault } = this.state
    const { source, style, onPress, showDetail, resizeMode, ...props } = this.props
    const useUri = source && source.uri //  是否使用远程图片
    return useUri ? (
      <Fragment>
        <Touch
          activeOpacity={1}
          style={style}
          disabled={showDetail && source.uri ? false : !onPress}
          onPress={() => this.onPress()}
          noDebounce
        >
          <FastImage
            source={showDefault ? require('../../assets/images/default_image.png') : source}
            style={style}
            resizeMode={showDefault ? 'cover' : resizeMode}
            {...props}
          />
        </Touch>
        <FastImage
          source={source}
          onLoad={() => {
            this.setState({ showDefault: false })
          }}
        />
      </Fragment>
    ) : (
      <Touch
        style={style}
        disabled={showDetail && source.uri ? false : !onPress}
        onPress={() => this.onPress()}
        noDebounce
      >
        <FastImage
          source={source || require('../../assets/images/default_image.png')}
          style={style}
          {...props}
        />
      </Touch>
    )
  }
}
