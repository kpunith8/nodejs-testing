const expect = require('chai').expect;
const MembershipApplication = require('../src/membership-application');
const moment = require('moment');

describe('Apply for a mission', () => {
  describe('Application is valid if...', () => {
    const validApplication = new MembershipApplication({
      first: 'first',
      last: 'last',
      email: 'test@abc.com',
      age: 30,
      height: 45
    });

    it('All details are valid', () => {
      expect(validApplication.isValid()).to.equal(true);
    });

    // All other test cases can be ignored if it is tested for all negative cases and valid case testing all edge cases
    it('email should have 4 chars and @', () => {
      expect(validApplication.emailIsValid()).to.equal(true);
    });

    it('Height should be between 30 and 75 inches', () => {
      expect(validApplication.heightIsValid()).to.equal(true);
    });

    it('Age should be between 15 and 60', () => {
      expect(validApplication.ageIsValid()).to.equal(true);
    });

    it('First name should be minimum 2 chars and last name should be 1 char', () => {
      expect(validApplication.nameIsValid()).to.equal(true);
    });
  });

  describe('Applicaiton is invalid if...', () => {
    const invalidApplication = new MembershipApplication();

    it('is expired', () => {
      invalidApplication.validUntil = moment().add(10, 'days');
      expect(invalidApplication.expired()).to.not.equal(true);
    });

    it('email is 4 char or less', () => {
      invalidApplication.email = 'a@a';
      expect(invalidApplication.emailIsValid()).to.not.equal(true);
    });

    it('email does not contain an @', () => {
      invalidApplication.email = 'aaa.com';
      expect(invalidApplication.emailIsValid()).to.not.equal(true);
    });

    it('height is less than 20 inches', () => {
      invalidApplication.height = '20';
      expect(invalidApplication.heightIsValid()).to.not.equal(true);
    });

    it('height is more than 80 inches', () => {
      invalidApplication.height = '80';
      expect(invalidApplication.heightIsValid()).to.not.equal(true);
    });

    it('height is not present', () => {
      expect(invalidApplication.heightIsValid()).to.not.equal(true);
    });
  });
});