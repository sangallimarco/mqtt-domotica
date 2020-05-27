import * as redis from 'redis'
const client = redis.createClient();

const BUFFER_LENGTH = 10

export async function addToRedis(key: string, value: string): Promise<string> {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      let union: string[] = []

      if (!err) {
        if (reply) {
          let parsed = [];

          try {
            parsed = JSON.parse(reply)
          } catch (e) {
            //
          }

          if (parsed.length > BUFFER_LENGTH) {
            parsed = parsed.slice(1);
          }

          union = [...parsed, value]
        } else {
          union = [value]
        }

        const serialised =  JSON.stringify(union)
        client.set(key, serialised)
        resolve(serialised)
      } else {
        reject(err)
      }
    })
  })
}
