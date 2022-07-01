import { ok, HttpResponse, badRequest } from '@/application/helpers'
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
      return badRequest(error)
    }
  }
}
