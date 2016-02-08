# fancy-fetch

## Usage

```
  import fetch from 'fancy-fetch'

  fetch({
    url: 'http://server.com/api/endpoint/or/something',
    method: 'put',
    body: {
      keys: values
    },
    success: function() {},
    error: function() {}
  })
```

The only thing special about this helper is that it provides a `success` and `error` callback. All other options are passed along to isomorphic-fetch, which is another wrapper around github's polyfill for whatwg spec of fetch.
