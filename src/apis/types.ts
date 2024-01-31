export class ResponseError extends Error {
  messages: string[]
  constructor(messages: string[]) {
    super()
    this.message = messages.join('. ')
    this.messages = messages
  }
}

export type PaginationParams = {
  limit?: number
  offset?: number
}

export type ApiResponseMeta = {
  limit: number
  offset: number
  total: number
  totalPages: number
}

export type ApiListResponse<T> = {
  meta: ApiResponseMeta
  data: T[]
}
