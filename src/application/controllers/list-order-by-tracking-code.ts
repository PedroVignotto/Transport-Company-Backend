import { Controller } from '@/application/controllers/controller'
import { ok, HttpResponse } from '@/application/helpers'
import { ListOrderByTrackingCode } from '@/domain/use-cases'
import { Order } from '@/domain/models'

type HttpRequest = { trackingCode: string }
type Model = Order | Error

export class ListOrderByTrackingCodeController extends Controller {
  constructor (private readonly listOrderByTrackingCode: ListOrderByTrackingCode) { super() }

  async perform ({ trackingCode }: HttpRequest): Promise<HttpResponse<Model>> {
    const order = await this.listOrderByTrackingCode({ trackingCode })
    return ok(order)
  }
}
