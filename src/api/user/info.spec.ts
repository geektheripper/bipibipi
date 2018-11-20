import { request, objectChecker } from '../../utils/test'
import getUserInfo from './info'
import test from 'ava'

test('getUserInfo', async t => {
  const resp = await getUserInfo(request)

  const _ = objectChecker(resp, t)

  _.number('id')
  _.string('name')
  _.string('sex')
  _.string('avatar')
  _.string('bio')
  _.number('rank')
  _.number('level')
  _.number('regTime')
  _.number('moral')
  _.number('silence')
  _.number('emailStatus')
  _.number('telStatus')
  _.number('identificationStatus')
  _.number('vipInfo.type')
  _.number('vipInfo.status')
  _.number('vipInfo.expire')
  _.number('vipInfo.payType')
  _.number('avatarDecoration.id')
  _.string('avatarDecoration.name')
  _.string('avatarDecoration.url')
  _.number('avatarDecoration.expire')
  _.number('officialVerify.type')
  _.string('officialVerify.suffix')
  _.string('officialVerify.description')
  _.number('birthday')
  _.number('levelInfo.level')
  _.number('levelInfo.start')
  _.number('levelInfo.end')
  _.number('levelInfo.exp')
  _.number('coins')
  _.number('following')
  _.number('follower')

  _.isFullChecked()
})
