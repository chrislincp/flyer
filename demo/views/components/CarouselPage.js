import React from 'react'
import { View } from 'react-native'
import { Page, Carousel, Style } from '../../../src'

export default class CarouselPage extends Page {
  _headerProps() {
    return {
      title: 'Carousel',
    }
  }

  _render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Carousel
          size={{ width: Style.width * 0.9, height: Style.width * 0.4 }}
          childrenType="custom"
        >
          <View style={{ flex: 1, backgroundColor: 'red' }} />
          <View style={{ flex: 1, backgroundColor: 'blue' }} />
          <View style={{ flex: 1, backgroundColor: 'green' }} />
        </Carousel>
      </View>
    )
  }
}
