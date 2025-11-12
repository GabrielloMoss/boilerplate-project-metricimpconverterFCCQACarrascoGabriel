const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);

  test('Convert a valid input such as 10L: GET /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.strictEqual(res.body.initNum, 10);
        assert.strictEqual(res.body.initUnit, 'L');
        assert.strictEqual(res.body.returnUnit, 'gal');
        assert.approximately(res.body.returnNum, 2.64172, 0.0001);
        assert.isString(res.body.string);
        done();
      });
  });

  test('Convert an invalid input such as 32g: GET /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  test('Convert an invalid number such as 3/7.2/4kg: GET /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  test('Convert with no number such as kg: GET /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.strictEqual(res.body.initNum, 1);
        assert.strictEqual(res.body.initUnit, 'kg');
        assert.strictEqual(res.body.returnUnit, 'lbs');
        assert.approximately(res.body.returnNum, 2.20462, 0.0001);
        assert.isString(res.body.string);
        done();
      });
  });
});

