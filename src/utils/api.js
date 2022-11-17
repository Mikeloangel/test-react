class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async _fetchApi(endpoint) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, { method: 'get' });
    if (res.ok) {
      return res.json();
    }

    //getting proper error message from JSON response {'message':''}
    const isJSON = res.headers.get('content-type')?.includes('application/json');
    const data = isJSON ? await res.json() : null;
    const error = (data && data.message) || res.status;
    return await Promise.reject(error);
  }

  getUserList(page = 1) {
    return this._fetchApi(`/users?page=${page}`)
  }

  getUserById(id) {
    return this._fetchApi(`/users/${id}`);
  }
}

export default new Api('https://reqres.in/api');
