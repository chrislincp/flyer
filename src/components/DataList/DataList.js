import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import List from '../List'
import { MaterialIndicator } from '../ActivityIndicator'
import Text from '../Text'
import Toast from '../Toast'
import LoadingPage from '../LoadingPage'
import DefaultPage from '../DefaultPage'
import styles from './styles'
import { Style } from '../../themes'

export default class DataList extends React.Component {
  static propTypes = {
    refreshStyle: PropTypes.any,
    style: PropTypes.any,
    renderItem: PropTypes.func,
    renderFixedHeader: PropTypes.func,
    renderHeader: PropTypes.func,
    renderSeparator: PropTypes.func,
    keyExtractor: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    onScroll: PropTypes.func,
    onStatus: PropTypes.func,
    service: PropTypes.func.isRequired,
    size: PropTypes.number,
    params: PropTypes.object,
    convertData: PropTypes.func,
    mountLoad: PropTypes.bool,
    renderEmpty: PropTypes.func,
    renderError: PropTypes.func,
    renderOffline: PropTypes.func,
    renderLoading: PropTypes.func,
  }

  static defaultProps = {
    refreshStyle: null,
    style: null,
    renderItem: () => {},
    renderFixedHeader: () => {},
    renderHeader: () => {},
    renderSeparator: null,
    keyExtractor: null,
    onEndReachedThreshold: 0.2,
    onScroll: null,
    onStatus: () => {},
    size: 20,
    params: {},
    convertData: res => res.data,
    mountLoad: true,
    renderEmpty: null,
    renderError: null,
    renderOffline: null,
    renderLoading: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      res: {},
      page: 1,
      refreshing: false,
      size: props.size,
      status: 'begin', // [begin, end, success, error, offline, empty]
      loading: false,
      params: Object.assign({}, props.params),
    }
  }

  componentDidMount() {
    const { mountLoad } = this.props
    if (mountLoad) this.reload()
  }

  componentWillReceiveProps(nextProps) {
    const nextParams = nextProps.params
    const { params } = this.state
    let isChange = false
    if (Object.keys(nextParams).length === Object.keys(params).length) {
      Object.keys(nextParams).forEach(key => {
        if (nextParams[key] !== params[key]) isChange = true
      })
    } else {
      isChange = true
    }
    if (isChange) {
      this.setState({ params: Object.assign({}, nextParams) })
      this.reload()
    }
  }

  renderEmpty() {
    const { renderEmpty, emptyTitle } = this.props
    return renderEmpty ? (
      renderEmpty()
    ) : (
      <DefaultPage title={emptyTitle || '暂无数据'} type="empty" />
    )
  }

  renderError() {
    const { renderError } = this.props
    return renderError ? (
      renderError()
    ) : (
      <DefaultPage title="连接服务器出错" type="error" onPress={() => this.reload()} />
    )
  }

  renderOffline() {
    const { renderOffline } = this.props
    return renderOffline ? (
      renderOffline()
    ) : (
      <DefaultPage title="暂无网络连接" type="offline" onPress={() => this.reload()} />
    )
  }

  showEmptyView(status) {
    const { renderHeader, style } = this.props
    return (
      <View style={[{ flex: 1 }, style]}>
        {renderHeader()}
        {status === 'empty' && this.renderEmpty()}
        {status === 'error' && this.renderError()}
        {status === 'offline' && this.renderOffline()}
      </View>
    )
  }

  renderLoadinng() {
    const { renderLoadinng, style } = this.props
    return (
      <View style={[{ flex: 1 }, style]}>
        {renderLoadinng ? renderLoadinng() : <LoadingPage />}
      </View>
    )
  }

  _renderFooter() {
    const { loading, status } = this.state
    const endTitle = '这是我的底线'
    if (status === 'end') {
      return (
        <View style={[Style.centerRow, styles.footer]}>
          <View style={{ width: 50, height: 1, backgroundColor: Style.lightGray }} />
          <Text style={styles.footerText}>{`   ${endTitle}   `}</Text>
          <View style={{ width: 50, height: 1, backgroundColor: Style.lightGray }} />
        </View>
      )
    }

    return loading ? (
      <View style={[styles.centerRow, styles.footer]}>
        <MaterialIndicator />
      </View>
    ) : null
  }

  reload(type = 'begin') {
    const { data, res } = this.state
    const { onStatus } = this.props
    this.setState(
      {
        page: 1,
        data: type === 'begin' ? [] : data,
        status: type,
      },
      () => {
        onStatus(type, type === 'begin' ? [] : data, res)
        this.getListData(type)
      },
    )
  }

  getListData(type) {
    const { service, convertData, onStatus } = this.props
    const { data, page, size, params } = this.state
    const opt = {
      ...params,
      page,
      size,
    }
    this.setState({
      loading: true,
    })
    service(opt)
      .then(res => {
        const resData = convertData(res) || []
        if (page === 1) {
          this.setState({ data: resData, res })
        } else {
          this.setState({
            data: data.concat(resData),
          })
        }

        //  防止上拉加载更多重复触发
        setTimeout(() => {
          const status =
            page === 1 && !resData.length ? 'empty' : resData.length < size ? 'end' : 'success'
          this.setState({
            page: page + 1,
            status,
            loading: false,
          })
          onStatus(status, resData, res)
        }, 500)

        switch (type) {
          case 'refresh':
            this.finishRefresh()
            break
          default:
            break
        }
      })
      .catch(err => {
        const { status } = err
        this.setState({
          status,
          loading: false,
        })
        this.finishRefresh()
        onStatus(status, err)
        if (status === 'error') Toast.show(err.msg)
      })
  }

  onRefresh() {
    this.setState(
      {
        page: 1,
      },
      () => this.reload('refresh'),
    )
  }

  onScroll(event) {
    const { onEndReachedThreshold, onScroll } = this.props
    const { status, loading } = this.state
    const { contentSize, contentOffset, layoutMeasurement } = event.nativeEvent
    const loadMore =
      contentSize.height - contentOffset.y <
      layoutMeasurement.height + contentSize.height * onEndReachedThreshold
    if (loadMore && !loading && status !== 'end') {
      this.getListData()
    }
    if (onScroll) onScroll(event)
  }

  getCurrentData() {
    const { data } = this.state
    return data
  }

  startRefresh() {
    this.setState({ refreshing: true })
    this.onRefresh()
  }

  finishRefresh() {
    this.setState({ refreshing: false })
  }

  render() {
    const {
      style,
      renderItem,
      renderFixedHeader,
      renderHeader,
      renderSeparator,
      keyExtractor,
      onEndReachedThreshold,
      ...props
    } = this.props

    const { data, status, refreshing } = this.state
    const emptyStatus = ['error', 'offline', 'empty']
    return (
      <View style={{ flex: 1 }}>
        {renderFixedHeader()}
        {!data.length ? (
          emptyStatus.includes(status) ? (
            this.showEmptyView(status)
          ) : (
            this.renderLoadinng()
          )
        ) : (
          <List
            {...props}
            onRefresh={() => this.startRefresh()}
            refreshing={refreshing}
            style={style}
            data={data}
            renderItem={({ item, index }) => renderItem(item, index)}
            ListHeaderComponent={renderHeader()}
            ListFooterComponent={this._renderFooter()}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={(item, index) =>
              keyExtractor ? keyExtractor(item, index) : index.toString()
            }
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            onScroll={e => this.onScroll(e)}
          />
        )}
      </View>
    )
  }
}
