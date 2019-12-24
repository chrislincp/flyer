import React from 'react'
import Touch from '../Touch'
import { Style } from '../../themes'

const Card = ({ style, children, ...props }) => (
  <Touch
    style={[
      {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        shadowColor: Style.shadowColor,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
        elevation: 4,
      },
      style,
    ]}
    {...props}
  >
    {children}
  </Touch>
)

export default Card
