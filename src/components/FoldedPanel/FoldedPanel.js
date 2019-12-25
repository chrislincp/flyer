import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Collapsible from 'react-native-collapsible'
import Touch from '../Touch'
import Image from '../Image'
import Text from '../Text'
import styles from './styles'
import { Style } from '../../themes'

const FoldedPanel = ({ title, children }) => {
  const [collapsed, toggle] = useState(false)
  return (
    <Fragment>
      <Touch onPress={() => toggle(!collapsed)} style={styles.collapsedHeader}>
        <Text style={Style.subTitle}>{title}</Text>
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
  children: null,
}

FoldedPanel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
}

export default FoldedPanel
