import React from 'react'
import { Page, Text } from '../../../src'

export default class Utils extends Page {
  _headerProps() {
    return {
      title: 'Utils',
      left: <></>,
    }
  }

  _render() {
    return (
      <>
        <Text>Utils</Text>
      </>
    )
  }
}
