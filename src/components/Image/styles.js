import { StyleSheet } from 'react-native'
import { Size } from '../../themes'

const styles = StyleSheet.create({
  container: {
    width: Size.width,
    height: Size.height,
    position: 'absolute',
    zIndex: 9999,
  },
})

export default styles
