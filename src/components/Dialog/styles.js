import { StyleSheet } from 'react-native'
import { Style } from '../../themes'

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: Style.defaultColor,
    lineHeight: 28,
    fontWeight: '700',
  },
  contentWrap: {
    marginBottom: 12,
    marginTop: 12,
  },
  contentText: {
    fontSize: 13,
    color: Style.lightGray,
    lineHeight: 23,
  },
  body: {
    padding: 20,
    position: 'relative',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 20,
  },
  footer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  okBtn: {
    minWidth: 88,
    backgroundColor: Style.themeColor,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },

  okText: {
    color: '#F8F7F7',
    fontSize: 14,
    fontWeight: '600',
  },

  modalBodyStyle: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
  },

  close: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 90,
  },
  closeIcon: {
    width: 12,
    height: 12,
  },
})

export default styles
