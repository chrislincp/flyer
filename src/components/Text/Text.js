import React from 'react'
import { Text as RNText } from 'react-native'
import PropTypes from 'prop-types'
import { Style } from '../../themes'

const Text = ({ style, ...props }) => <RNText style={[Style.defaultText, style]} {...props} />

Text.propTypes = {
  style: PropTypes.any,
}

Text.defaultProps = {
  style: {},
}

export default Text
