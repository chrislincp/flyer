import React from 'react'
import {TextProps} from 'react-native'
export interface ActionSheetProps {
  clear?: boolean;
  multiple?: boolean;
  title?: string;
  data?: any[];
  onClose?(): void;
  onChange?(): void;
  config?: object;
  value?: string | number | any[];
}

export interface IndicatorProps {
  animationEasing?(): void;
  animationDuration?: number;
  animating?: boolean;
  interaction?: boolean;
  renderComponent?(): void;
  count?: number;
}

export interface BarIndicatorProps extends IndicatorProps {
  count?: number;
  color?: string;
  size?: number;
}
export interface BallIndicatorProps extends IndicatorProps {
  count?: number;
  color?: string;
  size?: number;
}

export interface DotIndicatorProps extends IndicatorProps {
  animationEasing?: any;
  count?: number;
  color?: string;
  size?: number;
}

export interface MaterialIndicatorProps extends IndicatorProps {
  animationDuration?: number;
  color?: string;
  size?: number;
}

export interface PacmanIndicatorProps extends IndicatorProps {
  animationDuration?: number;
  color?: string;
  size?: number;
}

export interface PulseIndicatorProps extends IndicatorProps {
  animationEasing?: any;
  color?: string;
  size?: number;
}

export interface SkypeIndicatorProps extends IndicatorProps {
  animationDuration?: number;
  count?: number;
  color?: string;
  size?: number;
}

export interface NativeIndicatorProps extends IndicatorProps {
  count?: number;
  color?: string;
  size?: number;
}

export interface ButtonProps {
  title?:  string | React.ReactNode;
  type?: 'success' | 'warning' | 'error' | 'primary' | 'normal';
  disabled?: boolean;
  style?: any;
  titleStyle?: any;
  onPress?(): void;
  children?: string | React.ReactNode;
}
export interface GradientButtonProps {
  onPress?(): void;
  style?: any;
  textStyle?: any;
  title?: string;
  colors?: string[];
  start?: object;
  end?: object;
  circle?: boolean;
  disabled?: boolean;
  height?: number;
  type?: 'primary' | 'success' | 'error';
}

export interface CardProps {
  style?: any;
  children?: React.ReactNode;
  [propName: string]: any;
}

export interface LightCardProps {
  style?: any;
  children?: React.ReactNode;
  [propName: string]: any;
}

export interface DetailCardProps {
  style?: any;
  contentStyle?: any;
  header?(): void;
  title?: string;
  titleStyle?: any;
  titleTextStyle?: any;
  right?: React.ReactNode;
  left?: React.ReactNode;
  footer?(): void;
  footerText?: string;
  onPressFooter?(): void;
  children?: React.ReactNode;
}

export interface CarouselProps {
  // 子view种类
  childrenType?: 'image' | 'custom';
  // 图片尺寸
  size?: object;
  // 图片资源
  source?: ImageSourcePropType;
  // 非受控属性，初始从第几张开始显示
  defaultPage?: number;
  // 显示方向
  direction?: 'horizontal' | 'vertical';
  // 是否自动播放
  autoPlay?: boolean;
  // 轮播切换时间间隔（ms）
  interval?: number;
  // 是否无限循环
  infinite?: boolean;
  // 是否显示面板指示点
  showDot?: boolean;
  // 指示点样式
  dotType?: 'circle' | 'rect';
  // 是否显示分页信息
  showPagination?: boolean;
  // 分隔符
  paginationSeparator?: string;
  // 左右翻动按钮
  showArrows?: boolean;
  // 左按钮
  leftArrow?: string | React.ReactNode;
  // 右按钮
  rightArrow?: string | React.ReactNode;
  // 点击了第几页
  onPress?(): void;
  // 切换面板前的回调函数，可以通过返回 false 来阻止轮播
  onShouldChange?(): void;
  // 切换面板后的回调函数，参数为切换后的 index (0 开始计算)
  onChange?(): void;
  // onScrollBeginDrag 事件：开始拖拽时的回调，参数为事件对象
  onScrollBeginDrag?(): void;
  containerStyle?: any;
  dotActiveStyle?: any;
  dotNormalStyle?: any;
  dotContentStyle?: any;
  children?: React.ReactNode;
}

