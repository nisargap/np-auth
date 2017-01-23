/******************************************
** Author: Nisarga Patel
** Description: In this file I will be writing
** some basic tests to test the user model's
** validation. I am using mocha as my JS test
** framework and using chai for the expect
** assertion mechanism
********************************************/

let expect = require("chai").expect;

let mongoose = require("mongoose");

// Supresses mpromise deprecation warning
mongoose.Promise = global.Promise;

let User = require("../models/User");

describe("User Model Tests", () => {

  describe("Valid username", () => {

    it("fulfills all the user model requirements", () => {

      // define a user
      let testUser = new User({
        name: "Eddy",
        username: "eddyman",
        password: "asdasdasd",
        email: "eddy@email.com",
      });

      testUser.validate((err) => {

        expect(err).to.equal(false);

      });

    });

  });

  describe("Invalid email", () => {
    it("does not fulfill email requirements", () => {

      let testUser = new User({
        name: "Eddy",
        username: "ed",
        password: "asdasdasd",
        email: "eddyemail.com",
      });

      testUser.validate((err) => {

        let errMsg = err.errors['email'].message;

        expect(errMsg).to.equal("Validator failed for path `email` with value `eddyemail.com`");

      })

    })
  })

  describe("Short username", () => {

    it("is less than the min length", () => {

      // define a user
      let testUser = new User({
        name: "Eddy",
        username: "ed",
        password: "asdasdasd",
        email: "eddy@email.com",
      });

      testUser.validate((err) => {

        let errMsg = err.errors['username'].message;
        expect(errMsg).to.equal('Path `username` (`ed`) is shorter than the minimum allowed length (6).');

      });

    })

  })

  describe("No password", () => {


    it('is not included in the definition', () => {

      let testUser = new User({
        name: "Eddy",
        username: "ed",
        email: "eddy@email.com",
      });

      testUser.validate((err) => {

        let errMsg = err.errors['password'].message;
        expect(errMsg).to.equal('Path `password` is required.');

      });

    });

  });

})
