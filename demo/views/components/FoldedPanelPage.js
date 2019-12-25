import React from 'react'
import { Page, FoldedPanel, Form } from '../../../src'

export default class FoldedPanelPage extends Page {
  _headerProps() {
    return {
      title: 'FoldedPanel',
    }
  }

  _render() {
    return (
      <>
        <FoldedPanel title="title">
          <Form.Base title="a" />
          <Form.Base title="b" />
          <Form.Base title="c" />
        </FoldedPanel>
      </>
    )
  }
}
