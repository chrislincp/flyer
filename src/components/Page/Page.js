import React, { Fragment } from 'react'
import { View, StatusBar, RefreshControl } from 'react-native'
import { SafeAreaView, NavigationEvents } from 'react-navigation'
import PropTypes from 'prop-types'
import { Style } from '../../themes'
import router from '../../router'
import LoadingPage from '../LoadingPage'
import styles from './styles'
import DefaultPage from '../DefaultPage'
import Header from '../Header'
import Scroll from '../Scroll'

export default class Page extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props)
    StatusBar.setBarStyle('dark-content', true)
    const { navigation } = this.props
    const parentNavigation = navigation.dangerouslyGetParent()
    router.setRouters(parentNavigation.state.routes, parentNavigation)
    this.navParams = navigation.state.params
    this.$route = navigation.state
    this.router = router
    this.state = {}
  }

  _renderHeader() {
    return <Header leftPress={() => this.router.pop()} {...this._headerProps()} />
  }

  _headerProps() {
    return {}
  }

  _safeAreaStyle() {
    return {}
  }

  _safeAreaInset() {
    return {}
  }

  onDidFocus() {
    this.onWillFocus()
  }

  onDidBlur() {
    this.onWillBlur()
  }

  onWillFocus() {}

  onWillBlur() {}

  componentDidMount() {
    this.mounted()
  }

  mounted() {}

  componentWillUnmount() {
    this.onDidBlur()
    this.unmount()
  }

  unmount() {}

  _renderOffline() {
    const props = {
      type: 'offline',
      title: '暂无网络连接',
      showButton: true,
    }
    return <DefaultPage {...Object.assign(props, this._offlineProps())} />
  }

  _offlineProps() {
    return {}
  }

  _renderError() {
    const props = {
      type: 'error',
      title: '连接服务器出错',
      showButton: true,
    }
    return <DefaultPage {...Object.assign(props, this._errorProps())} />
  }

  _errorProps() {
    return {}
  }

  _renderEmpty() {
    const props = {
      type: 'empty',
      title: '暂无数据',
      showButton: false,
    }
    return <DefaultPage {...Object.assign(props, this._emptyProps())} />
  }

  _emptyProps() {
    return {}
  }

  _renderLoading() {
    return <LoadingPage {...this._loadingProps()} />
  }

  _loadingProps() {
    return {}
  }

  _renderBase() {
    return null
  }

  _render() {
    return null
  }

  _renderProps() {
    return {}
  }

  _renderFooter() {
    return null
  }

  _pageStyle() {
    return {}
  }

  _onRefresh() {}

  render() {
    const safeAreaInset = Object.assign({ top: 'never', bottom: 'never' }, this._safeAreaInset()) //  顶部不需要安全距离
    const { screenState, refreshing } = this.state
    return (
      <SafeAreaView style={[styles.container, this._safeAreaStyle()]} forceInset={safeAreaInset}>
        <NavigationEvents onDidFocus={() => this.onDidFocus()} onDidBlur={() => this.onDidBlur()} />
        <Fragment>
          {this._renderHeader()}
          {screenState === 'error' ? this._renderError() : null}
          {screenState === 'offline' ? this._renderOffline() : null}
          {screenState === 'loading' ? this._renderLoading() : null}
          {screenState === 'empty' ? this._renderEmpty() : null}
          {screenState === 'success' || !screenState ? (
            this._renderBase() ? (
              <View style={{ flex: 1, backgroundColor: Style.bgColor }} {...this._renderProps()}>
                {this._renderBase()}
              </View>
            ) : (
              <Scroll
                showsVerticalScrollIndicator={false}
                refreshControl={
                  refreshing !== undefined && (
                    <RefreshControl refreshing={refreshing} onRefresh={() => this._onRefresh()} />
                  )
                }
                style={{ flex: 1, backgroundColor: Style.bgColor }}
                {...this._renderProps()}
              >
                {this._render()}
              </Scroll>
            )
          ) : null}
          {screenState === 'success' || !screenState ? this._renderFooter() : null}
        </Fragment>
      </SafeAreaView>
    )
  }
}
