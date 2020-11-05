import { faPlug } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shallow } from 'enzyme'
import React from 'react'
import { Topic } from '@myhydroponics/core'
import { MQTTActivity } from '../activity'

describe('MQTTActivity', () => {
  test('should render', () => {
    const wrapper = shallow(<MQTTActivity topic={Topic.POWER} />)
    expect(
      wrapper.contains(<FontAwesomeIcon size="2x" icon={faPlug} />)
    ).toBeTruthy()
  })
})
