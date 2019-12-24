import { StyleSheet } from 'react-native'
import { Style } from '../../themes'

const styles = StyleSheet.create({
  tagContent: {
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  primaryContent: {
    backgroundColor: '#6899D3',
  },
  successContent: {
    backgroundColor: 'rgba(68, 176, 201, 0.12)',
  },
  errorContent: {
    backgroundColor: 'rgba(201, 68, 99, 0.12)',
  },
  warningContent: {
    backgroundColor: 'rgba(211, 181, 104, 0.12)',
  },
  normalContent: {
    backgroundColor: 'rgba(147, 152, 165, 0.12)',
  },
  lightContent: {
    backgroundColor: 'rgba(86, 128, 165, 0.12)',
  },
  tagText: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 10,
  },
  primaryText: {
    color: '#fff',
  },
  successText: {
    color: '#44B0C9',
  },
  errorText: {
    color: '#C94463',
  },
  warningText: {
    color: '#D3B568',
  },
  normalText: {
    color: Style.lightGray,
  },
  lightText: {
    color: '#5680A5',
  },
})

export default styles
