import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Touch from '../Touch'
import Text from '../Text'
import Image from '../Image'
import { isNumber } from '../../utils'

export default class Stepper extends React.Component {
  static defaultProps = {
    disabled: false,
    min: 0,
    max: 99,
    step: 1,
    value: 0,
    onChange: () => {},
  }

  static propTypes = {
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onPress(from) {
    const { value, step, min, max, onChange } = this.props
    if (isNumber(value)) {
      let num = value - 0
      if (from === 'dec') {
        num -= step
        num = num < min ? min : num
      } else if (from === 'inc') {
        num += step
        num = num > max ? max : num
      }
      onChange(num)
    }
  }

  _stepperRender() {
    const { min, max, value, disabled } = this.props
    const decDisabled = disabled || value === min
    const incDisabled = disabled || (max && value === max)
    return (
      <View style={styles.container}>
        <Touch noDebounce disabled={decDisabled} onPress={() => this.onPress('dec')}>
          {decDisabled ? (
            <Image
              style={styles.btnText}
              source={require('../../assets/images/minus_disabled.png')}
            />
          ) : (
            <Image style={styles.btnText} source={require('../../assets/images/minus.png')} />
          )}
          {/* <Text style={[styles.btnText, decDisabled && { color: '#EDEDEE' }]}>-</Text> */}
        </Touch>
        <View style={styles.valueWrap}>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Touch noDebounce onPress={() => this.onPress('inc')} disabled={incDisabled}>
          {incDisabled ? (
            <Image
              style={styles.btnText}
              source={require('../../assets/images/add_disabled.png')}
            />
          ) : (
            <Image style={styles.btnText} source={require('../../assets/images/add.png')} />
          )}
          {/* <Text style={[styles.btnText, incDisabled && { color: '#EDEDEE' }]}><Icon name="plus" size={12} /></Text> */}
        </Touch>
      </View>
    )
  }

  render() {
    return this._stepperRender()
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    width: 27,
    height: 27,
  },
  valueWrap: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    color: '#0F1D37',
    fontSize: 16,
  },
})
