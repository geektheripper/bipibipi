import { prefix, errorMsg } from '../../utils'
import { apiFactory } from '../../utils/api'

export enum FollowAction {
  Follow = 1,
  UnFollow,
}

export interface ApiOptions {
  /**
   * 关注或取关 `type`
   *
   * @type {FollowAction}
   * @memberof ApiOptions
   */
  action: FollowAction
  /**
   * 目标用户的 ID `fid`
   *
   * @type {number}
   * @memberof ApiOptions
   */
  targetUserId: number
  // unknow field
  // re_src: number，取值 0 到 255 都能成功调用，
  // 不知道具体作用，默认填充扒接口时取到的 11
  // visit_id: 扒接口时传空
}

function optionsGenerator({ action, targetUserId }: ApiOptions) {
  return {
    baseUrl: prefix.api,
    method: 'POST',
    url: '/x/relation/modify',
    form: {
      act: action,
      fid: targetUserId,
      re_src: 11,
      visit_id: '',
    },
  }
}

function responseTransformer(response: any): null {
  const { code } = response

  if (code !== 0) {
    console.error(response)
    throw new Error(errorMsg.responseUnexpected)
  }

  return null
}

export default apiFactory<ApiOptions, null>({
  optionsGenerator,
  responseTransformer,
})
