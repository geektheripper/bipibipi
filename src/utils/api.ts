import { CoreOptions } from 'request'
import request from 'request-promise-native'
import { errorMsg } from './'

export interface TypeRequestOptions extends CoreOptions {
  url: string
}

export type AuthRequest = (options: TypeRequestOptions) => Promise<any>

export const jsonBodyParser: BodyParser = response => {
  try {
    return JSON.parse(response)
  } catch (e) {
    console.error(e)
    throw new Error(errorMsg.responseUnexpected)
  }
}

export async function adaptiveRequest(
  options,
  authRequest?: AuthRequest,
): Promise<any> {
  try {
    return authRequest ? await authRequest(options) : await request(options)
  } catch (e) {
    console.error(e)
    throw new Error(errorMsg.badRequest)
  }
}

export type Api<ApiOptions, ReturnType> = (
  options: ApiOptions,
  authRequest?: AuthRequest,
) => Promise<ReturnType>
export type NoOptionsApi<ReturnType> = (
  authRequest?: AuthRequest,
) => Promise<ReturnType>

export type RequestOptionsGenerator<ApiOptions> = (
  options: ApiOptions,
) => TypeRequestOptions
export type NoOptionsRequestOptionsGenerator = () => TypeRequestOptions

export type BodyParser = (body: any) => any
export type ResponseTransformer<ReturnType> = (response: any) => ReturnType

export interface ApiFactoryOptions<ApiOptions, ReturnType> {
  optionsGenerator: RequestOptionsGenerator<ApiOptions>
  bodyParser?: BodyParser
  responseTransformer: ResponseTransformer<ReturnType>
}
export interface NoOptionsApiFactoryOptions<ReturnType> {
  noOptions: true
  optionsGenerator: NoOptionsRequestOptionsGenerator
  bodyParser?: BodyParser
  responseTransformer: ResponseTransformer<ReturnType>
}

export function apiFactory<ReturnType>({
  optionsGenerator,
  bodyParser,
  responseTransformer,
}: NoOptionsApiFactoryOptions<ReturnType>): NoOptionsApi<ReturnType>

export function apiFactory<ApiOptions, ReturnType>({
  optionsGenerator,
  bodyParser,
  responseTransformer,
}: ApiFactoryOptions<ApiOptions, ReturnType>): Api<ApiOptions, ReturnType>

export function apiFactory({
  noOptions,
  optionsGenerator,
  bodyParser = jsonBodyParser,
  responseTransformer,
}) {
  if (noOptions) {
    return async (authRequest?: AuthRequest) => {
      const body = await adaptiveRequest(optionsGenerator(), authRequest)
      const response = bodyParser(body)
      return responseTransformer(response)
    }
  }
  return async (options, authRequest?: AuthRequest) => {
    const body = await adaptiveRequest(optionsGenerator(options), authRequest)
    const response = bodyParser(body)
    return responseTransformer(response)
  }
}
