import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import Header from '../Header'
import Touch from '../Touch'
import Text from '../Text'
import Image from '../Image'
import { Style } from '../../themes'
import router from '../../router'

class ScrollTabBar extends React.Component {
  static propTypes = {
    scrollValue: PropTypes.any,
    tabs: PropTypes.array,
    activeTab: PropTypes.number,
    goToPage: PropTypes.func,
    searchPress: PropTypes.func,
    right: PropTypes.node,
    styleLine: PropTypes.any,
  }

  static defaultProps = {
    scrollValue: null,
    tabs: [],
    activeTab: 0,
    goToPage: null,
    searchPress: null,
    right: null,
    styleLine: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      listPost: [0, 0],
    }
  }

  _onLayout(event, i) {
    const { listPost } = this.state
    if (listPost[0] > 0 && listPost[1] > 0) {
      return
    }
    const { x, width } = event.nativeEvent.layout
    const pos = (width - 12) / 2 + x
    listPost[i] = parseInt(pos, 10)
    this.setState({
      listPost,
    })
  }

  render() {
    const { listPost } = this.state
    const { scrollValue, tabs, activeTab, goToPage, searchPress, right, styleLine } = this.props
    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [listPost[0], listPost[1]],
    })
    return (
      <Header
        leftPress={() => router.pop()}
        title={
          <View style={styles.container}>
            <Animated.View
              style={[
                styles.tabUnderlineStyle,
                {
                  transform: [{ translateX }],
                },
                styleLine,
              ]}
            />
            {tabs.map((tab, i) => (
              <Touch
                key={tab}
                onPress={() => goToPage(i)}
                style={styles.tab}
                onLayout={e => this._onLayout(e, i)}
              >
                <Text
                  type="bold"
                  style={[
                    styles.title,
                    { color: activeTab === i ? Style.defaultColor : Style.lightGray },
                  ]}
                >
                  {tab}
                </Text>
              </Touch>
            ))}
          </View>
        }
        right={
          searchPress ? (
            <Touch style={{ padding: 10, paddingRight: 20 }} onPress={() => searchPress()}>
              <Image
                style={{ width: 22, height: 22 }}
                source={require('../../assets/images/search_black.png')}
              />
            </Touch>
          ) : (
            right || null
          )
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabUnderlineStyle: {
    position: 'absolute',
    width: 12,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#007AFF',
    bottom: -8,
    left: 0,
  },
  tab: {
    marginHorizontal: 10,
  },
})

export default ScrollTabBar
