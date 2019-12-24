import React from 'react'
import { Page, Form } from '../../../src'

export default class Home extends Page {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        { title: 'ActionSheet', path: 'ActionSheetPage' },
        { title: 'ActivityIndicator', path: 'ActivityIndicatorPage' },
        { title: 'Button', path: 'ButtonPage' },
        { title: 'Card', path: 'CardPage' },
        { title: 'Carousel', path: 'CarouselPage' },
        { title: 'Dialog', path: 'DialogPage' },
        { title: 'DragList', path: 'DragListPage' },
        { title: 'Form', path: 'FormPage' },
        { title: 'Modal', path: 'ModalPage' },
        { title: 'PopMenu', path: 'PopMenuPage' },
        { title: 'Popup', path: 'PopupPage' },
        { title: 'Progress', path: 'ProgressPage' },
        { title: 'Star', path: 'StarPage' },
        { title: 'Switch', path: 'SwitchPage' },
        { title: 'Tag', path: 'TagPage' },
        { title: 'Toast', path: 'ToastPage' },
      ],
    }
  }

  _headerProps() {
    return {
      title: '组件库',
      left: <></>,
    }
  }

  _render() {
    const { list } = this.state
    return (
      <>
        {list.map((item, index) => (
          <Form.Base
            title={item.title}
            key={index}
            onPress={() => this.router.push(item.path)}
            showArrow
          />
        ))}
      </>
    )
  }
}
