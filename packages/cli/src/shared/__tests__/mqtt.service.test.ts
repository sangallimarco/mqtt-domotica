import { act, renderHook } from '@testing-library/react-hooks'
import { mqttCore, UseMQTT } from '../mqtt.service'
import { Topic } from '@myhydroponics/core'

describe('UseMQTT', () => {
  const messageBus = mqttCore.getMessageBus()

  test('message should be an empty string', () => {
    const { result } = renderHook(() => UseMQTT(Topic.CONNECTED))
    expect(result.current.message).toEqual('')
  })
  test('should filter bus message and set message', () => {
    const { result } = renderHook(() => UseMQTT(Topic.CONNECTED))
    act(() => {
      messageBus.next({ topic: Topic.CONNECTED, payload: '1' })
    })
    expect(result.current.message).toEqual('1')
  })

  test('should filter bus message and set message', () => {
    const { result } = renderHook(() => UseMQTT(Topic.CONNECTED))
    act(() => {
      messageBus.next({ topic: Topic.OUTDOOR_ENERGY, payload: '1' })
    })
    expect(result.current.message).toEqual('')
  })
})
