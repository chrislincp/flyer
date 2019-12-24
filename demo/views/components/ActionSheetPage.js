import React from 'react'
import { Page, Form, ActionSheet, Text } from '../../../src'

export default class ActionSheetPage extends Page {
  constructor(props) {
    super(props)
    this.state = {
      value1: '',
      value2: [],
    }
  }

  _headerProps() {
    return {
      title: 'ActionSheet',
    }
  }

  showActionSheet() {
    const { value1 } = this.state
    ActionSheet.show({
      data: [
        { key: 'a', value: 'testA' },
        { key: 'b', value: 'testB' },
        { key: 'c', value: 'testC' },
        { key: 'd', value: 'testD' },
        { key: 'e', value: 'testE' },
      ],
      value: value1,
      onChange: val => this.setState({ value1: val }),
    })
  }

  showMultiActionSheet() {
    const { value2 } = this.state
    ActionSheet.show({
      data: [
        { key: 'a', value: 'testA' },
        { key: 'b', value: 'testB' },
        { key: 'c', value: 'testC' },
        { key: 'd', value: 'testD' },
        { key: 'e', value: 'testE' },
      ],
      multiple: true,
      value: value2,
      onChange: val => this.setState({ value2: val }),
    })
  }

  _render() {
    const { value1, value2 } = this.state
    return (
      <>
        <Form.Base onPress={() => this.showActionSheet()} title="单选" />
        <Form.Base onPress={() => this.showMultiActionSheet()} title="多选" />
        <Text>{`value1: ${value1}`}</Text>
        <Text>{`value2: ${JSON.stringify(value2)}`}</Text>
      </>
    )
  }
}
