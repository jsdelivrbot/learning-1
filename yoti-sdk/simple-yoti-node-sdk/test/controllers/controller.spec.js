import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../index'

describe('api tests', function() {
    it('should test a route', function() {
        supertest(app)
            .get('/potato')
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200)
            })
    })
})