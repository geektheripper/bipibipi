import { objectChecker } from '../../utils/test'
import test from 'ava'
import getLoginUrl from './get-login-url'

test('getLoginUrl', async t => {
  const resp = await getLoginUrl()

  const _ = objectChecker(resp, t)

  _.string('oauthKey')
  _.string('oauthUrl')

  _.isFullChecked()
})
