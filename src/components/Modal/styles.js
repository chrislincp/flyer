import { StyleSheet } from 'react-native'

// 基础样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    // backgroundColor: 'rgba(0,0,0,0)',
  },
  mask: {
    backgroundColor: 'rgba(4, 4, 12, 0.8)',
  },
  absolute: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  body: {
    // backgroundColor: '#FFF',
    zIndex: 90,
  },
})

export default styles
