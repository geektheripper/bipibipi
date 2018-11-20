export enum UserOfficialVerify {
  /**
   * 未认证
   */
  NoVerify = -1,
  /**
   * 个人认证
   */
  Personal = 0,
  /**
   * 企业认证
   */
  Enterprise = 1,
}

export enum SPLevel {
  /**
   * 无能力者
   */
  Level0,
  /**
   * 低能力者
   */
  Level1,
  /**
   * 异能力者
   */
  Level2,
  /**
   * 强能力者
   */
  Level3,
  /**
   * 大能力者
   */
  Level4,
  /**
   * 超能力者
   */
  Level5,
  /**
   * 绝对能力者
   */
  Level6,
}

export interface VerifyInfo {
  /**
   * 认证状态
   *
   * @type {UserOfficialVerify}
   * @memberof VerifyInfo
   */
  type: UserOfficialVerify
  /**
   * 认证描述 `desc`
   *
   * @type {string}
   * @memberof VerifyInfo
   */
  description: string
  /**
   * 后缀（疑似尚未使用）
   *
   * @type {string}
   * @memberof VerifyInfo
   */
  suffix: string
}

export enum VipType {
  /**
   * 大会员
   */
  BigVip = 1,
  /**
   * 年度大会员
   */
  AnnualVip = 2,
}

export enum VipStatus {
  NotVip = 0,
  IsVip = 1,
}

export interface VipInfo {
  /**
   * 会员类型
   *
   * @type {VipType}
   * @memberof VipInfo
   */
  type: VipType
  /**
   * 会员状态(是否会员)
   *
   * @type {VipStatus}
   * @memberof VipInfo
   */
  status: VipStatus
}

export interface FullVipInfo extends VipInfo {
  /**
   * 过期时间 `due_date`
   *
   * 原始字段使用了毫秒级时间戳，这里自动转成了标准 unix 时间戳
   *
   * @type {number}
   * @memberof FullVipInfo
   */
  expire: number
  /**
   * 支付方式 `vip_pay_type`
   *
   * TODO: 理清枚举值含义
   *
   * @type {number}
   * @memberof FullVipInfo
   */
  payType: number
}

export interface AvatarDecoration {
  /**
   * 挂件 Id `pid`
   *
   * @type {number}
   * @memberof AvatarDecoration
   */
  id: number
  /**
   * 挂件名
   *
   * @type {string}
   * @memberof AvatarDecoration
   */
  name: string
  /**
   * 挂件图片 URL `image`
   *
   * @type {string}
   * @memberof AvatarDecoration
   */
  url: string
  /**
   * 过期时间
   *
   * @type {number}
   * @memberof AvatarDecoration
   */
  expire: number
}

export interface LevelInfo {
  /**
   * 当前等级 `current_level`
   *
   * @type {number}
   * @memberof LevelInfo
   */
  level: number
  /**
   * 当前等级的经验值起点 `current_min`
   *
   * @type {number}
   * @memberof LevelInfo
   */
  start: number
  /**
   * 下一等级的经验值起点 `next_exp`
   *
   * @type {number}
   * @memberof LevelInfo
   */
  end: number
  /**
   * 当前经验值 `current_exp`
   *
   * @type {number}
   * @memberof LevelInfo
   */
  exp: number
}

export enum EmailStatus {
  UnVerified,
  Verified,
}
export enum TelStatus {
  UnVerified,
  Verified,
}
export enum IdentificationStatus {
  UnVerified,
  Verified,
}
