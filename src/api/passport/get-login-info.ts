import { prefix, errorMsg } from '../../utils'
import { apiFactory } from '../../utils/api'
import { LoginInfo, LoginStatusCode } from './types'
import Url from 'url-parse'

export interface ApiOptions {
  /**
   * oauthKey
   *
   * 从 getLoginUrl 接口获取
   *
   * @type {string}
   * @memberof ApiOptions
   */
  oauthKey: string
  /**
   * 重定向 Url `gourl`
   *
   * 网页登录时使用，没卵用可不填
   *
   * @type {string}
   * @memberof ApiOptions
   */
  redirect?: string
}

function optionsGenerator({ oauthKey, redirect }: ApiOptions) {
  return {
    baseUrl: prefix.passport,
    method: 'POST',
    url: '/qrcode/getLoginInfo',
    form: {
      oauthKey,
      gourl: redirect,
    },
  }
}

interface LoginResultOther {
  status: false
  data: LoginStatusCode
}

interface LoginResultSuccess {
  status: true
  data: {
    url: string
  }
}

function responseTransformer(
  response: LoginResultOther | LoginResultSuccess,
): LoginInfo | LoginStatusCode {
  if (response.status === true) {
    const {
      DedeUserID,
      // DedeUserID__ckMd5,
      Expires,
      SESSDATA,
      bili_jct,
      gourl,
    } = Url(response.data.url, null, true).query

    return {
      userId: Number(DedeUserID),
      expires: Number(Expires),
      sessionData: SESSDATA,
      csrfToken: bili_jct,
      redirect: gourl,
    }
  }

  if (response.status === false) {
    return response.data
  }

  throw new Error(errorMsg.responseUnexpected)
}

export default apiFactory<ApiOptions, LoginInfo | LoginStatusCode>({
  optionsGenerator,
  responseTransformer,
})
