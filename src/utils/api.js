class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async _getJSON(res) {
    if (res.ok) return res.json();

    //getting proper error message from JSON response {'message':''}
    const isJSON = res.headers.get('content-type')?.includes('application/json');
    const data = isJSON ? await res.json() : null;
    const error = (data && data.error) || res.status;

    return Promise.reject(error);
  }

  _fetchApi(endpoint, payload, method = 'GET') {
    return payload ?
      fetch(
        `${this.baseUrl}${endpoint}`,
        {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(this._getJSON) :
      fetch(
        `${this.baseUrl}${endpoint}`,
        { method })
        .then(this._getJSON);
  }

  getUserList(page = 1) {
    return this._fetchApi(`/users?page=${page}`)
  }

  getUserById(id) {
    return this._fetchApi(`/users/${id}`);
  }

  postUser({ email, password }) {
    // return this._fetchApi(`/register`, { email, password }, 'POST');

    // hardcodind due to free api service limitation
    const hardContent = {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    }

    return fetch(
      `${this.baseUrl}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hardContent)
      })
      .then(this._getJSON);
  }
}

export default new Api('https://reqres.in/api');
