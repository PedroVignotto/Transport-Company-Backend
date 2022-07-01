import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeListOrderByTrackingCodeController } from '@/main/factories/application/controllers/list-order-by-tracking-code'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/:trackingCode', adapt(makeListOrderByTrackingCodeController()))
}
