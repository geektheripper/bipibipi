import { request } from '../../utils/test'
import follow, { FollowAction } from './follow'
import test from 'ava'

test('getBarrageConf', async t => {
  await follow(
    {
      targetUserId: 3162440,
      action: FollowAction.UnFollow,
    },
    request,
  )

  t.pass('unfollow success')

  await follow(
    {
      targetUserId: 3162440,
      action: FollowAction.Follow,
    },
    request,
  )

  t.pass('follow success')
})
