import { prefix, errorMsg } from '../../utils'
import { apiFactory } from '../../utils/api'
import {
  SPLevel,
  VerifyInfo,
  FullVipInfo,
  EmailStatus,
  TelStatus,
  AvatarDecoration,
  LevelInfo,
  IdentificationStatus,
} from './types'

export interface UserInfo {
  /**
   * 用户 Id `mid`
   *
   * @type {number}
   * @memberof UserInfo
   */
  id: number
  /**
   * 用户名
   *
   * @type {string}
   * @memberof UserInfo
   */
  name: string
  /**
   * 性别
   *
   * @type {string}
   * @memberof UserInfo
   */
  sex: string
  /**
   * 头像 `face`
   *
   * @type {string}
   * @memberof UserInfo
   */
  avatar: string
  /**
   * 签名 `sign`
   *
   * @type {string}
   * @memberof UserInfo
   */
  bio: string
  /**
   * 全站排名(疑似)
   *
   * @type {number}
   * @memberof UserInfo
   */
  rank: number
  /**
   * 等级
   *
   * @type {(0|1|2|3|4|5|6|SPLevel)}
   * @memberof UserInfo
   */
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | SPLevel
  /**
   * 注册时间 `jointime`
   *
   * @type {number}
   * @memberof UserInfo
   */
  regTime: number
  /**
   * 节操值
   *
   * @type {number}
   * @memberof UserInfo
   */
  moral: number
  /**
   * ？？？？？？
   *
   * @type {number}
   * @memberof UserInfo
   */
  silence: number
  /**
   * 邮箱验证状态 `email_status`
   *
   * @type {EmailStatus}
   * @memberof UserInfo
   */
  emailStatus: EmailStatus
  /**
   * 手机验证状态 `tel_status`
   *
   * @type {TelStatus}
   * @memberof UserInfo
   */
  telStatus: TelStatus
  /**
   * 身份认证状态 `identification`
   *
   * @type {IdentificationStatus}
   * @memberof UserInfo
   */
  identificationStatus: IdentificationStatus
  /**
   * 会员信息 `vip`
   *
   * @type {FullVipInfo}
   * @memberof UserInfo
   */
  vipInfo: FullVipInfo
  /**
   * 头像挂件 `pendant`
   *
   * @type {AvatarDecoration}
   * @memberof UserInfo
   */
  avatarDecoration: AvatarDecoration
  /**
   * 认证信息 `official`
   *
   * @type {VerifyInfo}
   * @memberof Profile
   */
  officialVerify: VerifyInfo
  /**
   * 生日
   *
   * @type {number}
   * @memberof UserInfo
   */
  birthday: number
  /**
   * 等级信息 `level_exp`
   *
   * @type {LevelInfo}
   * @memberof UserInfo
   */
  levelInfo: LevelInfo
  /**
   * 硬币数量
   *
   * @type {number}
   * @memberof UserInfo
   */
  coins: number
  /**
   * 关注数
   *
   * @type {number}
   * @memberof UserInfo
   */
  following: number
  /**
   * 粉丝数
   *
   * @type {number}
   * @memberof UserInfo
   */
  follower: number
  // 不知用途的字段:
  // nameplate: {
  //   nid: number
  //   name: string
  //   image: string
  //   image_small: string
  //   level: string
  //   condition: string
  // }
}

function optionsGenerator() {
  return {
    baseUrl: prefix.api,
    method: 'GET',
    url: '/x/space/myinfo',
  }
}

function responseTransformer(response): UserInfo {
  const { code, data } = response
  if (code === -101) {
    throw new Error(errorMsg.noLogin)
  }
  return {
    id: data.mid,
    name: data.name,
    sex: data.sex,
    avatar: data.face,
    bio: data.sign,
    rank: data.rank,
    level: data.level,
    regTime: data.jointime,
    moral: data.moral,
    silence: data.silence,
    emailStatus: data.email_status,
    telStatus: data.tel_status,
    identificationStatus: data.identification,
    vipInfo: {
      type: data.vip.type,
      status: data.vip.status,
      expire: data.vip.due_date / 1e3,
      payType: data.vip.vip_pay_type,
    },
    avatarDecoration: {
      id: data.pendant.pid,
      name: data.pendant.name,
      url: data.pendant.image,
      expire: data.pendant.expire,
    },
    // nameplate: data.nameplate,
    officialVerify: {
      type: data.official.role,
      suffix: data.official.title,
      description: data.official.desc,
    },
    birthday: data.birthday,
    levelInfo: {
      level: data.level_exp.current_level,
      start: data.level_exp.current_min,
      end: data.level_exp.next_exp,
      exp: data.level_exp.current_exp,
    },
    coins: data.coins,
    following: data.following,
    follower: data.follower,
  }
}

export default apiFactory<UserInfo>({
  noOptions: true,
  optionsGenerator,
  responseTransformer,
})
