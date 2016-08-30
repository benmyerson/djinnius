'use strict';

describe('Service: FBUtils', function () {

  // load the service's module
  beforeEach(module('djinniusApp'));

  // instantiate service
  var FBUtils;
  beforeEach(inject(function (_FBUtils_) {
    FBUtils = _FBUtils_;
  }));

  it('should do something', function () {
    expect(!!FBUtils).toBe(true);
  });

});
