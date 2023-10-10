import { useCookie } from '@h/web/useCookie'
import type { UserInfoModel } from '../_system/model/userModel'
import type { BuildMenuModel } from '../_system/model/menuModel'
import type { LoginParams, LoginResultModel } from './model'

// import { ContentTypeEnum } from '@/enums/httpEnum'
import { AuthTypeEnum, GrantTypeEnum, TokenTypeEnum } from '@/enums/authEnum'
import { useFetch } from '@/utils/http'
import config from '@/config'
import { ContentTypeEnum } from '@/enums/httpEnum'

export enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  ACCOUNT_INFO = '/auth/info',
  BUILD_MENU = '/auth/menus'
}

const createAuthHeader = () => {
  const { client_id, client_secret } = config.OAUTH
  return {
    'Content-Type': ContentTypeEnum.JSON,
    'Authorization': `${AuthTypeEnum.BEARER} ${window.btoa(
      `${client_id}:${client_secret}`
    )}`
  }
}

export const loginApi = (data: LoginParams) => {
  return useFetch.POST<LoginResultModel>({
    url: Api.Login,
    headers: createAuthHeader(),
    withToken: false,
    useMock: false,
    data: {
      ...data,
      grant_type: GrantTypeEnum.PASSWORD
    }
  })
}

export const tokenRefresh = () => {
  return useFetch.POST<LoginResultModel>({
    url: Api.Refresh,
    withToken: true,
    useMock: true,
    data: {
      refresh_token: useCookie(TokenTypeEnum.REFRESH_TOKEN),
      grant_type: GrantTypeEnum.REFRESH_TOKEN
    }
  })
}

export const getAccountInfo = () => {
  return useFetch.POST<UserInfoModel>({
    url: Api.ACCOUNT_INFO,
    withToken: true,
    useMock: false
  })
}

export const actAccountLogout = () => {
  return useFetch.POST({
    url: Api.Logout,
    withToken: true,
    useMock: false
  })
}

export const buildMenuApi = () => {
  return useFetch.POST<BuildMenuModel[]>({
    url: Api.BUILD_MENU,
    withToken: true,
    useMock: false
  })
}
