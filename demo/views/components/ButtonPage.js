import React from 'react'
import { Page, Button, GradientButton } from '../../../src'

export default class ButtonPage extends Page {
  _headerProps() {
    return {
      title: 'Button',
    }
  }

  _render() {
    return (
      <>
        <Button title="primary" />
        <Button title="error" type="error" />
        <Button title="success" type="success" />
        <Button title="warning" type="warning" />
        <Button title="normal" type="normal" />
        <Button title="禁用" disabled />
        <GradientButton title="primary" />
        <GradientButton title="success" type="success" />
        <GradientButton title="error" type="error" />
        <GradientButton title="禁用" disabled />
      </>
    )
  }
}
