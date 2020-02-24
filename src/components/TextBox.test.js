import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import TextBox from './TextBox'

let noop = () => {}

function renderTextBox(props) {
  const utils = render(<TextBox {...props} />)
  const textBox = utils.getByTestId(/text-box/i)
  return {...utils, textBox}
}

test('It returns a error on blur if the textBox is type text and after it is focused, a value is entered and then deleted', () => {
  const {textBox, getByRole} = renderTextBox({
    type: 'text',
    name: 'test',
    onChange: noop,
    placeholder: 'text-box-test',
    required: true,
  })

  textBox.focus()
  fireEvent.change(textBox, {target: {value: 'a'}})
  fireEvent.change(textBox, {target: {value: ''}})
  textBox.blur()

  const alertDiv = getByRole(/alert/i)
  expect(alertDiv).toHaveTextContent(`Test is required`)
})

test('It returns a error on blur if the textBox is type email, it is not required, and the value is not an email', () => {
  const {getByRole, textBox} = renderTextBox({
    type: 'email',
    name: 'test',
    placeholder: 'text-box-test',
    required: false,
    onChange: noop,
  })

  textBox.focus()
  fireEvent.change(textBox, {target: {value: 'quinnlashinsky'}})
  textBox.blur()
  const alertDiv = getByRole(/alert/i)
  expect(alertDiv).toHaveTextContent(`Please enter a valid email`)
})

test('It returns a error on blur if the textBox is type email, it is required, and the value is not an email', () => {
  const {textBox, getByRole} = renderTextBox({
    type: 'email',
    name: 'test',
    onChange: noop,
    placeholder: 'text-box-test',
    required: true,
  })

  textBox.focus()
  fireEvent.change(textBox, {target: {value: 'qwerty'}})
  textBox.blur()

  const alertDiv = getByRole(/alert/i)
  expect(alertDiv).toHaveTextContent(`Test is required`)
})

test('It has no value for the textBox if it is disabled', () => {
  const {textBox} = renderTextBox({
    type: 'text',
    disabled: true,
    name: 'test',
    onChange: noop,
    placeholder: 'text-box-test',
  })

  textBox.focus()
  fireEvent.change(textBox, {target: {value: 'abracadabra'}})
  textBox.blur()

  expect(textBox).toHaveTextContent('')
  expect(textBox).not.toHaveTextContent('abracadabra')
})
