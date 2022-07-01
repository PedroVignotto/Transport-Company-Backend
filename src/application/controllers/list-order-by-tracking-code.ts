import { ok, HttpResponse, badRequest, serverError } from '@/application/helpers'
import { ListOrderByTrackingCode } from '@/domain/use-cases'
import { FieldNotFoundError } from '@/domain/errors'
import { Order } from '@/domain/models'

type HttpRequest = { trackingCode: string }
type Model = Order | Error

export class ListOrderByTrackingCodeController {
  constructor (private readonly listOrderByTrackingCode: ListOrderByTrackingCode) {}

  async handle ({ trackingCode }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const order = await this.listOrderByTrackingCode({ trackingCode })
      return ok(order)
    } catch (error: any) {
      if (error instanceof FieldNotFoundError) return badRequest(error)
      return serverError(error)
    }
  }
}
