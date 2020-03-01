import React from 'react'
import {MemoryRouter} from 'react-router'
import '@testing-library/jest-dom/extend-expect'
import {createMemoryHistory} from 'history'
import {render} from '@testing-library/react'
import CreateCardSetForm from './CreateCardSetForm'

test('renders a text input with a label "TITLE', () => {
  const {getByLabelText} = render(<CreateCardSetForm />, {
    wrapper: MemoryRouter,
  })
  const input = getByLabelText(/title/i)
  expect(input).toHaveAttribute('type', 'text')
})
test('renders a div with text content "Create Set"', () => {
  const {getAllByText} = render(<CreateCardSetForm />, {
    wrapper: MemoryRouter,
  })
  const divs = getAllByText(/Create Set/i)
  expect(divs).toHaveLength(2)
})
