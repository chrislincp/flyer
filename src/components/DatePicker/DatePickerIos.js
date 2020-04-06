import React from 'react'
import PropTypes from 'prop-types'
import { View, DatePickerIOS } from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import dayjs from 'dayjs'
import Modal from '../Modal'
import Text from '../Text'
import { ifIphoneX } from '../../utils/Utils'
import styles from './styles'
import Touch from '../Touch'
import { initValue } from './util'

export default class DatePickerIos extends React.Component {
  static propTypes = {
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    max: PropTypes.string,
    min: PropTypes.string,
  }

  static defaultProps = {
    // visible: PropTypes.bool,
    mode: 'date',
    onClose: () => {},
    onConfirm: () => {},
    min: null,
    max: null,
  }

  static show(opt = {}) {
    const close = () => {
      if (this._datePickerIos) {
        this._datePickerIos.destroy()
        this._datePickerIos = null
      }
    }
    close()
    this._datePickerIos = new RootSiblings(<DatePickerIos {...opt} />)
  }

  constructor(props) {
    super(props)
    const { value, min, max } = props
    this.state = {
      visible: true,
      value: initValue(value, min, max),
    }
  }

  _onClose() {
    this.setState({ visible: false })
    const { onClose } = this.props
    onClose()
  }

  _onConfirm() {
    const { mode, onConfirm } = this.props
    const { value } = this.state
    let formatValue
    switch (mode) {
      case 'date':
        formatValue = dayjs(value).format('YYYY-MM-DD')
        break
      case 'time':
        formatValue = dayjs(value).format('HH:mm')
        break
      case 'datetime':
        formatValue = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        break
      default:
        break
    }
    onConfirm(formatValue)
    this._onClose()
  }

  setValue(date) {
    this.setState({ value: date })
  }

  initDate(date) {
    if (!date) return null
    const { mode } = this.props
    const dateStr =
      mode === 'time'
        ? `${dayjs().format('YYYY-MM-DD')} ${date}:00`
        : dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    return dayjs(dateStr).toDate()
  }

  _contentRender() {
    const { mode, min, max } = this.props
    const { value } = this.state
    return (
      <View>
        <View style={styles.header}>
          <Touch onPress={() => this._onClose()}>
            <Text>取消</Text>
          </Touch>
          <Touch onPress={() => this._onConfirm()}>
            <Text>确定</Text>
          </Touch>
        </View>
        <DatePickerIOS
          locale="zh-Hans"
          mode={mode}
          date={value}
          maximumDate={this.initDate(max)}
          minimumDate={this.initDate(min)}
          onDateChange={date => this.setValue(date)}
        />
      </View>
    )
  }

  render() {
    const { visible } = this.state
    const { onClose, ...props } = this.props
    return (
      <Modal
        visible={visible}
        onClose={() => {
          this._onClose()
        }}
        springEffect={false}
        animationType="slide"
        style={{ justifyContent: 'flex-end' }}
        bodyStyle={{
          width: '90%',
          backgroundColor: '#fff',
          alignSelf: 'center',
          borderRadius: 20,
          marginBottom: ifIphoneX(40, 10),
          overflow: 'hidden',
        }}
        animateWhenMount
        {...props}
      >
        {this._contentRender()}
      </Modal>
    )
  }
}
