import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import TextBox from './TextBox'

test('It returns a error on blur if the input is type text after it is focused and a value is entered and then deleted', () => {
  const {getByTestId, getByRole} = render(
    <TextBox
      type="text"
      name={'test'}
      onChange={() => {}}
      placeholder="text-box-test"
      required={true}
    />,
  )

  const input = getByTestId(/text-box/i)
  input.focus()
  fireEvent.change(input, {target: {value: 'a'}})
  fireEvent.change(input, {target: {value: ''}})
  input.blur()

  const alertDiv = getByRole(/alert/i)
  expect(alertDiv).toHaveTextContent(`Test is required`)
})
