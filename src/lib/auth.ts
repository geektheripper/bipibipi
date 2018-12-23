import request from 'request-promise-native'
import fs from 'mz/fs'

import { LoginInfo, LoginStatusCode } from '../api/passport/types'
import getLoginUrl from '../api/passport/get-login-url'
import getLoginInfo from '../api/passport/get-login-info'

import { asyncUtil } from '../utils'
import { AuthRequest, TypeRequestOptions } from '../utils/api'

/**
 * 验证类，用于发起登录和生成 Cookie 等
 *
 * @export
 * @class Auth
 */
export default class Auth {
  /**
   * 解析一个 Curl 请求，并从中提取出 ID/Session/Token
   *
   * @static
   * @param {string} rawCurl
   * @returns {LoginInfo} 登录信息，用于构造 Auth 对象
   * @memberof Auth
   */
  public static parseCurl(rawCurl: string): LoginInfo {
    const cookie = decodeURIComponent(rawCurl.match(/-H '(Cookie:.+?)'/)[1])
    const csrfToken = cookie.match(/bili_jct=(.+?);/)[1]
    const userId = cookie.match(/DedeUserID=(.+?);/)[1]
    const sessionData = cookie.match(/SESSDATA=(.+?);/)[1]
    return {
      userId: Number(userId),
      sessionData,
      csrfToken,
    }
  }
  /**
   * 从环境变量中提取 USER_ID / SESSION_DATA / CSRF_TOKEN
   *
   * @static
   * @returns {LoginInfo} 登录信息，用于构造 Auth 对象
   * @memberof Auth
   */
  public static parseEnviroment(): LoginInfo {
    return {
      userId: Number(process.env.USER_ID),
      sessionData: process.env.SESSION_DATA,
      csrfToken: process.env.CSRF_TOKEN,
    }
  }

  public loginInfo: LoginInfo
  private oauthKey: string

  /**
   * 创建 Auth 实例
   * @param {LoginInfo} [loginInfo] 如果事先完成了登录，可以使用登录信息直接构建 Auth 实例
   * @memberof Auth
   */
  constructor(loginInfo?: LoginInfo) {
    this.loginInfo = loginInfo
  }
  /**
   * 获取用于登录的 cookie，需要先完成登录
   *
   * @readonly
   * @type {string}
   * @memberof Auth
   */
  public getCookie(): string {
    if (!this.loginInfo) {
      throw new Error('login before get cookie')
    }
    const { userId, sessionData, csrfToken } = this.loginInfo
    return `DedeUserID=${userId}; SESSDATA=${sessionData}; bili_jct=${csrfToken}`
  }
  /**
   * 获取用于登录的 Enviroment，需要先完成登录
   *
   * @returns {string} 包含登录信息的 key=value 格式的文本
   * @memberof Auth
   */
  public getEnv(): string {
    const { userId, sessionData, csrfToken } = this.loginInfo
    return `USER_ID=${userId}
SESSION_DATA=${sessionData}
CSRF_TOKEN=${csrfToken}
`
  }
  /**
   * 异步写 Env 文件
   *
   * @param {*} filePath 目标文件的路径
   * @returns {Promise<void>} Promise
   * @memberof Auth
   */
  public writeEnvFile(filePath: string): Promise<void> {
    return fs.writeFile(filePath, this.getEnv())
  }
  /**
   * 同步写 Env 文件
   *
   * @param {string} filePath 目标文件的路径
   * @returns void
   * @memberof Auth
   */
  public writeEnvFileSync(filePath: string) {
    return fs.writeFileSync(filePath, this.getEnv())
  }
  /**
   * 获取 Url 用于客户端扫码
   *
   * @returns {Promise<string>}
   * @memberof Auth
   */
  public async getLoginUrl(): Promise<string> {
    const { oauthKey, oauthUrl } = await getLoginUrl()
    this.oauthKey = oauthKey
    return oauthUrl
  }
  /**
   * 获取登录状态
   *
   * @returns {(Promise<LoginInfo | LoginStatusCode>)}
   * @memberof Auth
   */
  public async getLoginInfo(): Promise<LoginInfo | LoginStatusCode> {
    const loginInfo = await getLoginInfo({ oauthKey: this.oauthKey })
    return loginInfo
  }
  /**
   * 等待登录结果（成功或者超时）
   * 默认超时等待时间和轮询间隔参考B站登录页的值，建议不要修改
   *
   * @param {{ timeout?: number, interval?: number }} [{ timeout = 300, interval = 3 }={ timeout: 300, interval: 3 }] timeout: 超时时间，interval: 轮询间隔
   * @returns {Promise<LoginInfo>}
   * @memberof Auth
   */
  public waitingUntilLogin(
    { timeout = 300, interval = 3 }: { timeout?: number; interval?: number } = {
      timeout: 300,
      interval: 3,
    },
  ): Promise<LoginInfo> {
    const timeOutPoint = new Date().getTime() + timeout * 6e4

    return new Promise(async (resolve, reject) => {
      do {
        let result

        try {
          result = await this.getLoginInfo()
        } catch (e) {
          reject(e)
          return
        }

        switch (result) {
          case LoginStatusCode.oauthKeyNotExist:
          case LoginStatusCode.oauthKeyNotSet:
            reject(LoginStatusCode[result])
            return
          case LoginStatusCode.waitingScan:
          case LoginStatusCode.waitingConfirm:
            await asyncUtil.delay(interval)
            break
          default:
            this.loginInfo = result
            resolve(result)
            return
        }
      } while (new Date().getTime() < timeOutPoint)

      reject('timeout')
    })
  }
  /**
   * 请求前添加验证相关信息
   *
   * @param {TypeRequestOptions} options
   * @memberof Auth
   */
  public async request(options: TypeRequestOptions): Promise<any> {
    options = { ...options }
    options.headers = { ...options.headers, Cookie: this.getCookie() }

    if (typeof options.form === 'object') {
      options.form = { ...options.form, csrf: this.loginInfo.csrfToken }
    }

    const response = await request(options)
    return response
  }
  /**
   * 获取基于验证的请求器
   *
   * @returns {AuthRequest}
   * @memberof Auth
   */
  public getRequest(): AuthRequest {
    return (options: TypeRequestOptions) => this.request(options)
  }
}
