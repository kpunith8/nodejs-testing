const _ = require('underscore');
const moment = require('moment');

const MembershipApplication = function (args) {
  _.extend(this, args);

  this.validUntil = this.validUntil ? moment(this.validUntil) : moment().add(10, 'days');

  this.expired = function () {
    return this.validUntil.isBefore(moment());
  }

  this.emailIsValid = function () {
    return this.email && this.email.length > 3 && this.email.indexOf('@') > -1;
  };

  this.heightIsValid = function () {
    return this.height && this.height > 30 && this.height < 75;
  };

  this.ageIsValid = function () {
    return this.age && this.age > 15 && this.age < 60;
  };

  this.nameIsValid = function () {
    return this.first.length > 2 && this.last.length > 1;
  }

  this.isValid = function () {
    return this.emailIsValid() &&
      this.heightIsValid() &&
      this.ageIsValid() &&
      this.nameIsValid();
  };
};

module.exports = MembershipApplication;