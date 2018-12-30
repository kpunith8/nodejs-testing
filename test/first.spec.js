const expect = require('chai').expect;

describe('My App', () => {
  describe('Test sum functionality', () => {

    it('Should return 3', () => {
      expect(sum(1, -6)).to.equal(-5);
    });

    it('Should return -5', () => {
      expect(sum(1, -6)).to.equal(-5);
    });
  });
});

const sum = (a, b) => {
  return a + b;
}