export class Api {

  endpoint;
  headers;

  constructor({ endpoint, headers }) {
    this.endpoint = endpoint;
    this.headers = headers;
  }

  _handleRequest(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then(err => Promise.reject(err));
  }
}