import { StyleSheet } from 'react-native'
import { Style } from '../../themes'

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  successBtn: {
    backgroundColor: Style.success,
  },
  warningBtn: {
    backgroundColor: Style.warning,
  },
  errorBtn: {
    backgroundColor: Style.error,
  },
  primaryBtn: {
    backgroundColor: Style.themeColor,
  },
  normalBtn: {
    backgroundColor: Style.white,
    borderWidth: 2,
    borderColor: Style.dividerColor,
  },
  disabledBtn: {
    opacity: 0.3,
  },
  title: {
    fontSize: 17,
    color: 'white',
  },
  normalTitle: {
    color: Style.dark,
  },
})

export default styles
