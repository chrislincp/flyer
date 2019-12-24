import React from 'react'
import PropTypes from 'prop-types'
import BaseItem from './BaseItem'
import Input from '../Input'
import Text from '../Text'

export default class InputItem extends React.Component {
  static defaultProps = {
    isLast: false,
    unit: '',
    right: null,
    title: '',
    required: false,
    inputStyle: null,
  }

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // 是否是最后一个
    isLast: PropTypes.bool,
    // 是否必填
    required: PropTypes.bool,
    unit: PropTypes.string,
    right: PropTypes.element,
    inputStyle: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { title, isLast, unit, right, required, inputStyle, ...props } = this.props
    const rightComponent = (
      <Input
        {...props}
        inputStyle={[{ textAlign: 'right' }, inputStyle]}
        right={unit ? <Text style={{ marginLeft: 8 }}>{unit}</Text> : right}
      />
    )
    return <BaseItem title={title} isLast={isLast} right={rightComponent} required={required} />
  }
}
