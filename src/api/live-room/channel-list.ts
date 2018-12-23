import { prefix, errorMsg } from '../../utils'
import { apiFactory } from '../../utils/api'

export enum PkStatus {
  Closed,
  Open,
}
export enum HotStatus {
  Cold,
  Hot,
}
export enum LockStatus {
  Open,
  Locked,
}

export interface SubChannel {
  /**
   * 分区 Id
   *
   * string-> number
   *
   * @type {number}
   * @memberof Channel
   */
  id: number
  /**
   * 父分区 Id `parentId`
   *
   * string-> number
   *
   * @type {number}
   * @memberof Channel
   */
  parentId: number
  /**
   * 旧分区 Id `old_area_id`
   *
   * string-> number
   *
   * @type {number}
   * @memberof Channel
   */
  oldId: number
  /**
   * 分区名字
   *
   * @type {string}
   * @memberof Channel
   */
  name: string
  /**
   * 改分区是否能开启 PK 功能 `pk_status`
   *
   * string-> number
   *
   * @type {PkStatus}
   * @memberof Channel
   */
  pkStatus: PkStatus
  /**
   * 分区是否热门分区 `hot_status`
   *
   * @type {HotStatus}
   * @memberof Channel
   */
  hotStatus: HotStatus
  /**
   * 分区是否被锁定 `lock_status`
   *
   * string-> number
   *
   * @type {LockStatus}
   * @memberof Channel
   */
  lockStatus: LockStatus
  /**
   * 分区图标 `pic`
   *
   * @type {string}
   * @memberof Channel
   */
  icon: string
  /**
   * 分区名的拼音
   *
   * @type {string}
   * @memberof Channel
   */
  pinyin?: string
  /**
   * 父分区的名字 `parent_name`
   *
   * @type {string}
   * @memberof Channel
   */
  parentName: string
  // unknow field
  // act_id: string 全都是 "0" 不知道是干蛤的
}

export interface Channel {
  /**
   * 分区 Id
   *
   * @type {number}
   * @memberof Channel
   */
  id: number
  /**
   * 分区名字
   *
   * @type {string}
   * @memberof Channel
   */
  name: string
  /**
   * 子分区列表 `list`
   *
   * @type {SubChannel[]}
   * @memberof Channel
   */
  children: SubChannel[]
}

function optionsGenerator() {
  return {
    baseUrl: prefix.liveApi,
    method: 'GET',
    url: '/room/v1/Area/getList?show_pinyin=1',
  }
}

function responseTransformer(response): Channel[] {
  const { code, data } = response

  if (code !== 0) {
    console.error(response)
    throw new Error(errorMsg.responseUnexpected)
  }

  return data.map(channel => ({
    id: channel.id,
    name: channel.name,
    children: channel.list.map(subChannel => ({
      id: Number(subChannel.id),
      parentId: Number(subChannel.parent_id),
      oldId: Number(subChannel.old_area_id),
      name: subChannel.name,
      pkStatus: Number(subChannel.pk_status),
      hotStatus: subChannel.hot_status,
      lockStatus: Number(subChannel.lock_status),
      icon: subChannel.pic,
      pinyin: subChannel.pinyin,
      parentName: subChannel.parent_name,
    })),
  }))
}

export default apiFactory<Channel[]>({
  noOptions: true,
  optionsGenerator,
  responseTransformer,
})
