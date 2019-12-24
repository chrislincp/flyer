import Size from './Size'

const Colors = {
  themeColor: '#007AFF', //  主题色
  error: '#FF3366',
  warning: '#FFC800',
  success: '#53F05E',
  white: '#fff', // 白色
  black: '#000', //  黑色
  dark: '#333', //  浅色背景导航栏文字/搜索框输入文字/列表标题、主要文字/输入框输入文字/详 情⻚正文/一级标题、正文
  defaultColor: '#0F1D37',
  shadowColor: '#CFD2D6',
  lightGray: '#9398A5',
  bgColor: '#f5f5f5',
  dividerColor: '#ECEDF4',
  inputBg: '#F8F8F9',
  disabledColor: '',
  placeholder: '#CDD1D5',
  grayBtnBg: '#ECEDF1',
}

//  公共样式
const commonStyles = {
  container: {
    flex: 1,
  },
  //  导航栏title
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  //  默认文字样式
  defaultText: {
    fontSize: 14,
    color: Colors.defaultColor,
  },

  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    borderColor: Colors.dividerColor,
    borderWidth: Size.hairlineWidth,
  },
  topDivider: {
    borderColor: Colors.dividerColor,
    borderTopWidth: Size.hairlineWidth,
  },
  leftDivider: {
    borderColor: Colors.dividerColor,
    borderLeftWidth: Size.hairlineWidth,
  },
  rightDivider: {
    borderColor: Colors.dividerColor,
    borderRightWidth: Size.hairlineWidth,
  },
  bottomDivider: {
    borderColor: Colors.dividerColor,
    borderBottomWidth: Size.hairlineWidth,
  },

  lightText: {
    fontSize: 11,
    color: Colors.lightGray,
  },

  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  smallTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  searchInput: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.inputBg,
    height: 36,
    borderRadius: 4,
    alignItems: 'center',
    borderColor: Colors.dividerColor,
    borderWidth: Size.hairlineWidth,
  },
  listCard: { width: Size.width * 0.92, marginLeft: Size.width * 0.04 },
  betweenRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
}

const Style = {
  //  colors
  ...Colors,

  // sizes
  ...Size,

  //  style
  ...commonStyles,
}

export default Style
