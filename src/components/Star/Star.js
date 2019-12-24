import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Image from '../Image'

const getSource = (value, i) => {
  let source
  const full = require('../../assets/images/star_full_normal.png')
  const half = require('../../assets/images/star_half_normal.png')
  const empty = require('../../assets/images/star_empty_normal.png')
  if (i <= value) {
    source = full
  } else if (i > value) {
    if (i - value >= 1) {
      source = empty
    } else {
      source = half
    }
  }
  return source
}
const Star = ({ value, max, size, spacing, onChange, style }) => {
  const arr = new Array(max).fill(0)
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: size * max + spacing * (max - 1),
        },
        style,
      ]}
    >
      {arr.map((item, i) => (
        <Image
          key={i}
          style={{ width: size, height: size }}
          source={getSource(value, i + 1, max)}
          onPress={() => onChange(i + 1)}
        />
      ))}
    </View>
  )
}

Star.propTypes = {
  // 绑定值
  value: PropTypes.number,
  // 最大值
  max: PropTypes.number,
  // star大小
  size: PropTypes.number,
  // star间距
  spacing: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.any,
}

Star.defaultProps = {
  value: 0,
  max: 5,
  size: 17,
  spacing: 10,
  onChange: () => {},
  style: null,
}

export default Star
