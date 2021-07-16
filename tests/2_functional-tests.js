const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

  test("Translation with text and locale fields", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "text");
        assert.property(res.body, "translation");
        done();
      })
  })

  test("Translation with text and invalid locale field", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "invalidLocaleField"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.deepEqual(res.body, {error: "Invalid value for locale field"});
        done();
      })
  })

  test("Translation with missing text field", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        locale: "invalidLocaleField"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.deepEqual(res.body, {error: "Required field(s) missing"});
        done();
      })
  })

  test("Translation with missing locale field", (done) => {
    chai
    .request(server)
    .post("/api/translate")
    .send({
      text: "Mangoes are my favorite fruit."
    })
    .end((err, res) => {
      assert.equal(res.status, 200);
      assert.property(res.body, "error");
      assert.deepEqual(res.body, {error: "Required field(s) missing"});
      done();
    })
  })

  test("Translation with empty text", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "",
        locale: "american-to-british"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.deepEqual(res.body, {error: "No text to translate"});
        done();
      })
  })

  test("Translation with text that needs no translation", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "british-to-american"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "text");
        assert.property(res.body, "translation");
        assert.deepEqual(res.body, {text: "Mangoes are my favorite fruit.", translation: "Everything looks good to me!"});
        done();
      })
  })

});
