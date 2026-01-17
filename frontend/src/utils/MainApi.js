 export class MainApi {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }
  
  _fetch(url, options, token = this._token) {
    const fullUrl = `${this._baseUrl}${url}`;
    const headers = {
      "content-type": "application/json",
      authorization: `Bearer ${token || this._token}`,
    };

    const mergedOptions = { headers, ...options };
    return fetch(fullUrl, mergedOptions)
      .then((res) => {
        if (res.ok) {
          console.log(res.json())
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(`Falha na solicitação com status ${err.status}`);
      });
  }

  getUsers(token) {
    return this._fetch("/users/me", { method: "GET" }, token);
  }

  getNewsCard(token) {
    return this._fetch("/news", { method: "GET" }, token);
  }

  createNewsCards(data, token) {
    return this._fetch("/news", {
      method: "POST",
      body: JSON.stringify(data),
    }, token);
  }
  deleteNews(id, token) {
    return this._fetch(`/news/${id}`, { method: "DELETE" }, token);
  }
  
};

export default new MainApi({
  baseUrl: import.meta.env.VITE_BASE_URL_MAIN_API,
  token: localStorage.getItem('jwt'),
});
