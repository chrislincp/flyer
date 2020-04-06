import DatePickerIos from './DatePickerIos'
import { isAndroid } from '../../utils/Utils'
import DatePickerAndroid from './DatePickerAndroid'

const DatePicker = isAndroid() ? DatePickerAndroid : DatePickerIos
export default DatePicker
