import { objectChecker } from '../../utils/test'
import test from 'ava'
import getProfile from './profile'

test('getProfile', async t => {
  const resp = await getProfile({ userId: 1 })

  const _ = objectChecker(resp, t)

  _.string('birthday')
  _.number('coins')
  _.string('avatar')
  _.boolean('hasFansBadge')
  _.number('level')
  _.number('id')
  _.string('name')
  _.number('officialVerify.type')
  _.string('officialVerify.description')
  _.string('officialVerify.suffix')
  _.number('rank')
  _.number('regTime')
  _.string('sex')
  _.string('bio')
  _.string('cover')
  _.number('coverId')
  _.number('vipInfo.type')
  _.number('vipInfo.status')
  _.number('spaceState')

  _.isFullChecked()
})
