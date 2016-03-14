'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = fancyFetch;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _queryString = require('query-string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function fancyFetch(options) {
  var url = options.url;
  var success = options.success;
  var error = options.error;
  var method = options.method;
  var body = options.body;
  var query = options.query;

  var rest = _objectWithoutProperties(options, ['url', 'success', 'error', 'method', 'body', 'query']);

  var upperMethod = method && method.toUpperCase() || 'GET';

  var urlToUse = query ? url + (0, _queryString.stringify)(query) : url;

  var opts = _extends({}, rest, { method: upperMethod });
  if (body) opts.body = JSON.stringify(body);

  (0, _isomorphicFetch2.default)(urlToUse, opts).then(function (response) {
    if (response.status >= 400) {
      console.error(new Error('Could not ' + (method || 'get') + ' ' + url + ': ' + response.statusText));
      response.json().then(function (json) {
        return error && error(json);
      });
    } else if (response.status === 204) {
      success && success();
    } else {
      response.json().then(function (json) {
        return success && success(json);
      });
    }
  }).catch(function (err) {
    error && error({ networkFailure: true });
  });
}