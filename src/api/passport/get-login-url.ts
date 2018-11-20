import { prefix } from '../../utils'
import { apiFactory } from '../../utils/api'

/**
 * getLoginUrl 的返回值
 *
 * @export
 * @interface LoginUrlData
 */
export interface LoginUrlData {
  /**
   * oauthKey
   *
   * 用于 getLoginInfo 获取登录状态
   *
   * @type {string}
   * @memberof LoginUrlData
   */
  oauthKey: string
  /**
   * oauthUrl `url`
   *
   * 用于生成二维码供移动客户端扫码登录
   *
   * @type {string}
   * @memberof LoginUrlData
   */
  oauthUrl: string
}

function optionsGenerator() {
  return {
    baseUrl: prefix.passport,
    method: 'GET',
    url: '/qrcode/getLoginUrl',
  }
}

function responseTransformer(response): LoginUrlData {
  const { oauthKey, url } = response.data
  return { oauthKey, oauthUrl: url }
}

export default apiFactory<LoginUrlData>({
  noOptions: true,
  optionsGenerator,
  responseTransformer,
})
