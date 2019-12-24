import React from 'react'
import PropTypes from 'prop-types'
import { View, Animated, Dimensions } from 'react-native'
import { Style } from '../../themes'

export default class Progress extends React.Component {
  static defaultProps = {
    percent: 0,
    position: 'normal',
    appearTransition: false,
    size: 'default',
    showUnfill: true,
    progressMarginLinear: false,
    style: null,
    circle: false,
  }

  static autoStyleSheet = false

  static simpleStyleProps = {
    progressBarColor: {
      name: 'progressBar',
      attr: 'backgroundColor',
    },
  }

  static propTypes = {
    // 进度0-100
    percent: PropTypes.number,
    // 尺寸 small default large
    size: PropTypes.oneOf(['default', 'small', 'large']),
    // 位置 top normal
    position: PropTypes.oneOf(['top', 'normal']),
    // 显示进度未满区域
    showUnfill: PropTypes.bool,
    // 进度条右边缘是否呈线形
    progressMarginLinear: PropTypes.bool,
    appearTransition: PropTypes.bool,
    style: PropTypes.any,
    circle: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      percentage: new Animated.Value(0),
    }
    this.viewWidth = Dimensions.get('window').width
  }

  componentDidUpdate(prevProps) {
    const { appearTransition, percent } = this.props
    const { percentage } = this.state
    if (appearTransition && prevProps.percent !== percent) {
      const w = styles.container ? styles.container.width || this.viewWidth : this.viewWidth
      const pw = this._getPercentWidth(w, percent)

      Animated.timing(percentage, {
        toValue: pw,
        duration: 1000,
      }).start()
    }
  }

  componentDidMount() {
    const { appearTransition } = this.props
    const { percentage } = this.state
    if (appearTransition) {
      percentage.setValue(0)
      Animated.timing(percentage, {
        toValue: this._getPercentWidth(),
        duration: 1000,
      }).start()
    }
  }

  _normalPercent = percent => {
    let widthPercent = 0
    if (percent > 0) {
      widthPercent = percent > 100 ? 100 : percent
    }
    if (percent < 0) {
      widthPercent = 0
    }
    return widthPercent
  }

  _getPercentWidth = (width = this.viewWidth) => {
    const { percent } = this.props
    return width * (this._normalPercent(percent) / 100)
  }

  getHeight() {
    const { size } = this.props
    let h = 4
    switch (size) {
      case 'small':
        h = 2
        break
      case 'large':
        h = 6
        break
      default:
        break
    }
    return h
  }

  render() {
    const {
      position,
      showUnfill,
      progressMarginLinear,
      percent,
      appearTransition,
      style,
      circle,
    } = this.props
    const { percentage } = this.state
    // 确定view的宽度。进度条bar和背景bar的半径同步，以背景bar的半径为准。边宽则各自控制
    const w = style ? style.width || this.viewWidth : this.viewWidth
    const h = style ? style.height || this.getHeight() : this.getHeight()
    let bw = styles.container ? styles.container.borderWidth || 0 : 0
    let br = circle ? h / 2 : 0
    let pbw = styles.progressBar ? styles.progressBar.borderWidth || 0 : 0

    // 控制borderWidth的宽度
    if (bw && bw > h / 4) {
      bw = h / 4
    }
    if (pbw && pbw > h / 4) {
      pbw = h / 4
    }
    if (br && br < h / 2) {
      br = h / 2
    }

    const tempColor = styles.container ? styles.container.borderColor : 'transparent'
    const newBorderColor = showUnfill ? tempColor : 'transparent'
    const outerStyle = [
      styles.container,
      {
        width: w,
        height: h,
        borderRadius: br,
        borderColor: newBorderColor,
      },
      position === 'top'
        ? {
            position: 'absolute',
            top: 0,
          }
        : null,
      showUnfill
        ? null
        : {
            backgroundColor: 'transparent',
          },
      style,
    ]
    const borderStyle = {
      borderWidth: pbw,
      borderRadius: br,
      borderColor: styles.progressBar ? styles.progressBar.borderColor : 'transparent',
    }

    const percentStyle = {}
    let child = null
    const reallyBorderRadius = progressMarginLinear
      ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
      : null
    if (appearTransition) {
      percentStyle.width = percentage
      child = (
        <Animated.View
          style={[styles.progressBar, percentStyle, borderStyle, reallyBorderRadius]}
        />
      )
    } else {
      percentStyle.width = this._getPercentWidth(w, percent)
      child = (
        <View
          style={[
            styles.progressBar,
            percentStyle,
            borderStyle,
            progressMarginLinear ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 } : null,
          ]}
        />
      )
    }

    return <View style={outerStyle}>{child}</View>
  }
}

const styles = {
  container: {
    backgroundColor: '#F8F8F9',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 0,
  },
  progressBar: {
    backgroundColor: Style.themeColor,
    flex: 1,
  },
}
