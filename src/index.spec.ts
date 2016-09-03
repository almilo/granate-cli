import foo from './index';

describe('foo', function () {
    it('should return bar', function () {
        foo('foo').should.equal('bar');
    });
});
