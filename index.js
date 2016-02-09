import fetch from 'isomorphic-fetch';

export default function fancyFetch(options) {
  const { url, success, error, method, body, ...rest } = options;

  const upperMethod = method && method.toUpperCase() || 'GET'
  let opts = { ...rest, method: upperMethod };
  if (opts.body) opts.body = JSON.stringify(opts.body);

  fetch(url, opts)
  .then(response => {
    if (response.status >= 400) {
      let err = new Error(`Could not ${options.method || 'get'} ${url}: ${response.statusText}`);
      err.response = response;
      throw err;
    } else {
      return response.json();
    }
  })
  .then(json => success(json))
  .catch(err => {
    throw err;
    if (err.response) {
      err.response.json().then(json => error(json))
    } else {
      // TODO: This isn't always true - need to figure out a better way to handle catch
      // when an error is occuring in the success callback
      error({ networkFailure: true })
    }
  })
}
