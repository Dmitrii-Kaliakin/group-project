import { Api } from './api';
import { BASE_URL, HEADERS } from '../config';

class UserApi extends Api {
  constructor({ endpoint, headers }) {
    super({ endpoint, headers });
  }

  getCurrentUserInfo() {
    return fetch(`${this.endpoint}/me`, { headers: this.headers }).then(this._handleRequest);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this.endpoint}/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, about })
    })
      .then(this._handleRequest);
  }
}

export const userApi = new UserApi({
  endpoint: `${BASE_URL}/users`,
  headers: HEADERS,
});