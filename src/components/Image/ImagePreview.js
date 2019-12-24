import React from 'react'
import { View, Image, FlatList } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom-ck'
import Popup from '../Popup'
import MaterialIndicator from '../ActivityIndicator/MaterialIndicator'
import Header from '../Header'
import Touch from '../Touch'
import Text from '../Text'
import { Style, Size } from '../../themes'
import { typeOf, isAndroid } from '../../utils'

export default class ImagePreviewModal extends React.Component {
  static show(opt = {}) {
    Popup.show({
      children: <ImagePreviewModal {...opt} />,
      position: 'bottom',
    })
  }

  constructor(props) {
    super(props)
    const { data } = this.props
    let { index } = this.props
    index = index || 0
    const imgs = typeOf(data) === 'array' ? data : []
    const size = Style.width // 缩略图大小
    this.scrollX = index * size // 初始滚动条的x位置

    this.offsetX = 0

    this.state = {
      size,
      index,
      total: imgs.length,
      initialNumToRender: 1,
      initialScrollIndex: index,
      imgs: this.initImgs(data),
      scroll: true,
      globalLoading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        globalLoading: false,
      })
    }, 500)
  }

  initImgs(data = []) {
    const imgs = []
    data.forEach(url => {
      const item = {
        uri: `${url}?x-oss-process=image/resize,m_lfit,h_800,w_${Size.width * 2}`,
        status: 'loading',
        width: 0,
        height: 0,
        baseUri: url,
        showBase: false,
      }
      imgs.push(item)
    })
    return imgs
  }

  onMove = ({ scale }) => {
    const { scroll } = this.state
    if (scroll !== (scale === 1)) {
      this.setState({
        scroll: scale === 1,
      })
      if (scale !== 1) {
        this.correctIndex() // 修正index位置
      }
    }
  }

  // 用于修正index位置
  correctIndex = () => {
    if (this.correctTimer) {
      clearTimeout(this.correctTimer)
    }
    this.correctTimer = setTimeout(() => {
      const { size } = this.state
      const index = this.scrollX / size
      if (!Number.isInteger(index)) {
        this.refs.thumblist.scrollToIndex({ index: Math.round(index), animated: true })
      }
    }, 450)
  }

  renderItem(item, i) {
    const { scroll, globalLoading } = this.state
    if (item.status === 'loading') {
      this.getSize(item, i)
    }
    return (
      <View style={[{ width: Style.width, height: Style.height }, Style.centerRow]}>
        {item.status === 'success' && !globalLoading ? (
          <>
            <ImageZoom
              ref={ref => (this[`imageZoom_${i}`] = ref)}
              cropWidth={Size.width}
              cropHeight={Size.height}
              imageWidth={item.width}
              imageHeight={item.height}
              // horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset}
              // responderRelease={this.handleResponderRelease}
              panToMove={!scroll}
              onMove={this.onMove}
            >
              <Image
                source={{
                  uri: item.uri,
                }}
                style={{ width: item.width, height: item.height }}
              />
            </ImageZoom>
            {!item.showBase && (
              <Touch
                style={{
                  position: 'absolute',
                  bottom: 50,
                  backgroundColor: 'transparent',
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 2,
                }}
                onPress={() => {
                  this.showBase(item, i)
                }}
              >
                <Text style={{ color: 'white', fontSize: 12 }}>查看原图</Text>
              </Touch>
            )}
          </>
        ) : (
          <MaterialIndicator color="white" />
        )}
      </View>
    )
  }

  showBase(item, i) {
    const { imgs } = this.state
    imgs[i] = { ...imgs[i], uri: item.baseUri, status: 'loading', showBase: true }
    this.setState({ imgs })
  }

  getSize(item, i) {
    const { imgs } = this.state

    Image.getSize(
      item.uri,
      (w, h) => {
        const ratio = Size.width / Size.height // 屏幕款高比
        let imgW
        let imgH
        if (w / h < ratio) {
          imgH = Size.height
          imgW = imgH * ratio
        } else {
          imgW = Size.width
          imgH = imgW / (w / h)
        }
        // const imgW = w >= size ? size : w
        // const imgH = (h / w) * imgW
        const img = { ...item, uri: item.uri, width: imgW, height: imgH, status: 'success' }
        imgs[i] = img
        this.setState({ imgs })
      },
      () => {
        imgs[i].status = 'error'
        imgs[i].showBase = false
        this.setState({ imgs })
      },
    )
  }

  onScroll = e => {
    const { size, index: i } = this.state
    const index = e.nativeEvent.contentOffset.x / size
    this.scrollX = e.nativeEvent.contentOffset.x
    if (Number.isInteger(index) && index !== i) {
      this.setState({ index })
    }
  }

  onScrollBeginDrag = () => {
    if (!isAndroid()) {
      clearTimeout(this.correctTimer)
    }
  }

  onScrollEndDrag = () => {
    this.correctIndex() // 修正index位置
  }

  _onClose = () => {
    Popup.hide()
  }

  render() {
    const { size, initialScrollIndex, initialNumToRender, imgs, scroll, index, total } = this.state

    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
        <Header
          left={
            <Touch style={styles.back} onPress={this._onClose}>
              <Image
                source={require('../../assets/images/close_white.png')}
                style={styles.backIcon}
              />
            </Touch>
          }
          title={<Text style={{ color: 'white' }}>{`${index + 1} / ${total}`}</Text>}
          style={{
            position: 'absolute',
          }}
          translucent
        />
        <View style={{ flex: 1 }}>
          <FlatList
            ref="thumblist"
            data={imgs}
            initialNumToRender={initialNumToRender}
            style={{ flex: 1 }}
            renderItem={row => this.renderItem(row.item, row.index)}
            horizontal
            pagingEnabled
            scrollEventThrottle={size}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, i) => item.uri + i}
            scrollEnabled={scroll}
            getItemLayout={(data, i) => ({
              length: size,
              offset: size * i,
              index: i,
            })}
            initialScrollIndex={initialScrollIndex}
            onScroll={this.onScroll}
            onScrollBeginDrag={this.onScrollBeginDrag}
            onScrollEndDrag={this.onScrollEndDrag}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  back: {
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  backIcon: {
    width: 22,
    height: 22,
  },
}
