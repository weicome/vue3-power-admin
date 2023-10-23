import { createCookie, removeCookies } from '@h/web/useCookie'
import { defineStore } from 'pinia'
import type { LoginParams, LoginResultModel } from '@/api/_auth/model'
import type { UserInfoModel } from '@/api/_system/model/userModel'
import { loginApi, tokenRefresh, getAccountInfo, actAccountLogout } from '@/api/_auth'
import { checkPassword } from '@/utils/regex'
import { TokenTypeEnum } from '@/enums/authEnum'

import { router } from '@/router'

interface UserState extends UserInfoModel {
  security: boolean
}

function setTokenHelper({
  access_token,
  refresh_token,
  expires_in
}: LoginResultModel) {
  createCookie(TokenTypeEnum.ACCESS_TOKEN, access_token, {
    // expires: expires_in / (24 * 60 * 60 - 10)
    expires: expires_in - 60
  })
  createCookie(TokenTypeEnum.REFRESH_TOKEN, refresh_token)
}

const initialUserState = {
  id: -1,
  account: 'coder',
  username: 'Toryz',
  password: '123456',
  avatar: 'https://avatars.githubusercontent.com/u/36221207?v=4',
  mobile: '18812345678',
  status: 1,
  roles: [
    { id: 0, code: 'ADMIN', name: '管理员', menu: [] }
  ],
  created_at: '2019-01-01',
  security: true // 密码安全性
}

export const useUserStore = defineStore('user', {
  state: (): UserState => initialUserState,
  getters: {
    invalid: state => state.id === -1
  },
  actions: {
    async login({
      account,
      password
    }: LoginParams): Promise<LoginResultModel> {
      const data = await loginApi({ account, password })
      if (!data) {
        return Promise.reject(new Error('login failed!'))
      }
      setTokenHelper(data)
      this.security = checkPassword(password)
      await this.setUserInfo()
      return data
    },

    async reLogin(): Promise<LoginResultModel> {
      const data = await tokenRefresh()
      console.log(data)
      setTokenHelper(data)
      await this.setUserInfo()
      return data
    },

    async setUserInfo() {
      const accountInfo = await getAccountInfo()
      this.$patch(accountInfo)
    },
    toLogin() {
      this.$state = initialUserState
      removeCookies([TokenTypeEnum.ACCESS_TOKEN, TokenTypeEnum.REFRESH_TOKEN, TokenTypeEnum.LARAVEL_TOKEN])
      console.log('tologin')
      console.log('reset', this.$state)
      router.replace({ name: 'Login' })
    },
    logout() {
      this.$state = initialUserState
      removeCookies([TokenTypeEnum.ACCESS_TOKEN, TokenTypeEnum.REFRESH_TOKEN, TokenTypeEnum.LARAVEL_TOKEN])
      actAccountLogout().then(() => {
        router.replace({ name: 'Login' })
      })
    }
  },
  persist: {
    key: 'USER_STORE',
    storage: window.sessionStorage
  }
})
