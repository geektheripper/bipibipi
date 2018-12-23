#!yarn ts-node
import os from 'os'
import path from 'path'
import Auth from '../src/lib/auth'
import QRCode from 'qrcode'
import opn from 'opn'

const auth = new Auth()

const tempImage = path.resolve(
  os.tmpdir(),
  `bilibili-api-test-${Math.random()
    .toString(36)
    .substr(2)}`,
);

(async () => {
  const oauthUrl = await auth.getLoginUrl()
  await QRCode.toFile(tempImage, oauthUrl)
  opn(tempImage, { wait: false })
  await auth.waitingUntilLogin()
  await auth.writeEnvFileSync('.env')
})()