export interface DataListProps {
  refreshStyle?: any;
  style?: any;
  renderItem(): void;
  renderFixedHeader?(): void;
  renderHeader?(): void;
  renderSeparator?(): void;
  keyExtractor?(): void;
  keyExtractor?(): void;
  onEndReachedThreshold?: number
  onScroll?(): void;
  onStatus?(): void;
  service(): void;
  size?: number;
  params?: object;
  convertData?(): void;
  mountLoad?: boolean
  renderEmpty?(): void;
  renderError?(): void;
  renderOffline?(): void;
  renderLoading?(): void;
}


export class DatePicker extends React.Component {
  static show?(): void;
}

export interface DefaultPageProps {
  title?: string;
  source?: any;
  showButton?: boolean;
  buttonText?: string;
  onPress?(): void;
  type?: 'empty' | 'error' | 'offline';
}

export interface DialogProps {
  // 蒙层是否可关闭
  maskClosable?: boolean;
  // 动画类型
  animationType?: string;
  // 是否使用动画
  animateWhenMount?: boolean;
  // title
  title?: string | React.ReactNode;
  // modal类型
  type?: 'confirm' | 'alert';
  // 确认按钮文案
  okText?: string;
  // 确认按钮样式
  okStyle?: object | any[];
  // 确认按钮文本样式
  okTextStyle?: object | any[];
  // 取消按钮文案
  cancelText?: string;
  // 取消按钮样式
  cancelStyle?: object | any[];
  // 取消文本样式
  cancelTextStyle?: object | any[];
  // 内容
  content?: string | React.ReactNode;
  // 关闭回调
  onClose?(): void;
  // 取消
  onCancel?(): void;
  // 确定
  onOk?(): void;
  // 底部
  footer?: React.ReactNode;

  showClose?: boolean;
}

export interface DragListProps {
  data?: any[];
  onChange?(): void;
  renderRow?(): void;
}
export interface FoldedPanelProps {
  title?: string | React.ReactNode;
  titleStyle?: any;
  children?: React.ReactNode;
}

export interface HeaderProps {
  height?: number;
  backgroundColor?: string;
  style?: object | any[];
  title?: string | React.ReactNode;
  centerStyle?: object | any[];
  left?: React.ReactNode;
  leftStyle?: object | any[];
  leftPress?(): void;
  onSearch?(): void;
  right?: React.ReactNode;
  rightStyle?: object | any[];
  translucent?: boolean;
  titleTransparent?: boolean;
  children?: React.ReactNode;
  opacityConf?: any[];
}

export interface InputProps {
  value: number | string;
  style?: object | any[];
  inputStyle?: object | any[];
  multiline?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  clear?: boolean;
  disabled?: boolean;
  onChangeText?(): void;
  onFocus?(): void;
  onBlur?(): void;
  checkType?: 'phone' | 'idCard';
  left?: React.ReactNode;
  right?: React.ReactNode;
  transparent?: boolean;
}

export interface LoadingPageProps {
  style?: any;
  titleStyle?: any;
  title?: any;
}
export interface ModalProps {
  // 是否可见
  visible?: boolean;
  // 动画类型：none(没有)| fade（渐隐渐显）| slide（从底部出现）| slide-down（从顶部出现）| slide-left（从左侧出现）| slide-right（从右侧出现）| scale(放缩) | fade_scale(渐隐渐现放缩)|alert(弹窗)
  animationType?: 
    'none' |
    'fade' |
    'slide' |
    'slide-down' |
    'slide-left' |
    'slide-right' |
    'scale' |
    'fade-scale' |
    'alert';
  // 动画时长
  animationDuration?: number;
  // 点击遮罩是否可关闭
  maskClosable?: boolean;
  // 首次加载动画
  animateWhenMount?: boolean;
  // 是否有弹簧效果
  springEffect?: boolean;
  // 关闭回调
  onClose?(): void;
  // 动画结束回调
  onAnimationEnd?(): void;
  style?: any;
  maskStyle?: any;
  bodyStyle?: any;
  children?: React.ReactNode;
  offset?: number;
}

