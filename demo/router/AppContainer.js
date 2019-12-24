import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
// eslint-disable-next-line import/no-unresolved
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'
import routes from './routes'

const AppStack = createStackNavigator(routes, {
  headerMode: 'none',
  navigationOptions: () => ({
    header: null,
    gesturesEnabled: true,
  }),
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal, // StackNavigator设置android水平转场动画
  }),
})

export const RootStack = createSwitchNavigator(
  {
    AppStack,
  },
  {
    initialRouteName: 'AppStack',
  },
)

export default createAppContainer(RootStack)
