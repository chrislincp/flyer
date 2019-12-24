import React from 'react'
import BaseItem from './BaseItem'
import InputItem from './InputItem'
import RemarkItem from './RemarkItem'
import StepperItem from './StepperItem'

export default class Form extends React.Component {
  static Base = BaseItem

  static Input = InputItem

  static Remark = RemarkItem

  static Stepper = StepperItem
}
