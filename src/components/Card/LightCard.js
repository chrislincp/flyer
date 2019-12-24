import React from 'react'
import { View } from 'react-native'
import Text from '../Text'
import { Style } from '../../themes'

const LightCard = ({ style, children, ...props }) => (
  <View
    style={[
      {
        backgroundColor: '#F8F8F9',
        borderRadius: 4,
        padding: 10,
      },
      style,
    ]}
    {...props}
  >
    {typeof children === 'string' ? (
      <Text style={[Style.lightText, { lineHeight: 19 }]}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default LightCard
