import { StyleSheet } from 'react-native'

// 基础样式
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  text: {
    color: '#FFF',
    fontSize: 14,
  },
  textWithIcon: {
    fontWeight: '600',
    marginBottom: 3,
  },
  inner: {
    minWidth: 104,
    maxWidth: '90%',
    alignItems: 'center',
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: 'rgba(4, 4, 12, 0.8)',
  },
  innerWithIcon: {
    borderRadius: 9,
    padding: 10,
    height: 104,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
  },
})

export default styles
