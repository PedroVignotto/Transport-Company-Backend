import { generateRandomFieldName } from '@/tests/mocks'
import { app } from '@/main/config/app'

import request from 'supertest'

describe('BodyParser Middleware', () => {
  let fieldName: string

  beforeEach(() => {
    fieldName = generateRandomFieldName()
  })

  it('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => { res.send(req.body) })

    await request(app).post('/test_body_parser').send({ fieldName }).expect({ fieldName })
  })
})
