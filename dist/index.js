'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fancyFetch = fancyFetch;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function fancyFetch(options) {
  var url = options.url;
  var success = options.success;
  var error = options.error;
  var method = options.method;
  var body = options.body;

  var rest = _objectWithoutProperties(options, ['url', 'success', 'error', 'method', 'body']);

  var upperMethod = method && method.toUpperCase() || 'GET';
  var opts = _extends({}, rest, { method: upperMethod });
  if (opts.body) opts.body = JSON.stringify(opts.body);

  (0, _isomorphicFetch2.default)(url, opts).then(function (response) {
    if (response.status >= 400) {
      var err = new Error('Could not ' + (options.method || 'get') + ' ' + url + ': ' + response.statusText);
      err.response = response;
      throw err;
    } else {
      return response.json();
    }
  }).then(function (json) {
    return success(json);
  }).catch(function (err) {
    throw err;
    if (err.response) {
      err.response.json().then(function (json) {
        return error(json);
      });
    } else {
      // TODO: This isn't always true - need to figure out a better way to handle catch
      // when an error is occuring in the success callback
      error({ networkFailure: true });
    }
  });
}