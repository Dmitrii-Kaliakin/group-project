import { BASE_URL, GROUP_ID, HEADERS } from "../config";
import { Api } from "./api";

class PostsApi extends Api {
  constructor({ endpoint, headers }) {
    super({ endpoint, headers });
  }

  getAll() {
    return fetch(`${this.endpoint}`, { headers: this.headers }).then(
      this._handleRequest
    );
  }

  searchByQuery(query) {
    return fetch(`${this.endpoint}/search?query=${query}`, {
      headers: this.headers,
    }).then(this._handleRequest);
  }

  getById(id) {
    return fetch(`${this.endpoint}/${id}`, { headers: this.headers }).then(
      this._handleRequest
    );
  }

  getByPage(page, limit) {
    return fetch(`${this.endpoint}/paginate?page=${page}&limit=${limit}`, {
      headers: this.headers,
    }).then(this._handleRequest);
  }

  createOne(post) {
    const options = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(post),
    };

    return fetch(this.endpoint, options).then((data) =>
      this._handleRequest(data)
    );
  }

  updateById(id, post) {
    const options = {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(post),
    };

    return fetch(`${this.endpoint}/${id}`, options).then((data) =>
      this._handleRequest(data)
    );
  }

  deleteById(id) {
    const options = {
      method: "DELETE",
      headers: this.headers,
    };

    return fetch(`${this.endpoint}/${id}`, options).then((data) =>
      this._handleRequest(data)
    );
  }

  addLike(id) {
    const options = {
      method: "PUT",
      headers: this.headers,
    };

    return fetch(`${this.endpoint}/likes/${id}`, options).then((data) =>
      this._handleRequest(data)
    );
  }

  removeLike(id) {
    const options = {
      method: "DELETE",
      headers: this.headers,
    };

    return fetch(`${this.endpoint}/likes/${id}`, options).then((data) =>
      this._handleRequest(data)
    );
  }

  getAllComments() {
    return fetch(`${this.endpoint}/comments`, { headers: this.headers }).then(
      (data) => this._handleRequest(data)
    );
  }

  getCommentById(id) {
    return fetch(`${this.endpoint}/comments/${id}`, {
      headers: this.headers,
    }).then((data) => this._handleRequest(data));
  }

  addComment(id, comment) {
    const options = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(comment),
    };

    return fetch(`${this.endpoint}/comments/${id}`, options).then((data) =>
      this._handleRequest(data)
    );
  }

  removeComment(postId, commentId) {
    const options = {
      method: "POST",
      headers: this.headers,
    };

    return fetch(
      `${this.endpoint}/comments/${postId}/${commentId}`,
      options
    ).then((data) => this._handleRequest(data));
  }
}

export const postApi = new PostsApi({
  endpoint: `${BASE_URL}/v2/${GROUP_ID}/posts`,
  headers: HEADERS,
});
