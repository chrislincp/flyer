/* eslint-disable react/prop-types */
import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import PropTypes from 'prop-types'
import Home from '../home'
import Utils from '../utils'
import { Image, Text } from '../../../src'

class BottomTabBar extends React.Component {
  static propTypes = {
    focused: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const { focused, title, icon } = this.props
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image source={icon} style={{ width: 22, height: 21 }} />
        <Text
          style={[
            {
              color: focused ? '#141619' : '#191F25',
              fontWeight: focused ? 'bold' : 'normal',
              textAlign: 'center',
              fontSize: 10,
              marginTop: 4,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    )
  }
}

const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <BottomTabBar
            title="首页"
            focused={focused}
            icon={
              focused
                ? require('../../assets/images/tab_home_active.png')
                : require('../../assets/images/tab_home_normal.png')
            }
          />
        ),
      },
    },
    Utils: {
      screen: Utils,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <BottomTabBar
            title="Utils"
            focused={focused}
            icon={
              focused
                ? require('../../assets/images/tab_task_active.png')
                : require('../../assets/images/tab_task_normal.png')
            }
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      inactiveTintColor: '#191F25',
      activeTintColor: '#141619',
      style: {
        backgroundColor: 'white',
      },
    },
    animationEnabled: true,
    swipeEnabled: true,
    lazy: false,
  },
)

export default Tabs
