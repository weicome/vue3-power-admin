export type ApiParam = Record<string, any>

export interface ListQuery<T = any> {
  page: number
  size: number
  query?: Partial<T>
}

export interface ListResult<T = any> {
  current: number
  size: number
  total: number
  list: T[]
}
export interface ListResuorce<T = any> {
  data: T[]
  meta: {
    pagination: {
      count: number
      current_page: number
      per_page: number
      total: number
      total_pages: number
    }
  }
}

export interface DateLogModel {
  created_at: string
  updated_at: string
}
