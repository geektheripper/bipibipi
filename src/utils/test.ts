// tslint:disable:no-var-requires
require('dotenv').config()

import Auth from '../lib/auth'
import { get } from 'lodash'

export const auth = new Auth({
  userId: Number(process.env.USER_ID),
  sessionData: process.env.SESSION_DATA,
  csrfToken: process.env.CSRF_TOKEN,
})

export const request = auth.getRequest()

// TODO: Array logic
function getKeys(obj, prefix = ''): string[] {
  let keys = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key
      const value = obj[key]

      switch (Object.prototype.toString.apply(value)) {
        case '[object Object]':
          keys = keys.concat(getKeys(value, fullKey))
          break
        default:
          keys.push(fullKey)
          break
      }
    }
  }
  return keys
}

export function objectChecker(obj, t) {
  const objectContainsKeys = getKeys(obj)
  const checkedKeys = []

  function typeCheckerFactory(type) {
    return key => {
      checkedKeys.push(key)
      t.true(typeof get(obj, key) === type, `${key} is not a ${type}`)
    }
  }

  return {
    number: typeCheckerFactory('number'),
    string: typeCheckerFactory('string'),
    boolean: typeCheckerFactory('boolean'),
    is: (key, value) => t.is(get(obj, key), value),
    isFullChecked: ({ skipKeys = [] } = {}) => {
      const uncheckedKeys = objectContainsKeys
        .filter(k => !checkedKeys.includes(k))
        .filter(k => !skipKeys.includes(k))

      if (uncheckedKeys.length) {
        const keys = uncheckedKeys.map(k => `'${k}'`).join(',')
        t.fail(`those keys unchecked: ${keys}`)
      } else {
        t.pass(`all keys checked`)
      }
    },
  }
}
