import { request, objectChecker } from '../../../utils/test'
import getBarrageConf from './get-conf'
import test from 'ava'

test('getBarrageConf', async t => {
  const resp = await getBarrageConf({ roomId: 17151 }, request)

  const color = objectChecker(resp.color[0], t)
  color.number('color')
  color.string('colorHex')
  color.string('name')
  color.number('order')
  color.number('status')
  color.isFullChecked()

  const mode = objectChecker(resp.mode[0], t)
  mode.number('mode')
  mode.number('status')
  mode.string('name')
  mode.string('type')
  mode.isFullChecked()
})
