import { ok, HttpResponse } from '@/application/helpers'
import { ListOrderByTrackingCode } from '@/domain/use-cases'

type HttpRequest = { trackingCode: string }
type Model = undefined

export class ListOrderByTrackingCodeController {
  constructor (private readonly listOrderByTrackingCode: ListOrderByTrackingCode) {}

  async handle ({ trackingCode }: HttpRequest): Promise<HttpResponse<Model>> {
    await this.listOrderByTrackingCode({ trackingCode })
    return ok(undefined)
  }
}
