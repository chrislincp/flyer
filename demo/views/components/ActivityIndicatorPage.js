import React from 'react'
import {
  Page,
  MaterialIndicator,
  BarIndicator,
  BallIndicator,
  DotIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  NativeIndicator,
} from '../../../src'

export default class ActivityIndicatorPage extends Page {
  _headerProps() {
    return {
      title: 'ActivityIndicator',
    }
  }

  _render() {
    return (
      <>
        <MaterialIndicator />
        <BarIndicator />
        <BallIndicator />
        <DotIndicator />
        <MaterialIndicator />
        <PacmanIndicator />
        <PulseIndicator />
        <SkypeIndicator />
        <NativeIndicator />
      </>
    )
  }
}
