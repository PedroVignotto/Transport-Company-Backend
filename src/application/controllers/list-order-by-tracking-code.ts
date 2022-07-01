import { ok, HttpResponse, badRequest, serverError } from '@/application/helpers'
import { FieldNotFoundError } from '@/domain/errors'
import { ListOrderByTrackingCode } from '@/domain/use-cases'

type HttpRequest = { trackingCode: string }
type Model = undefined | Error

export class ListOrderByTrackingCodeController {
  constructor (private readonly listOrderByTrackingCode: ListOrderByTrackingCode) {}

  async handle ({ trackingCode }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.listOrderByTrackingCode({ trackingCode })
      return ok(undefined)
    } catch (error: any) {
      if (error instanceof FieldNotFoundError) return badRequest(error)
      return serverError(error)
    }
  }
}
