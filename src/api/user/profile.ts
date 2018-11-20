import { prefix } from '../../utils'
import { apiFactory } from '../../utils/api'
import { SPLevel, VerifyInfo, VipInfo } from './types'

export enum SpaceState {
  /**
   * 封禁
   */
  Baned = -2,
  /**
   * 正常
   */
  Normal = 0,
}

export interface ApiOptions {
  /**
   * 用户 Id
   *
   * @type {string}
   * @memberof ProfileOptions
   */
  userId: number
  /**
   * 跨域请求 token
   *
   * @type {string}
   * @memberof ProfileOptions
   */
  csrfToken?: string
}

export interface Profile {
  /**
   * 生日
   *
   * 用户 `隐私设置` -> `个人资料` 打开时才能获取到
   *
   * 格式为 "MM-DD"
   *
   * @type {string}
   * @memberof Profile
   */
  birthday?: string
  /**
   * 硬币数量，未登录以及查看他人用户信息时，获取到的值为零
   *
   * 那么登录后看自己呢？
   *
   * ----答案是：没有这个字段 233333
   *
   * @type {0}
   * @memberof Profile
   */
  coins?: 0
  /**
   * 用户头像 url `face`
   *
   * @type {string}
   * @memberof Profile
   */
  avatar: string
  /**
   * 是否开通粉丝勋章 `fans_badge`
   *
   * @type {boolean}
   * @memberof Profile
   */
  hasFansBadge: boolean
  /**
   * 用户等级 `level_info.current_level`
   *
   * @type {(0|1|2|3|4|5|6)}
   * @memberof Profile
   */
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | SPLevel
  /**
   * 用户 Id `mid`
   *
   * @type {number}
   * @memberof Profile
   */
  id: number
  /**
   * 用户名
   *
   * @type {string}
   * @memberof Profile
   */
  name: string
  /**
   * 认证信息 `official_verify`
   *
   * @type {VerifyInfo}
   * @memberof Profile
   */
  officialVerify: VerifyInfo
  /**
   * 全站排名(疑似)
   *
   * 目前来看无论自己还是敖厂长都是 10000
   *
   * 有可能 10000 以内的用户才能看见自己的排名
   *
   * 有大佬愿意帮帮忙看看吗？
   *
   * @type {number}
   * @memberof Profile
   */
  rank: number
  /**
   * 注册时间 `regtime`
   *
   * 用户 `隐私设置` -> `个人资料` 打开时才能获取到
   *
   * 标准 unix 时间戳
   *
   * @type {number}
   * @memberof Profile
   */
  regTime?: number
  /**
   * 性别
   *
   * @type {("保密" | "男" | "女")}
   * @memberof Profile
   */
  sex: '保密' | '男' | '女'
  /**
   * 个人签名 `sign`
   *
   * @type {string}
   * @memberof Profile
   */
  bio: string
  /**
   * 头图 url `toutu`
   * 原字段是一个 bfs uri 已自动补全
   *
   * @type {string}
   * @memberof Profile
   */
  cover: string
  /**
   * 头图 Id `toutuId`
   * 本接口返回小图，大图要通过 getUserInfo 拿
   *
   * @type {number}
   * @memberof Profile
   */
  coverId: number
  /**
   * 会员信息 `vip`
   *
   * @type {VipInfo}
   * @memberof Profile
   */
  vipInfo: VipInfo
  /**
   * 空间状态 `spacesta`
   *
   * @type {SpaceState}
   * @memberof Profile
   */
  spaceState: SpaceState
  // 不知用途的字段:
  // im9_sign: string
  // theme: string
  // theme_preview: string
  // place: string (用户 `隐私设置` -> `个人资料` 关闭时才能获取到的空字符串)
}

function optionsGenerator({ userId }: ApiOptions) {
  return {
    baseUrl: prefix.space,
    method: 'POST',
    url: '/ajax/member/GetInfo',
    headers: {
      Referer: `${prefix.space}/${userId}`,
    },
    form: {
      mid: userId,
    },
  }
}

function responseTransformer(response): Profile {
  const data = response.data
  return {
    birthday: data.birthday,
    coins: data.coins,
    avatar: data.face,
    hasFansBadge: data.fans_badge,
    level: data.level_info.current_level,
    id: data.mid,
    name: data.name,
    officialVerify: {
      type: data.official_verify.type,
      description: data.official_verify.desc,
      suffix: data.official_verify.suffix,
    },
    rank: data.rank,
    regTime: data.regtime,
    sex: data.sex,
    bio: data.sign,
    cover: `${prefix.bfs[0]}/${data.toutu}`,
    coverId: data.toutuId,
    vipInfo: {
      status: data.vip.vipStatus,
      type: data.vip.vipType,
    },
    spaceState: data.spacesta,
  }
}

export default apiFactory<ApiOptions, Profile>({
  optionsGenerator,
  responseTransformer,
})
