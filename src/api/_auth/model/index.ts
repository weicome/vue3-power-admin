export interface LoginParams {
  account: string
  password: string
  rememberMe?: boolean
}

export interface LoginResultModel {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  [key: string]: any
}
