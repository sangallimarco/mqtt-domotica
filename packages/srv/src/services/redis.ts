import * as redis from 'redis'
const client = redis.createClient()

const BUFFER_LENGTH = 20

export interface Item {
  ts: string
  value: string
}

export function itemFactory(value: string): Item {
  const ts = Date.now().toString()
  return {
    ts,
    value,
  }
}

export async function addToRedis(key: string, value: string): Promise<string> {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      let union: Item[] = []
      const newValue = itemFactory(value)

      if (!err) {
        if (reply) {
          let parsed = []

          try {
            parsed = JSON.parse(reply)
          } catch (e) {
            //
          }

          if (parsed.length > BUFFER_LENGTH) {
            parsed = parsed.slice(1)
          }

          union = [...parsed, newValue]
        } else {
          union = [newValue]
        }

        const serialised = JSON.stringify(union)
        client.set(key, serialised)
        resolve(serialised)
      } else {
        reject(err)
      }
    })
  })
}
