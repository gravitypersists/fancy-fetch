import fetch from 'isomorphic-fetch';
import { stringify } from 'query-string';

export default function fancyFetch(options) {
  const { url, success, error, method, body, query, ...rest } = options;

  const upperMethod = method && method.toUpperCase() || 'GET'

  const urlToUse = query ? url + stringify(query) : url;

  let opts = { ...rest, method: upperMethod };
  if (body) opts.body = JSON.stringify(body);

  fetch(urlToUse, opts)
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
