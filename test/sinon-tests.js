'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.should();

const sinon = require('sinon');

describe('sinon tests', () => {
  let student, schedule;
  beforeEach(() => {
    student = {
      dropClass: function (classId, cb) {
        // do stuff
        if (!!cb.dropClass) {
          cb.dropClass();
        } else {
          cb();
        }
      },

      addClass: function (schedule) {
        if (!schedule.isClassFull()) {
          return true;
        } else {
          return false;
        }
      }
    };

    schedule = {
      dropClass: function () {
        //console.log('Class dropped!!');
      },

      isClassFull: function () {
        return true;
      }
    }
  });

  // spy can be used on a function in an object
  describe('sinon spies examples', () => {
    describe('spying student.dropClass method', () => {
      it('should call the callback', () => {
        let dropClassSpy = sinon.spy();

        student.dropClass(1, dropClassSpy);

        dropClassSpy.called.should.be.true;
      });

      it('should call the callback and logs to console', () => {
        function onClassDropped() {
          //console.log('onClassDropped was called');
        }

        let dropClassSpy = sinon.spy(onClassDropped);

        student.dropClass(1, dropClassSpy);

        dropClassSpy.called.should.be.true;
      });

      it('should call the callback even if it is a method of an object', () => {
        // spy to create method on an object
        sinon.spy(schedule, 'dropClass');
        student.dropClass(1, schedule);
        schedule.dropClass.called.should.be.true;
      });
    });
  });

  // stubs can be used on entire object
  describe('sinon stub examples', () => {
    it('should call a stubbed method', () => {
      let stub = sinon.stub(schedule);
      student.dropClass(1, stub.dropClass);

      stub.dropClass.called.should.be.true;
    });

    it('should return true when class is not full', () => {
      let stub = sinon.stub(schedule);

      // stubing the value of isClassFull() method to return false
      stub.isClassFull.returns(false);

      let returnVal = student.addClass(stub);
      returnVal.should.be.true;
    });
  });

  describe('sinon mock examples', () => {
    it('should mock a student', () => {
      let mockObj = sinon.mock(schedule);
      let isClassFullCalledOnce = mockObj.expects('isClassFull').once();

      student.addClass(schedule);
      isClassFullCalledOnce.verify();
    });
  });

});
