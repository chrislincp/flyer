import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Collapsible from 'react-native-collapsible'
import Touch from '../Touch'
import Image from '../Image'
import Text from '../Text'
import styles from './styles'

const FoldedPanel = ({ title, titleStyle, children }) => {
  const [collapsed, toggle] = useState(false)
  return (
    <Fragment>
      <Touch onPress={() => toggle(!collapsed)} style={styles.collapsedHeader}>
        {typeof title === 'string' ? <Text style={titleStyle}>{title}</Text> : title}
        <Image
          source={require('../../assets/images/right_arrow.png')}
          style={{
            width: 12,
            height: 12,
            marginLeft: 4,
            transform: [{ rotate: `${collapsed ? 0 : 45}deg` }],
          }}
        />
      </Touch>
      <Collapsible collapsed={collapsed}>{children}</Collapsible>
    </Fragment>
  )
}
FoldedPanel.defaultProps = {
  title: '',
  titleStyle: null,
  children: null,
}

FoldedPanel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleStyle: PropTypes.any,
  children: PropTypes.node,
}

export default FoldedPanel
