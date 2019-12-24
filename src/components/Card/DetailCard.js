import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Style } from '../../themes'
import Text from '../Text'
import Touch from '../Touch'
import { detailCardStyle as styles } from './styles'

const DetailCard = ({
  style,
  contentStyle,
  header,
  title,
  titleStyle,
  titleTextStyle,
  right,
  left,
  footer,
  footerText,
  onPressFooter,
  children,
}) => (
  <View style={[{ backgroundColor: 'white' }, style]}>
    {header ? (
      header()
    ) : title ? (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            paddingBottom: children ? 0 : 16,
          },
          titleStyle,
        ]}
      >
        {left}
        <Text style={[Style.headerTitle, titleTextStyle]}>{title}</Text>
        {right}
      </View>
    ) : null}
    <View style={[{ padding: 16 }, contentStyle]}>{children}</View>
    {footer ? (
      footer()
    ) : footerText ? (
      <Touch onPress={() => onPressFooter()} style={[styles.footer, Style.topDivider]}>
        <Text style={{ color: Style.themeColor }}>{footerText}</Text>
      </Touch>
    ) : null}
  </View>
)

DetailCard.propTypes = {
  style: PropTypes.any,
  contentStyle: PropTypes.any,
  header: PropTypes.func,
  title: PropTypes.string,
  titleStyle: PropTypes.any,
  titleTextStyle: PropTypes.any,
  footer: PropTypes.func,
  footerText: PropTypes.string,
  onPressFooter: PropTypes.func,
  children: PropTypes.node,
  right: PropTypes.node,
  left: PropTypes.node,
}

DetailCard.defaultProps = {
  style: null,
  contentStyle: null,
  header: null,
  title: '',
  titleStyle: '',
  titleTextStyle: '',
  footer: null,
  footerText: '',
  onPressFooter: () => {},
  children: null,
  right: null,
  left: null,
}

export default DetailCard
