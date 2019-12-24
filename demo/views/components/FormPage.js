import React from 'react'
import { Page, Form } from '../../../src'

export default class FormPage extends Page {
  constructor(props) {
    super(props)
    this.state = {
      value1: '',
      value2: '',
      value3: 0,
    }
  }

  _headerProps() {
    return {
      title: 'Form',
    }
  }

  _render() {
    const { value1, value2, value3 } = this.state
    return (
      <>
        <Form.Base title="base" value="value" />
        <Form.Base title="show arrow" showArrow value="value" />
        <Form.Input
          title="input"
          placeholder="input"
          value={value1}
          onChangeText={val => this.setState({ value1: val })}
        />
        <Form.Remark
          placeholder="remark"
          value={value2}
          onChangeText={val => this.setState({ value2: val })}
        />
        <Form.Stepper
          title="stepper"
          value={value3}
          onChange={val => this.setState({ value3: val })}
        />
      </>
    )
  }
}
