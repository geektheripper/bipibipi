import test from 'ava'
import getLoginUrl from './get-login-url'
import getLoginInfo from './get-login-info'
import { LoginStatusCode } from './types'

test('getLoginInfo', async t => {
  const { oauthKey } = await getLoginUrl()
  const resp = await getLoginInfo({ oauthKey })

  t.is(resp, LoginStatusCode.waitingScan)
})
