const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');
const text = "We had a party at my friend's condo."
const locale = "american-to-british"
chai.use(chaiHttp);

let Translator = require('../components/translator.js');


suite('Functional Tests', () => {
    suite('Post Request Test', () => {

        test('#1 Translation with text and locale fields: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    text: text,
                    locale: locale
                })
                .end((err, res) => {
                    
                    assert.equal(res.status, 200);
                    assert.equal(res.body.text, text)
                    assert.equal(res.body.translation, 'We had a party at my friend\'s <span class="highlight">flat</span>.')
                    done();
                });
        });

        

        test('#2 Translation with text and invalid locale fields: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    text: text,
                    locale: locale.replace('british', 'french')
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Invalid value for locale field")
                    done();
                });
        });

        test('#3 Translation with missing text field: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    locale: locale.replace('british', 'french')
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field(s) missing")
                    done();
                });
        });

        test('#4 Translation with missing locale field: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    text: text,
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field(s) missing")
                    done();
                });
        });

        test('#5 Translation with empty text: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    text: '',
                    locale: 'british-to-american'
                })
                .end((err, res) => {
                    console.log(res.body)
                    assert.equal(res.status, 200);
                    
                    assert.equal(res.body.error, 'No text to translate')
                    done();
                });
        });

        test('#6 Translation with text that needs no translation: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    text: text,
                    locale: 'british-to-american'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.text, text)
                    assert.equal(res.body.translation, 'Everything looks good to me!')
                    done();
                });
        });

        
    })

    
});
