import { StyleSheet } from 'react-native'
import { Style } from '../../themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    color: Style.themeColor,
  },
})

export default styles
