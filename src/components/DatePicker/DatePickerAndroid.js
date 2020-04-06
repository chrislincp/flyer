import React from 'react'
import { DatePickerAndroid as DatePicker } from 'react-native'
import dayjs from 'dayjs'
import Toast from '../Toast'
import { appendZero } from '../../utils/Tools'
import { initValue } from './util'

export default class DatePickerAndroid extends React.Component {
  // static propTypes = {
  //   mode: PropTypes.oneOf(['date', 'time', 'datetime']),
  //   onClose: PropTypes.func,
  //   onConfirm: PropTypes.func,
  //   max: PropTypes.string,
  //   min: PropTypes.string,
  // }

  // static defaultProps = {
  //   // visible: PropTypes.bool,
  //   mode: 'date',
  //   onClose: () => {},
  //   onConfirm: () => {},
  //   min: null,
  //   max: null,
  // }

  static show = async (opt = {}) => {
    const { mode = 'date', value, onClose = () => {}, onConfirm = () => {}, max, min } = opt
    if (mode === 'date') {
      try {
        const date = initValue(value, min, max)
        const { action, year, month, day } = await DatePicker.open({
          date,
          // mode: 'spinner',
          minDate: min ? dayjs(min).toDate() : undefined,
          maxDate: max ? dayjs(max).toDate() : undefined,
        })
        if (action !== DatePicker.dismissedAction) {
          const selectDate = `${year}-${appendZero(month + 1)}-${appendZero(day)}`
          onConfirm(selectDate)
          // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
        } else {
          onClose()
        }
      } catch ({ code, message }) {
        Toast.show('message')
      }
    }
  }

  render() {
    return <DatePicker />
  }
}
