var coverify = require('coverify')


var test = require('tape');
var sinon = require('sinon');
var euCookies = require('../index.js').default;

test('Test function exists', function(t) {
  var euCookiesFunction = euCookies;
  t.equal(typeof euCookiesFunction, 'object', 'Expect euCookies to export an object');
  t.end();
});

test('Accepting cookies should trigger expected actions', function(t) {
  var euCookiesFunction = {
    location: 'bottom',
    onCookiesAccepted: sinon.spy(),
  };

  euCookies.init(euCookiesFunction);
  euCookies.acceptCookies();
  t.end();
});
