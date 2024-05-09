const { InternalServerError } = require('../errors/InternalServerError');

class NewsApi {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  async _fetch(url, next) {
    const fullUrl = `${this._baseUrl}${url}`;
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${this._token}`,
    };

    try {
      const res = await fetch(fullUrl, { headers });
      if (res.ok) {
        return await res.json();
      }
      throw new InternalServerError(`Erro na solicitação: ${res.status}`);
    } catch (error) {
      next(error);
    }
  }

  async getNews(searchQuery, next) {
    try {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      const from = sevenDaysAgo.toISOString().split('T')[0];
      const to = today.toISOString().split('T')[0];

      const queryParams = `q=${searchQuery}&from=${from}&to=${to}&pageSize=100`;

      const url = queryParams;

      return await this._fetch(url, next);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NewsApi;
