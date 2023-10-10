import type { AxiosResponse } from 'axios'
import { VITE_BASE_API, VITE_USE_PROXY, VITE_USE_MOCK } from 'vite-env'
import checkStatus from './checkStatus'
import type { RequestConfig, Result } from '#/http'
import { ErrorCodeEnum, HttpMethodEnum, CodeEnum } from '@/enums/httpEnum'
import { alertErrMsg } from '@/utils/message'
import { isDevMode } from '@/utils/env'

// 生成token
export const generateBaseToken = (token: Nullable<string>) => `Bearer ${token}`

// 获取默认请求前缀地址
export const getDefaultBaseURL = () => {
  // 使用proxy或者mock时，无需设置默认请求前缀
  if (isDevMode() && (VITE_USE_PROXY || VITE_USE_MOCK)) {
    return '/api/back'
  }
  return VITE_BASE_API
}

// 请求数据转换
export const transformRequest = (config: RequestConfig): RequestConfig => {
  const { data, params, method } = config
  // GET方法时 params来自 自身 或者 data
  if (method === HttpMethodEnum.GET) {
    config.params = params || data
    config.data = undefined
  }
  return config
}

// 响应数据转换
export const transformResponse = (
  res: AxiosResponse<Result>,
  config: RequestConfig
) => {
  if (!config.isTransformResponse) {
    return res.data
  }
  const { code, data, message: msg } = res.data
  checkStatus(code, msg as string)
  if (code === CodeEnum.SUCCESS) {
    return data
  }
  else {
    alertErrMsg(`${ErrorCodeEnum.B}${code}`, msg)
    throw new Error(code.toString())
  }
}
