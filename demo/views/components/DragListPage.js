import React from 'react'
import { Page, DragList, Touch, Text } from '../../../src'

export default class DragListPage extends Page {
  constructor(props) {
    super(props)
    this.state = {
      data: [{ text: 'world' }, { text: 'are you' }, { text: 123 }, { text: 'is' }, { text: 'a' }],
    }
  }

  _headerProps() {
    return {
      title: 'DragList',
    }
  }

  renderItem(data) {
    return (
      <Touch
        onPress={() => {}}
        underlayColor="#fff"
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <Text>{data.text}</Text>
      </Touch>
    )
  }

  _renderBase() {
    const { data } = this.state
    return (
      <>
        <DragList
          data={data}
          onChange={val => this.setState({ data: val })}
          renderRow={row => this.renderItem(row)}
        />
      </>
    )
  }
}
