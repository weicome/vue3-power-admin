export enum AuthTypeEnum {
  BASIC = 'basic',
  BEARER = 'Bearer'
}

export enum GrantTypeEnum {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token'
}

export enum TokenTypeEnum {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  LARAVEL_TOKEN = 'laravel_session'
}
