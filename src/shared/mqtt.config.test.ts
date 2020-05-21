import {
  CONFIG_PATH,
  getConfigOptions,
  storeConfigOptions,
  hasValidConfig,
} from './mqtt.config'

describe('MQTT config helpers', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  describe('getConfigOptions', () => {
    it('should get the config options if localStorage item present', () => {
      window.localStorage.setItem(
        CONFIG_PATH,
        JSON.stringify({ username: 'me', password: 'pwd' })
      )
      expect(getConfigOptions()).toEqual({ password: 'pwd', username: 'me' })
    })
  })

  describe('storeConfigOptions', () => {
    it('should store config into localStorage', () => {
      storeConfigOptions({ password: 'pwd', username: 'me' })
      expect(window.localStorage.getItem(CONFIG_PATH)).toEqual(
        '{"password":"pwd","username":"me"}'
      )
    })
  })

  describe('hasValidConfig', () => {
    it('should return false if localStorage does not contain a config', () => {
      expect(hasValidConfig()).toEqual(false)
    })

    it('should return true if localStorage does  contain a configg', () => {
      window.localStorage.setItem(
        CONFIG_PATH,
        JSON.stringify({ username: 'me', password: 'pwd' })
      )
      expect(hasValidConfig()).toEqual(true)
    })
  })
})
