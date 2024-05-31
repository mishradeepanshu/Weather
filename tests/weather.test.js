const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Weather API', () => {
    describe('GET /', () => {
        it('it should return status code 200', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('GET /generate_pdf', () => {
        it('it should generate a PDF file', (done) => {
            chai.request(app)
                .get('/generate_pdf')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