export interface ActionSheetProps {
 clear?: boolean;
 multiple?: boolean;
 title?: string;
 data?: any[];
 onClose?(): void;
 onChange?(): void;
 config?: object;
 value?: string | number | any[];
}

export interface PopMenuProps {
  position?: 'left' | 'right';
  offsetX?: number;
  offsetY?: number;
  data?: any[];
  config?: object;
  onChange?(): void;
  value?: string;
}

export interface PopupProps {
  position?: 'top' | 'bottom' | 'left' | 'bottom';
  offset?: number;
  visible?: boolean;
  // animateWhenMount?: boolean;
  onClose?(): void;
  style?: any;
  children?: any;
}

export interface ProgressProps {
  // 进度0-100
  percent?: number;
  // 尺寸 small default large
  size?: 'default' | 'small' | 'large';
  // 位置 top normal
  position?: 'top' | 'normal';
  // 显示进度未满区域
  showUnfill?: boolean;
  // 进度条右边缘是否呈线形
  progressMarginLinear?: boolean;
  appearTransition?: boolean;
  style?: any;
  circle?: boolean;
}

export interface ScrollProps {
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: 'never' | 'always' | 'handled';
  style?: any;
  children?: React.ReactNode;
}

export interface ScrollTabBarProps {
  scrollValue?: any;
    tabs?: any[];
    activeTab?: number;
    goToPage?(): void;
    searchPress?(): void;
    right?: React.ReactNode;
    styleLine?: any;
}

export interface StarProps {
  // 绑定值
  value?: number;
  // 最大值
  max?: number;
  // star大小
  size?: number;
  // star间距
  spacing?: number;
  onChange?(): void;
  style?: any;
}

export interface StepperProps {
  disabled?: boolean;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  onChange?(): void;
}

export interface SwitchProps {
  style?: any;
  active?: boolean;
  width?: number;
  height?: number;
  disabled?: boolean;
  activeColor?: any;
  disabledActiveColor?: any;
  inactiveColor?: any;
  disabledInactiveColor?: any;
  disabledDotColor?: any;
  dotColor?: any;
  onChange?(): void;
  title?: any[];
}

export interface TagProps {
  type?: 'primary' | 'success' | 'error' | 'warning' | 'normal'| 'light';
  style?: any;
  textStyle?: any;
  title?: string;
}

export interface TouchProps {
  activeOpacity?: number;
  onPress?(): void;
  disabled?: boolean;
  children?: React.ReactNode;
  noDebounce?: boolean;
  keyboardDismiss?: boolean;
}

export interface SizeProps {
  readonly width: number;
  readonly height: number;
  readonly hairlineWidth: number;
}

export interface StyleProps {
  // Colors
  readonly themeColor: string;
  readonly warning: string;
  readonly success: string;
  readonly white: string;
  readonly black: string;
  readonly dark: string;
  readonly defaultColor: string;
  readonly shadowColor: string;
  readonly lightGray: string;
  readonly bgColor: string;
  readonly dividerColor: string;
  readonly inputBg: string;
  readonly disabledColor: string;
  readonly placeholder: string;
  readonly grayBtnBg: string;
  // Size
  readonly width: number;
  readonly height: number;
  readonly hairlineWidth: number;
  // CommonStyle
  readonly container: object;
  readonly headerTitle: object;
  readonly defaultText: object;
  readonly centerRow: object;
  readonly spaceRow: object;
  readonly divider: object;
  readonly topDivider: object;
  readonly leftDivider: object;
  readonly rightDivider: object;
  readonly bottomDivider: object;
  readonly lightText: object;
  readonly subTitle: object;
  readonly smallTitle: object;
  readonly searchInput: object;
  readonly listCard: object;
  readonly betweenRow: object;

}










export class ActionSheet extends React.Component<ActionSheetProps> {
  static show?(): void;
}

// Indicators
export class Indicator extends React.Component<IndicatorProps> {}
export class BarIndicator extends React.Component<BarIndicatorProps> {}
export class BallIndicator extends React.Component<BallIndicatorProps> {}
export class DotIndicator extends React.Component<DotIndicatorProps> {}
export class MaterialIndicator extends React.Component<MaterialIndicatorProps> {}
export class PacmanIndicator extends React.Component<PacmanIndicatorProps> {}
export class PulseIndicator extends React.Component<PulseIndicatorProps> {}
export class SkypeIndicator extends React.Component<SkypeIndicatorProps> {}
export class NativeIndicator extends React.Component<NativeIndicatorProps> {}

