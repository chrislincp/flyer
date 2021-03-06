/* eslint-disable react-native/no-unused-styles */
/**
 * 轮播图组件
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  Text,
  Image,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'
import { Size } from '../../themes'
import Touch from '../Touch'

export default class Carousel extends React.Component {
  static defaultProps = {
    childrenType: 'image',
    size: { width: Size.width, height: (Size.width * 180) / 375 },
    source: [],
    defaultPage: 0,
    direction: 'horizontal',
    autoPlay: true,
    interval: 3000,
    infinite: true,
    showDot: true,
    dotType: 'circle',
    showPagination: false,
    paginationSeparator: ' / ',
    showArrows: false,
    leftArrow: '<',
    rightArrow: '>',
    onShouldChange: () => true,
    onChange: () => {},
    onScrollBeginDrag: () => {},
    containerStyle: null,
    onPress: () => {},
    dotContentStyle: null,
    dotActiveStyle: null,
    dotNormalStyle: null,
    children: null,
  }

  static propTypes = {
    // 子view种类
    childrenType: PropTypes.oneOf(['image', 'custom']),
    // 图片尺寸
    size: PropTypes.objectOf(PropTypes.number),
    // 图片资源
    source: PropTypes.arrayOf(PropTypes.any),
    // 非受控属性，初始从第几张开始显示
    defaultPage: PropTypes.number,
    // 显示方向
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    // 是否自动播放
    autoPlay: PropTypes.bool,
    // 轮播切换时间间隔（ms）
    interval: PropTypes.number,
    // 是否无限循环
    infinite: PropTypes.bool,
    // 是否显示面板指示点
    showDot: PropTypes.bool,
    // 指示点样式
    dotType: PropTypes.oneOf(['circle', 'rect']),
    // 是否显示分页信息
    showPagination: PropTypes.bool,
    // 分隔符
    paginationSeparator: PropTypes.string,
    // 左右翻动按钮
    showArrows: PropTypes.bool,
    // 左按钮
    leftArrow: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    // 右按钮
    rightArrow: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    // 点击了第几页
    onPress: PropTypes.func,
    // 切换面板前的回调函数，可以通过返回 false 来阻止轮播
    onShouldChange: PropTypes.func,
    // 切换面板后的回调函数，参数为切换后的 index (0 开始计算)
    onChange: PropTypes.func,
    // onScrollBeginDrag 事件：开始拖拽时的回调，参数为事件对象
    onScrollBeginDrag: PropTypes.func,
    containerStyle: PropTypes.any,
    dotActiveStyle: PropTypes.any,
    dotNormalStyle: PropTypes.any,
    dotContentStyle: PropTypes.any,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)

    this._prePage = 0
    this._hasUpdatedDisplayRegion = false
    const { defaultPage } = props
    this._scrollView = null
    this.state = {
      childrenCount: 0,
      actualLoadPageCount: 0,
      curPage: defaultPage,
    }
  }

  /**
   * 静态方法区
   *
   * @memberof Carousel
   */

  /**
   * 获取轮播图数量
   */
  static getChildrenCount = props => {
    const { childrenType, source, children } = props
    let childrenCount
    if (childrenType === 'image') {
      childrenCount = source.length
    } else if (Array.isArray(children)) {
      childrenCount = children.length
    } else if (React.isValidElement(children)) {
      childrenCount = 1
    } else {
      childrenCount = 0
    }
    return childrenCount
  }

  /**
   * 获取实际加载的轮播图数量
   */
  static getActualLoadPageCount = (props, childrenCount) => {
    const { infinite } = props
    let actualLoadPageCount
    if (childrenCount <= 1) {
      actualLoadPageCount = 1
    } else if (infinite) {
      actualLoadPageCount = childrenCount + 2
    } else {
      actualLoadPageCount = childrenCount
    }
    return actualLoadPageCount
  }

  /**
   * 属性更新
   * @param {*} nextProps
   * @param {*} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const childrenCount = Carousel.getChildrenCount(nextProps)
    const actualLoadPageCount = Carousel.getActualLoadPageCount(nextProps, childrenCount)
    let { curPage } = prevState
    if (curPage >= childrenCount) {
      curPage = childrenCount - 1
    }
    return {
      curPage,
      childrenCount,
      actualLoadPageCount,
    }
  }

  /**
   * life cycle
   *
   * @memberof Carousel
   */
  componentDidMount() {
    const { curPage } = this.state
    const childrenCount = Carousel.getChildrenCount(this.props)
    const actualLoadPageCount = Carousel.getActualLoadPageCount(this.props, childrenCount)
    if (curPage >= childrenCount) {
      this.state.curPage = childrenCount - 1
    }
    this._updateChildrenCount(childrenCount)
    this._updateActualLoadPageCount(actualLoadPageCount)
    this._setTimerIfNeed(this.props, curPage, childrenCount)
  }

  componentWillUnmount() {
    this._clearTimer()
  }

  componentDidUpdate(preProps) {
    const { autoPlay, curPage } = this.state
    if (preProps.autoPlay !== autoPlay) {
      this._setTimerIfNeed(this.props, curPage)
    }
  }

  /**
   * methods
   *
   * @memberof Carousel
   */

  _onPress = () => {
    const { onPress } = this.props
    const { curPage } = this.state
    if (onPress) {
      onPress(curPage)
    }
  }

  /**
   * Timer管理
   *
   * @memberof Carousel
   */
  _setTimerIfNeed = (props, curPage, childrenCount) => {
    const { autoPlay, infinite } = props
    if (autoPlay) {
      let reachEnd = false
      if (childrenCount < 2) {
        reachEnd = true
      } else if (!infinite && curPage >= childrenCount - 1) {
        reachEnd = true
      }
      if (!reachEnd) {
        this._setTimer(props)
        return
      }
    }
    this._clearTimer()
  }

  _setTimer = () => {
    const { interval } = this.props
    this._clearTimer()
    this._timer = setInterval(this._animateToNextPage, interval)
  }

  _clearTimer = () => {
    if (this._timer) {
      clearInterval(this._timer)
    }
  }

  /**
   * 更新子view的数量
   *
   * @memberof Carousel
   */
  _updateChildrenCount = childrenCount => {
    this.setState({
      childrenCount,
    })
  }

  /**
   * 更新实际加载的页面数量
   *
   * @memberof Carousel
   */
  _updateActualLoadPageCount = actualLoadPageCount => {
    this.setState({
      actualLoadPageCount,
    })
  }

  /**
   * 更新当前页
   *
   * @memberof Carousel
   */
  _updateCurPage = curPage => {
    this.setState(
      {
        curPage,
      },
      () => {
        const { onChange } = this.props
        if (onChange) onChange(curPage)
      },
    )
  }

  /**
   * 页面切换
   *
   * @memberof Carousel
   */
  _changeToPage = (targetPage, animated, forward, causeByTimer = true) => {
    if (!this._onShouldChange(targetPage)) {
      return
    }
    const { childrenCount, actualLoadPageCount } = this.state
    if (targetPage >= childrenCount) {
      // console.warn(`目标页超出显示范围！！${targetPage}`)
      return
    }

    const { size, direction, infinite } = this.props
    const { curPage } = this.state
    const { width, height } = size

    // 在非无限播放的情况下，到了最后一张则停掉timer
    if (!infinite && targetPage >= childrenCount - 1) {
      this._clearTimer()
    }

    if (childrenCount < 2) {
      return
    }

    let actualTargetPage = targetPage
    if (Platform.OS === 'ios' || !causeByTimer) {
      if (infinite) {
        actualTargetPage = targetPage + 1
        if (childrenCount === 2) {
          if (forward && targetPage === 0) {
            actualTargetPage = childrenCount + 1
          } else if (!forward && targetPage === 1) {
            actualTargetPage = 0
          }
        } else if (curPage === 0 && targetPage === childrenCount - 1) {
          actualTargetPage = 0
        } else if (curPage === childrenCount - 1 && targetPage === 0) {
          actualTargetPage = childrenCount + 1
        }
      }
    } else if (infinite) {
      actualTargetPage = targetPage + 1
      let tempTargetPage
      if (childrenCount === 2) {
        if (forward && targetPage === 0) {
          tempTargetPage = 0
        } else if (!forward && targetPage === 1) {
          tempTargetPage = childrenCount + 1
        }
      } else if (curPage === 0 && targetPage === childrenCount - 1) {
        tempTargetPage = actualLoadPageCount - 1
      } else if (curPage === childrenCount - 1 && targetPage === 0) {
        tempTargetPage = 0
      }

      if (tempTargetPage !== undefined) {
        if (direction === 'horizontal') {
          this._scrollTo(tempTargetPage * width, 0, false)
        } else {
          this._scrollTo(0, tempTargetPage * height, false)
        }
      }
    }
    if (direction === 'horizontal') {
      this._scrollTo(actualTargetPage * width, 0, animated)
    } else {
      this._scrollTo(0, actualTargetPage * height, animated)
    }
    if (Platform.OS !== 'ios') {
      this._updateCurPage(targetPage)
    }
  }

  /**
   * 是否应该切换页面
   */
  _onShouldChange(targetPage) {
    const { curPage } = this.state
    const fromPage = curPage
    const { onShouldChange } = this.props
    return onShouldChange(fromPage, targetPage)
  }

  /**
   * 动画滚动到下一页
   */
  _animateToNextPage = () => {
    const { curPage } = this.state
    const targetPage = this._getFixedPageIdx(curPage + 1)
    this._changeToPage(targetPage, true, true)
  }

  /**
   * 计算模块
   *
   * @memberof Carousel
   */
  _getFixedPageIdx = index => {
    const { childrenType, children, source } = this.props
    let childrenCount
    if (childrenType === 'image') {
      childrenCount = source.length
    } else {
      childrenCount = children.length
    }
    if (!childrenCount) {
      childrenCount = 1
    }
    const fixedPageIdx = (index + childrenCount) % childrenCount
    return fixedPageIdx
  }

  /**
   * 通过偏移量计算当前页
   */
  _calculateCurrentPage = offset => {
    const { curPage } = this.state
    let newCurPage = curPage
    if (this._beginOffset > offset && this._beginOffset - offset > Size.width / 3) {
      newCurPage -= 1
    } else if (this._beginOffset < offset && offset - this._beginOffset > Size.width / 3) {
      newCurPage += 1
    }
    return newCurPage
  }

  /**
   * scrollview滚动控制模块
   *
   * @memberof Carousel
   */
  _scrollTo = (offsetX, offsetY, animate) => {
    if (this.scrollView) {
      // if (Platform.OS === 'android') {
      //   animate = true
      // }
      this.scrollView.scrollTo({ y: offsetY, x: offsetX, animated: animate })
    }
  }

  /**
   * 将scrollview滚动到正确位置
   */
  _placeCritical = curPage => {
    const { direction, size, infinite } = this.props
    const { width, height } = size
    const { childrenCount } = this.state
    if (childrenCount === 1) {
      this._scrollTo(0, 0, false)
    } else {
      let actualCurPage = curPage
      if (infinite) {
        actualCurPage = curPage + 1
      }
      if (direction === 'horizontal') {
        this._scrollTo(actualCurPage * width, 0, false)
      } else {
        this._scrollTo(0, actualCurPage * height, false)
      }
    }
  }

  /**
   * scrollview事件回调
   */
  _onScrollBeginDrag = event => {
    const { direction, onScrollBeginDrag } = this.props
    const { curPage } = this.state
    const { contentOffset } = event.nativeEvent
    this._beginOffset = direction === 'horizontal' ? contentOffset.x : contentOffset.y
    this._clearTimer()
    onScrollBeginDrag()
    this._prePage = curPage
  }

  _onScrollEndDrag = event => {
    if (Platform.OS === 'ios') {
      const { direction, infinite } = this.props
      const { curPage, childrenCount } = this.state
      const { contentOffset } = event.nativeEvent
      let newCurPage = curPage
      let forward = false
      if (event.nativeEvent) {
        const { velocity } = event.nativeEvent
        const { x: vX } = velocity
        if (Math.abs(vX) > 0.1) {
          if (vX > 0) {
            newCurPage = curPage + 1
          } else {
            newCurPage = curPage - 1
          }
        } else {
          const offset = direction === 'horizontal' ? contentOffset.x : contentOffset.y
          newCurPage = this._calculateCurrentPage(offset)
        }
      }
      if (
        !infinite &&
        ((curPage === childrenCount - 1 && newCurPage > curPage) ||
          (curPage === 0 && newCurPage < 0))
      ) {
        return
      }
      forward = newCurPage > curPage
      const fixedPage = this._getFixedPageIdx(newCurPage)
      this._setTimerIfNeed(this.props, fixedPage)
      if (fixedPage !== curPage) {
        this._changeToPage(fixedPage, true, forward, false)
      }
    }
  }

  _onMomentumScrollEnd = event => {
    const { direction, infinite, size } = this.props
    const { childrenCount, curPage } = this.state
    const { contentOffset } = event.nativeEvent
    const { width, height } = size
    const { x, y } = contentOffset
    let newCurPage = Math.round(direction === 'horizontal' ? x / width : y / height)
    let offset
    if (infinite) {
      if (direction === 'horizontal') {
        if (newCurPage === 0) {
          offset = childrenCount
          this._scrollTo(offset * width, 0, false)
        } else if (newCurPage === childrenCount + 1) {
          offset = 1
          this._scrollTo(offset * width, 0, false)
        }
      } else if (newCurPage === 0) {
        offset = childrenCount
        this._scrollTo(0, offset * height, false)
      } else if (newCurPage === childrenCount + 1) {
        offset = 1
        this._scrollTo(0, offset * height, false)
      }
      newCurPage -= 1
    }

    const fixedPage = this._getFixedPageIdx(newCurPage)
    if (fixedPage !== curPage) {
      // this._changeToPage(fixedPage, true, true, false);
      this._updateCurPage(fixedPage)
    }
    this._setTimerIfNeed(this.props, fixedPage)
  }

  /**
   * 渲染区
   *
   * @memberof Carousel
   */
  render() {
    const { showArrows, showDot, showPagination, direction, size, containerStyle } = this.props
    const horizontal = direction === 'horizontal'
    const { childrenCount } = this.state

    return (
      <View
        ref={ref => {
          this.container = ref
        }}
        style={[styles.container, containerStyle]}
      >
        <View style={{ ...size }}>
          {this._renderContent()}
          {/* 水平才提供 arrow */}
          {horizontal && showArrows && this._renderLeftArrows(childrenCount)}
          {horizontal && showArrows && this._renderRightArrows(childrenCount)}
          {showDot && childrenCount > 1 && this._renderDots(childrenCount)}
          {showPagination && this._renderPagination(childrenCount)}
        </View>
      </View>
    )
  }

  _renderContent = () => {
    const { curPage, childrenCount, actualLoadPageCount, animatedValue } = this.state
    const { childrenType, direction, children, source, size, infinite } = this.props
    const horizontal = direction === 'horizontal'
    const contentSize = {
      width: horizontal ? size.width * actualLoadPageCount : size.width,
      height: horizontal ? size.height : size.height * actualLoadPageCount,
    }
    const scrollChildren = []
    let page
    if (childrenCount) {
      let startPage = 0
      let endPage = childrenCount - 1
      if (infinite && childrenCount > 1) {
        startPage = -1
        endPage = childrenCount
      }
      for (let idx = startPage; idx <= endPage; idx++) {
        const fixedIdx = this._getFixedPageIdx(idx)
        if (childrenType === 'image') {
          const key = `image${idx + 10}`
          const sourceEl = source[fixedIdx]
          if (typeof sourceEl === 'number') {
            page = <Image key={key} resizeMode="stretch" source={sourceEl} style={size} />
          } else {
            page = <Image key={key} resizeMode="stretch" source={{ uri: sourceEl, ...size }} />
          }
        } else if (Array.isArray(children)) {
          page = children[fixedIdx]
        } else {
          page = children
        }
        const key = `page${idx + 100}`
        const touchablePage = (
          <Touch activeOpacity={1.0} key={key} style={{ ...size }} onPress={this._onPress}>
            {page}
          </Touch>
        )
        scrollChildren.push(touchablePage)
      }
    } else {
      page = <View style={styles.noChild} />
      const key = 'page'
      const touchablePage = (
        <TouchableWithoutFeedback key={key} style={{ ...size }} onPress={this._onPress}>
          {page}
        </TouchableWithoutFeedback>
      )
      scrollChildren.push(touchablePage)
    }

    return (
      <Animated.ScrollView
        ref={c => {
          if (c) {
            // this.scrollView = c;
            this.scrollView = c._component
          }
        }}
        onScrollBeginDrag={this._onScrollBeginDrag}
        onScrollEndDrag={this._onScrollEndDrag}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        contentInset={{ top: 0 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={horizontal}
        pagingEnabled
        bounces={false}
        contentContainerStyle={[
          {
            position: 'relative',
          },
          contentSize,
        ]}
        onLayout={e => {
          if (e) {
            this._placeCritical(curPage)
          }
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
          { useNativeDriver: true }, // <-- Add this
        )}
        scrollEventThrottle={16}
      >
        {scrollChildren}
      </Animated.ScrollView>
    )
  }

  _renderDots = childrenCount => {
    const { direction, dotType, dotContentStyle, dotActiveStyle, dotNormalStyle } = this.props
    const { curPage } = this.state
    const dotStyle = direction === 'horizontal' ? 'dotHorizontal' : 'dotVertical'
    const isRectType = dotType === 'rect'
    const dotArray = []

    const activeDotStyle = [
      styles.dot,
      styles.activeDot,
      isRectType && styles[dotStyle],
      dotActiveStyle,
    ]
    const normalDotStyle = [
      styles.dot,
      isRectType && styles[dotStyle],
      styles[`${dotType}Dot`],
      dotNormalStyle,
    ]

    for (let idx = 0; idx < childrenCount; idx++) {
      const dot = (
        <TouchableWithoutFeedback
          key={`dot${idx}`}
          onPress={() => {
            let forward = true
            if (idx < curPage) {
              forward = false
            }
            this._clearTimer()
            this._changeToPage(idx, true, forward)
            this._setTimerIfNeed(this.props, idx)
          }}
        >
          <View style={idx === curPage ? activeDotStyle : normalDotStyle} />
        </TouchableWithoutFeedback>
      )

      dotArray.push(dot)
    }
    return (
      <View style={[styles.dotsWrapper, styles[`${direction}DotsWrapper`], dotContentStyle]}>
        {dotArray}
      </View>
    )
  }

  _renderLeftArrows = childrenCount => {
    if (!childrenCount) return null

    const { curPage } = this.state
    const { leftArrow, infinite } = this.props

    const isText = typeof leftArrow === 'string'
    const leftArrowView = isText ? <Text style={styles.arrowText}>{leftArrow}</Text> : leftArrow
    return (
      <View style={styles.leftArrowContainer}>
        <Touch
          style={[styles.arrowWrapper, styles.leftArrowWrapper]}
          onPress={() => {
            if (!infinite && curPage === 0) {
              return
            }
            this._clearTimer()
            const fixedCurPage = this._getFixedPageIdx(curPage - 1)
            this._changeToPage(fixedCurPage, true, false)
            this._setTimerIfNeed(this.props, fixedCurPage)
          }}
        >
          {leftArrowView}
        </Touch>
      </View>
    )
  }

  _renderRightArrows = childrenCount => {
    if (!childrenCount) return null

    const { curPage } = this.state
    const { rightArrow, infinite } = this.props

    const isText = typeof rightArrow === 'string'
    const rightArrowView = isText ? <Text style={styles.arrowText}>{rightArrow}</Text> : rightArrow

    return (
      <View style={styles.rightArrowContainer}>
        <Touch
          style={[styles.arrowWrapper, styles.rightArrowWrapper]}
          onPress={() => {
            if (!infinite && curPage === childrenCount - 1) {
              return
            }
            this._clearTimer()
            const fixedCurPage = this._getFixedPageIdx(curPage + 1)
            this._changeToPage(fixedCurPage, true, false)
            this._setTimerIfNeed(this.props, fixedCurPage)
          }}
        >
          {rightArrowView}
        </Touch>
      </View>
    )
  }

  _renderPagination = childrenCount => {
    if (!childrenCount) return null

    const { curPage } = this.state
    const { paginationSeparator } = this.props

    return (
      <View style={styles.paginationContainer} pointerEvents="none">
        <View style={styles.paginationWrapper}>
          <Text style={styles.paginationText}>
            {`${curPage + 1}${paginationSeparator}${childrenCount}`}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // 容器
  container: {},
  // 指示点
  dotsWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 8,
    height: 4,
    backgroundColor: '#fff',
  },
  // 分页
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationWrapper: {
    width: 80,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(234, 234, 234, 0.5)',
  },
  paginationText: {
    textAlign: 'center',
    color: '#2b2b2b',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 左右箭头
  leftArrowContainer: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightArrowContainer: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  arrowWrapper: {
    width: 34,
    height: 34,
    borderRadius: 3,
    backgroundColor: 'rgba(51, 51, 51, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrowWrapper: {},
  rightArrowWrapper: {},
  arrowText: {
    color: '#fafafa',
  },
  dotHorizontal: {
    width: 18,
    height: 4,
  },
  dotVertical: {
    width: 4,
    height: 18,
  },
  horizontalDotsWrapper: {
    left: 0,
    right: 0,
    bottom: 10,
    flexDirection: 'row',
  },
  verticalDotsWrapper: {
    top: 0,
    right: 10,
    bottom: 0,
    flexDirection: 'column',
  },
  circleDot: {
    margin: 6,
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  rectDot: {
    margin: 5,
    borderRadius: 2,
    backgroundColor: 'rgba(231, 231, 231, 0.4)',
  },
})
