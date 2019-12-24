import React from 'react'
import { Page, Card, LightCard, DetailCard, Text } from '../../../src'

export default class CardPage extends Page {
  _headerProps() {
    return {
      title: 'Card',
    }
  }

  _render() {
    return (
      <>
        <Card style={{ marginTop: 10 }}>
          <Text>Card</Text>
        </Card>
        <DetailCard style={{ marginTop: 10 }} title="DetailCard" />
        <LightCard style={{ marginTop: 10 }}>LightCard</LightCard>
      </>
    )
  }
}
