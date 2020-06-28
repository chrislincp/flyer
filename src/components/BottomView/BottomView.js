import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { ifIphoneX } from '../../utils'

export default class BottomView extends React.Component {
  static defaultProps = {
    containerStyle: null,
    style: null,
    children: null,
  }

  static propTypes = {
    containerStyle: PropTypes.any,
    style: PropTypes.any,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { containerStyle, style, children } = this.props
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.content, style]}>{children}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    shadowColor: '#cfd2d6',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    elevation: 10,
    paddingBottom: ifIphoneX(24, 0),
    // position: 'fixed',
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 11,
    paddingBottom: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
