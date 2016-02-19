import fetch from 'isomorphic-fetch';

export default function fancyFetch(options) {
  const { url, success, error, method, body, ...rest } = options;

  const upperMethod = method && method.toUpperCase() || 'GET'
  let opts = { ...rest, method: upperMethod };
  if (body) opts.body = JSON.stringify(body);

  fetch(url, opts)
  .then(response => {
    if (response.status >= 400) {
      console.error(new Error(`Could not ${method || 'get'} ${url}: ${response.statusText}`));
      response.json().then(json => error && error(json))
    } else if (response.status === 204 ) {
      success && success();
    } else {
      response.json().then(json => success && success(json));
    }
  })
  .catch(err => {
    error && error({ networkFailure: true })
  })
}
