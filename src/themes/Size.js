import { Dimensions, StyleSheet } from 'react-native'
// import ExtraDimensions from 'react-native-extra-dimensions-android'
// const screenHeight = Platform.OS === 'android' ? ExtraDimensions.getRealWindowHeight() : height

const { width, height } = Dimensions.get('window')
const Size = {
  width,
  height,
  hairlineWidth: StyleSheet.hairlineWidth,
}
export default Size