export class BottomView extends React.Component {}
// button
export class Button extends React.Component <ButtonProps> {}
export class GradientButton extends React.Component <GradientButtonProps> {}


export class Card extends React.Component<CardProps> {}

export class LightCard extends React.Component<LightCardProps> {}

export class DetailCard extends React.Component<DetailCardProps> {}

export class Carousel extends React.Component<CarouselProps> {}

export class DataList extends React.Component<DataListProps> {}

export class DefaultPage extends React.Component<DefaultPageProps> {}

export class Dialog extends React.Component<DialogProps> {
  static confirm?(): void;
  static alert?(): void;
  static hide?(): void;
}

export class DragList extends React.Component<DragListProps> {}

export class FoldedPanel extends React.Component<FoldedPanelProps> {}

export class Form extends React.Component {
  static Base?: React.Component;

  static Input?: React.Component;

  static Remark?: React.Component;

  static Stepper?: React.Component;
}

export class Header extends React.Component <HeaderProps> {}
export class Image extends React.Component {
  static show?(): void;
}


export class Input extends React.Component <InputProps> {}

export class List extends React.Component {}

export class LoadingPage extends React.Component<LoadingPageProps> {}

export class Modal extends React.Component<ModalProps> {
  static show?(): void;
  static hide?(): void;
}

export class Page extends React.Component {
  _renderHeader?(): void;
  _headerProps?(): void;
  _safeAreaStyle?(): void;
  _safeAreaInset?(): void;
  onWillFocus?(): void;
  onWillBlur?(): void;
  mounted?(): void;
  unmount?(): void;
  _renderOffline?(): void;
  _offlineProps?(): void;
  _renderError?(): void;
  _errorProps?(): void;
  _renderEmpty?(): void;
  _emptyProps?(): void;
  _renderLoading?(): void;
  _loadingProps?(): void;
  _renderBase?(): void;
  _render?(): void;
  _renderProps?(): void;
  _renderFooter?(): void;
  _pageStyle?(): void;
  _onRefresh?(): void;
}

export class PopMenu extends React.Component<PopMenuProps> {}


export class Popup extends React.Component<PopupProps> {
  static show?(): void;
  static update?(): void;
  static hide?(): void;
}

export class Progress extends React.Component<ProgressProps> {}

export class Scroll extends React.Component <ScrollProps> {}

export class ScrollTabView extends React.Component {}

export class ScrollTabBar extends React.Component<ScrollTabBarProps> {}

export class Star extends React.Component<StarProps> {}

export class Stepper extends React.Component<StepperProps> {}

export class Switch extends React.Component<SwitchProps> {}

export class Tag extends React.Component<TagProps> {}

export class Text extends React.Component<TextProps> {}

export class Toast extends React.Component {
  static success?(): void;
  static loading?(): void;
  static error?(): void;
  static show?(): void;
  static hide?(): void;
}

export class Touch extends React.Component <TouchProps> {}

export const Size: SizeProps;

export const Style: StyleProps;

export class Storage {
  static get?(key: string | number): void;
  static multiGet?(keysArray: any[]): void;
  static getAll?(): void;
  static set?(key: string | number, value: any): void;
  static update?(key: string | number, value: any): void;
  static delete?(key: string | number): void;
  static multiDelete?(): void;
}

export function typeOf(para: any)

export function cloneDeep(para: any)

export function isNumber(para: any)

export function isAndroid()

export function isIos()

export function isIphoneX()

export function ifAndroid(
  androidStyle?: any, 
  iosStyle?: any,
)

export function ifIphoneX(
  iphoneXStyle?: any, 
  otherStyle?: any,
)

export class Router {
  static setRouters?(routers: any[], navigation: any): void;
  static navigate?(routeName: string, params?: object): void;
  static push?(routeName: string, params?: object): void;
  static pop?(routeNameOrStepsNum?: string | number | null | undefined): void;
  static popToTop?(): void;
  static replace?(routeName: string, params?: object): void;
  static reset?(routeArr: any[]): void;
}