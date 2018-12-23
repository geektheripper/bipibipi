import { prefix, errorMsg } from '../../../utils'
import { apiFactory } from '../../../utils/api'

enum LiveBarrageColorStatus {
  Disallow,
  Allowed,
}

enum LiveBarrageModeStatus {
  Disallow,
  Allowed,
}

export interface LiveBarrageColorConf {
  /**
   * RGB Number of the Color (or named as 'Decimal Color')
   *
   * string/number-> number
   *
   * @type {number}
   * @memberof LiveBarrageColorConf
   */
  color: number
  /**
   * Hex Format of the Color `color_hex`
   *
   * @type {string}
   * @memberof LiveBarrageColorConf
   */
  colorHex: string
  /**
   * 颜色名
   *
   * @type {string}
   * @memberof LiveBarrageColorConf
   */
  name: string
  /**
   * 颜色展示排序
   *
   * string->number
   *
   * @type {number}
   * @memberof LiveBarrageColorConf
   */
  order: number
  /**
   * 颜色可用状态
   *
   * @type {LiveBarrageColorStatus}
   * @memberof LiveBarrageColorConf
   */
  status: LiveBarrageColorStatus
}

export interface LiveBarrageModeConf {
  /**
   * 弹幕模式 ID
   *
   * @type {number}
   * @memberof LiveBarrageModeConf
   */
  mode: number
  /**
   * 弹幕模式名
   *
   * @type {string}
   * @memberof LiveBarrageModeConf
   */
  name: string
  /**
   * 弹幕模式状态
   *
   * @type {LiveBarrageModeStatus}
   * @memberof LiveBarrageModeConf
   */
  status: LiveBarrageModeStatus
  /**
   * 弹幕模式名（英语）
   *
   * @type {string}
   * @memberof LiveBarrageModeConf
   */
  type: string
}

export interface LiveBarrageConf {
  color: LiveBarrageColorConf[]
  mode: LiveBarrageModeConf[]
}

export interface ApiOptions {
  /**
   * 目标房间号
   *
   * @type {number}
   * @memberof ApiOptions
   */
  roomId: number
}

function optionsGenerator({ roomId }: ApiOptions) {
  return {
    baseUrl: prefix.liveApi,
    method: 'GET',
    url: '/userext/v1/DanmuConf/getConfig',
    qs: {
      roomid: roomId,
    },
  }
}

function responseTransformer(response): LiveBarrageConf {
  const { code, data } = response

  if (code !== 0) {
    console.error(response)
    throw new Error(errorMsg.responseUnexpected)
  }

  const color: LiveBarrageColorConf[] = data.color.map((c: any) => ({
    name: c.name,
    color: Number(c.color),
    colorHex: c.color_hex,
    status: c.status,
    order: Number(c.order),
  }))

  return { color, mode: data.mode as LiveBarrageModeConf[] }
}

export default apiFactory<ApiOptions, LiveBarrageConf>({
  optionsGenerator,
  responseTransformer,
})
