import { StyleSheet } from 'react-native'
import { Style } from '../../themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  title: {
    textAlign: 'center',
    color: '#B8BEC8',
    fontSize: 16,
    lineHeight: 18,
  },
  button: {
    width: 100,
    lineHeight: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: Style.themeColor,
  },
})

export default styles
