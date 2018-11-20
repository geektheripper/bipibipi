import test from 'ava'
import uploadImage, { SimBlob } from './upload'

import Jimp from 'jimp'

async function genBlob(width: number, height: number): Promise<SimBlob> {
  const image = await new Jimp(width, height, '#39C5BB')
  const value = await image.quality(60).getBufferAsync(Jimp.MIME_PNG)

  return {
    value,
    options: {
      filename: 'elpsycongroo',
      contentType: Jimp.MIME_PNG,
    },
  }
}

test('room_cover', async t => {
  const resp = await uploadImage({
    business: 'room',
    category: 'room_cover',
    file: await genBlob(470, 293),
  })

  t.truthy(resp.url)
})

test('show_cover', async t => {
  const resp = await uploadImage({
    business: 'show',
    category: 'show_cover',
    file: await genBlob(500, 500),
  })

  t.truthy(resp.url)
})

test('custom', async t => {
  const width = Math.ceil(Math.random() * 500)
  const height = Math.ceil(Math.random() * 500)

  const resp = await uploadImage({
    business: 'room',
    file: await genBlob(width, height),
  })

  t.truthy(resp.url)
})
