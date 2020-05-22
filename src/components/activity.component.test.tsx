import { faPlug } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { renderHook } from '@testing-library/react-hooks'
import { shallow } from 'enzyme'
import React from 'react'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'
import { MQTTActivity } from './activity.component'

describe('MQTTActivity', () => {
  test('should render', () => {
    const { result } = renderHook(() => UseMQTT(Topic.POWER))

    const wrapper = shallow(<MQTTActivity topic={Topic.POWER} />)
    expect(
      wrapper.contains(<FontAwesomeIcon size="3x" icon={faPlug} />)
    ).toBeTruthy()
  })
})
