import { auth as testAuth } from '../utils/test'
import os from 'os'
import path from 'path'
import QRCode from 'qrcode'
import opn from 'opn'

import test from 'ava'
import Auth from './auth'

import getUserInfo from '../api/user/info'

const isCI = process.env.IS_CI === 'true'

const auth = isCI ? testAuth : new Auth()

const tempImage = path.resolve(
  os.tmpdir(),
  `bilibili-api-test-${Math.random()
    .toString(36)
    .substr(2)}`,
)

if (!isCI) {
  test.before('qrLogin', async t => {
    const oauthUrl = await auth.getLoginUrl()
    await QRCode.toFile(tempImage, oauthUrl)
    opn(tempImage, { wait: false })
    await auth.waitingUntilLogin()
    t.pass()
  })
}

test('readCookie', async t => {
  t.true(auth.getCookie().length > 90, 'login failed')
})

test('customiseRequest', async t => {
  const request = auth.getRequest()
  const resp = await getUserInfo(request)

  t.is(resp.id, auth.loginInfo.userId)
})
