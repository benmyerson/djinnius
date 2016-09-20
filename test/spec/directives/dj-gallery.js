'use strict';

describe('Directive: djGallery', function () {

  // load the directive's module
  beforeEach(module('djinniusApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dj-gallery></dj-gallery>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the djGallery directive');
  }));
});
