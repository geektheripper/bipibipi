import FormData from 'form-data'
import { prefix, errorMsg } from '../../utils'
import { apiFactory } from '../../utils/api'

import { ReadStream } from 'fs'

export interface SimBlob {
  value: Buffer | ReadStream
  options: FormData.AppendOptions
}

export interface ApiOptions {
  /**
   * 该上传资源应用的业务 `biz`
   *
   * show:直播间颜值领域封面
   *
   * room:直播间封面
   *
   * @type {('show' | 'room')}
   * @memberof UploadOptions
   */
  business: 'show' | 'room'
  /**
   * 该上传的资源的分类
   *
   * 此字段会绑定了后台的资源格式验证规则
   * 不填此项时不会触发格式校验
   *
   * show_cover: 500x500 <100k jpg|png
   *
   * room_cover: 470x293 <100k jpg|png
   *
   * @type {('show_cover' | 'room_cover')}
   * @memberof UploadOptions
   */
  category?: 'show_cover' | 'room_cover'
  /**
   * 上传的资源 `file_up`
   *
   * @type {(ReadStream | SimBlob)}
   * @memberof UploadOptions
   */
  file: ReadStream | SimBlob
}

export interface ImageInfo {
  /**
   * 图片 URL `image_url`
   *
   * @type {string}
   * @memberof ImageInfo
   */
  url: string
  /**
   * 图片宽度 `image_width`
   *
   * @type {number}
   * @memberof ImageInfo
   */
  width: number
  /**
   * 图片长度 `image_height`
   *
   * @type {number}
   * @memberof ImageInfo
   */
  height: number
}

function optionsGenerator({ business, category, file }: ApiOptions) {
  const formData: any = {
    biz: business,
    file_up: file,
  }

  if (category) {
    formData.category = category
  }

  return {
    baseUrl: prefix.vcApi,
    method: 'POST',
    url: '/api/v1/image/upload',
    formData,
  }
}

function responseTransformer(response): ImageInfo {
  const { code, data } = response

  if (code === 0) {
    const { image_url: url, image_width: width, image_height: height } = data
    return { url, width, height }
  }

  console.error(response)
  throw new Error(errorMsg.badRequest)
}

export default apiFactory<ApiOptions, ImageInfo>({
  optionsGenerator,
  responseTransformer,
})
