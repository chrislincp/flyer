import { StyleSheet } from 'react-native'
import { Style } from '../../themes'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 57,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 16,
  },
  headerTitle: {},
  titleText: {
    color: Style.lightGray,
    fontSize: 12,
  },
  btns: {
    flexDirection: 'row',
  },
  btn: {
    padding: 8,
  },
  btnText: {
    fontSize: 14,
  },
  scroll: { maxHeight: 240 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    paddingLeft: 24,
    paddingRight: 24,
  },
  itemTitle: {
    color: Style.defaultColor,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
})

export default styles
