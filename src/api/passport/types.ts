export enum LoginStatusCode {
  /**
   * oauthKey 没传
   */
  oauthKeyNotSet = -1,
  /**
   * oauthKey 不存在（错误或已过期）
   */
  oauthKeyNotExist = -2,
  /**
   * 等待扫码
   */
  waitingScan = -4,
  /**
   * 等待客户端验证
   */
  waitingConfirm = -5,
}

export interface LoginInfo {
  /**
   * 用户 Id  `DedeUserID`
   *
   * DedeUserID，23333
   *
   * @type {number}
   * @memberof LoginInfo
   */
  userId: number
  /**
   * 登录过期时间 `Expires`
   *
   * 单位秒，一般是 2592000 （一个月）
   *
   * @type {number}
   * @memberof LoginInfo
   */
  expires?: number
  /**
   * 登录 Session `SESSDATA`
   *
   * @type {string}
   * @memberof LoginInfo
   */
  sessionData: string
  /**
   * 反跨域请求伪造 Token `bili_jct`
   *
   * @type {string}
   * @memberof LoginInfo
   */
  csrfToken: string
  /**
   * 重定向 Url `gourl`
   *
   * @type {string}
   * @memberof LoginInfo
   */
  redirect?: string
}
