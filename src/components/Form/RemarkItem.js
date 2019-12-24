import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Input from '../Input'
import Text from '../Text'
import { Style } from '../../themes'

export default class RemarkItem extends React.Component {
  static defaultProps = {
    title: '备注',
    max: 140,
    value: '',
    onChangeText: () => {},
    style: null,
    required: false,
  }

  static propTypes = {
    title: PropTypes.string,
    max: PropTypes.number,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    style: PropTypes.any,
    required: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onChangeText = val => {
    const { onChangeText } = this.props
    // if (/(^\s)|(\n(.*))/.test(val)) {
    //   onChangeText(value)
    // } else {
    //   onChangeText(val)
    // }
    onChangeText(val)
  }

  render() {
    const { title, max, value, style, required, onChangeText, ...props } = this.props
    return (
      <View style={[{ backgroundColor: 'white' }, style]}>
        {title ? (
          <View style={[styles.content, styles.bottomDivider]}>
            {required && <Text style={{ color: Style.error }}>*</Text>}
            <Text>{title}</Text>
          </View>
        ) : null}
        <Input
          style={{ paddingHorizontal: 12, width: '100%', height: 150 }}
          value={value}
          multiline
          maxLength={max}
          onChangeText={this.onChangeText}
          {...props}
        />
        {!props.disabled ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 20,
              paddingTop: 0,
              paddingBottom: 16,
            }}
          >
            <Text style={{ color: '#CDD1D5', fontSize: 12 }}>
              {`${value ? value.length : '0'} / ${max}`}
            </Text>
          </View>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
  },
})
