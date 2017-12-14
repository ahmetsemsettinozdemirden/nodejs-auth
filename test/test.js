"use strict";
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

// environment variables
process.env.PORT = 9001;
process.env.MONGODB = "mongodb://localhost/auth-test"; // NEVER SET TO PRODUCTION DB !!!
process.env.LOGGING = "false";
process.env.SALT_ROUNDS = "10";
process.env.SECRET_KEY = "someSecretKey";

const server = require('../server');

chai.use(chaiHttp);

const User = require('../models/user');

const testUser = {
    email: "test@email.com",
    password: "password"
}

describe("Authentication Service", () => {
    
    it("syntax error", (done) => {

        chai.request(server)
            .post("/auth/authenticate")
            .set("content-type", "application/json")
            .send("some wrong json syntax")
            .end((err, res) => {

                assert.isNull(err);
                assert.equal(res.body.result, "failed");
                assert.equal(res.body.code, 1);
                assert.equal(res.body.response, "Syntax Error!");

                done();
        });

    });

    it("should give healty", (done) => {

        chai.request(server)
            .post("/health")
            .set("content-type", "application/json")
            .send({})
            .end((err, res) => {

                assert.isNull(err);
                assert.equal(res.body.result, "success");
                assert.equal(res.body.code, 0);
                assert.equal(res.body.response, "Healty!");

                done();
        });
        
    })

    describe("signUp", () => {

        before((done) => {
            User.remove({}, (err) => {

                assert.isNull(err);

                done();
            });
        });

        // TODO: validation

        it("should signUp", (done) => {

            chai.request(server)
                .post("/auth/signUp")
                .set("content-type", "application/json")
                .send({ email: testUser.email, password: testUser.password })
                .end((err, res) => {

                    assert.isNull(err);
                    assert.equal(res.body.result, "success");
                    assert.equal(res.body.code, 100);
                    assert.exists(res.body.response);

                    done();
                });
            
        });

    });
    
    describe("signIn", () => {

        // TODO: validation

        it("should signIn", (done) => {
            
            chai.request(server)
                .post("/auth/signIn")
                .set("content-type", "application/json")
                .send({ email: testUser.email, password: testUser.password })
                .end((err, res) => {

                    assert.isNull(err);
                    assert.equal(res.body.result, "success");
                    assert.equal(res.body.code, 200);
                    assert.exists(res.body.response);

                    done();
                });

        });

    });
    
    describe("authenticate", () => {
        
        let token = "";

        before((done) => {

            chai.request(server)
                .post("/auth/signIn")
                .set("content-type", "application/json")
                .send({ email: testUser.email, password: testUser.password })
                .end((err, res) => {
                    
                    assert.isNull(err);
                    assert.equal(res.body.result, "success");
                    assert.equal(res.body.code, 200);
                    assert.exists(res.body.response);

                    token = res.body.response;

                    done();
                });
                
        });

        // TODO: validation

        it("should authenticate", (done) => {

            chai.request(server)
                .post("/auth/authenticate")
                .set("content-type", "application/json")
                .send({ token })
                .end((err, res) => {

                    assert.isNull(err);
                    assert.equal(res.body.result, "success");
                    assert.equal(res.body.code, 300);
                    assert.equal(res.body.response.email, testUser.email);

                    done();
                });

        });

    });

});