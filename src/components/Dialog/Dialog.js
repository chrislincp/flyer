/**
 * 对话框
 * 含标题，按钮区等
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import Modal from '../Modal'
import Text from '../Text'
import { Style } from '../../themes'
import styles from './styles'
import Touch from '../Touch'

export default class Dialog extends React.Component {
  static defaultProps = {
    maskClosable: false,
    animationType: 'fade-scale',
    animateWhenMount: true,
    type: 'alert',
    title: '提示',
    content: '',
    okText: '确定',
    cancelText: '取消',
    onClose: () => {},
    onCancel: () => {},
    onOk: () => {},
    showClose: false,
    okStyle: {},
    okTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    footer: null,
  }

  static propTypes = {
    // 蒙层是否可关闭
    maskClosable: PropTypes.bool,
    // 动画类型
    animationType: PropTypes.string,
    // 是否使用动画
    animateWhenMount: PropTypes.bool,
    // title
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // modal类型
    type: PropTypes.oneOf(['confirm', 'alert']),
    // 确认按钮文案
    okText: PropTypes.string,
    // 确认按钮样式
    okStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // 确认按钮文本样式
    okTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // 取消按钮文案
    cancelText: PropTypes.string,
    // 取消按钮样式
    cancelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // 取消文本样式
    cancelTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // 内容
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // 关闭回调
    onClose: PropTypes.func,
    // 取消
    onCancel: PropTypes.func,
    // 确定
    onOk: PropTypes.func,
    // 底部
    footer: PropTypes.node,

    showClose: PropTypes.bool,
    // dialog 大小
  }

  _maskClose = () => {
    const { maskClosable, onClose } = this.props
    if (maskClosable && onClose) {
      onClose()
    }
  }

  static confirm = conf => {
    const opt = typeof conf === 'string' ? { content: conf } : conf
    if (this._dialog) {
      this._dialog.destroy()
      this._dialog = null
    }
    this._dialog = new RootSiblings(<Dialog {...opt} type="confirm" />)
  }

  static alert = conf => {
    const opt = typeof conf === 'string' ? { content: conf } : conf
    if (this._dialog) {
      this._dialog.destroy()
      this._dialog = null
    }
    this._dialog = new RootSiblings(<Dialog {...opt} type="alert" />)
  }

  static hide = () => {
    this._dialog.destroy()
    this._dialog = null
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true,
    }
  }

  _header(title) {
    return (
      <View>
        <Text style={styles.header}>{title}</Text>
      </View>
    )
  }

  _children(content) {
    return typeof content === 'string' ? (
      <View style={styles.contentWrap}>
        <Text style={styles.contentText}>{content}</Text>
      </View>
    ) : (
      content
    )
  }

  _footer() {
    const { type } = this.props
    switch (type) {
      case 'confirm':
        return this._confirmFooter()
      case 'alert':
        return this._alertFooter()
      default:
        return null
    }
  }

  _confirmFooter() {
    const {
      okText,
      cancelText,
      onOk,
      onCancel,
      cancelStyle,
      okStyle,
      okTextStyle,
      cancelTextStyle,
    } = this.props
    return (
      <View style={styles.footer}>
        <Touch
          style={[
            {
              paddingLeft: 20,
              paddingRight: 20,
              height: 28,
              justifyContent: 'center',
              alignItems: 'center',
            },
            cancelStyle,
          ]}
          onPress={() => {
            onCancel()
            this.onClose()
          }}
        >
          <Text
            style={[
              {
                color: Style.themeColor,
                fontSize: 14,
                fontWeight: '600',
              },
              cancelTextStyle,
            ]}
          >
            {cancelText}
          </Text>
        </Touch>
        <Touch
          style={[
            {
              minWidth: 88,
              backgroundColor: Style.themeColor,
              height: 28,
              borderRadius: 14,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 16,
              paddingRight: 16,
            },
            okStyle,
          ]}
          onPress={() => {
            onOk()
            this.onClose()
          }}
        >
          <Text
            style={[
              {
                color: '#F8F7F7',
                fontSize: 14,
                fontWeight: '600',
              },
              okTextStyle,
            ]}
          >
            {okText}
          </Text>
        </Touch>
      </View>
    )
  }

  _alertFooter() {
    const { okText, onOk } = this.props
    return (
      <View style={styles.footer}>
        <Touch
          style={styles.okBtn}
          onPress={() => {
            this.onClose()
            onOk()
          }}
        >
          <Text style={styles.okText}>{okText}</Text>
        </Touch>
      </View>
    )
  }

  onClose() {
    const { onClose } = this.props
    this.setState({ visible: false })
    if (onClose) onClose()
  }

  render() {
    const {
      animateWhenMount,
      animationType,
      title,
      content,
      footer,
      maskClosable,
      showClose,
    } = this.props
    const { visible } = this.state
    const header = typeof title === 'string' ? this._header(title) : title
    const body = this._children(content)
    const btns = footer || this._footer()
    return (
      <Modal
        visible={visible}
        onClose={() => {
          this.onClose()
        }}
        maskClosable={maskClosable}
        animationType={animationType}
        animateWhenMount={animateWhenMount}
        springEffect
        style={{
          justifyContent: 'center',
        }}
        bodyStyle={styles.modalBodyStyle}
      >
        <View style={styles.body}>
          {showClose && (
            <Touch style={styles.close} onPress={() => this.onClose()}>
              <Image source={require('../../assets/images/close.png')} style={styles.closeIcon} />
            </Touch>
          )}
          {header}
          {body}
          {btns}
        </View>
      </Modal>
    )
  }
}
