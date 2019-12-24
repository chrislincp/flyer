import React from 'react'
import { Page, Button, Dialog } from '../../../src'

export default class DialogPage extends Page {
  _headerProps() {
    return {
      title: 'Dialog',
    }
  }

  confirm() {
    Dialog.confirm({
      title: 'title',
      content: 'this is a confirm dialog',
    })
  }

  alert() {
    Dialog.alert({
      title: 'title',
      content: 'this is an alert dialog',
    })
  }

  _render() {
    return (
      <>
        <Button title="confirm dialog" onPress={() => this.confirm()} />
        <Button title="alert dialog" onPress={() => this.alert()} />
      </>
    )
  }
}
