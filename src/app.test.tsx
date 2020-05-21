import React from 'react'
import App from './app'
import { shallow } from 'enzyme'

test('renders without crashing', () => {
  const wrapper = shallow(<App />)
  expect(wrapper).toBeTruthy()
})
