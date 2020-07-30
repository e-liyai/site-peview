const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../src/app')
const {
  constants
} = require('../src/utils')

chai.use(chaiHttp)
const { expect } = chai

describe('test endpoint', () => {
  it('expect status respond', done => {
    chai.request(app).get('/api/v1/').end((req, res) => {
      expect(res.body.status).to.equal(constants.IS_LIVE)
      done()
    })
  })
})
