import { objectChecker } from '../../utils/test'
import test from 'ava'
import getChannelList from './channel-list'

test('getChannelList', async t => {
  const resp = await getChannelList()

  // firstChannelChecker
  const fcc = objectChecker(resp[0], t)
  fcc.number('id')
  fcc.string('name')
  fcc.isFullChecked({ skipKeys: ['children'] })

  // firstSubChannel
  const fsc = objectChecker(resp[0].children[0], t)
  fsc.number('id')
  fsc.number('parentId')
  fsc.number('oldId')
  fsc.string('name')
  fsc.number('pkStatus')
  fsc.number('hotStatus')
  fsc.number('lockStatus')
  fsc.string('icon')
  fsc.string('pinyin')
  fsc.string('parentName')
  fsc.isFullChecked()
})
