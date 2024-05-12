class NewsClientApi {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  async _fetch(url) {
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
      throw new Error(`Error: ${res.status}`);
    } catch (err) {
      console.error(`Falha na solicitação: ${err.message}`);
      throw err;
    }
  }

  async getNews(searchQuery) {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const from = sevenDaysAgo.toISOString().split('T')[0];
    const to = today.toISOString().split('T')[0];

    const queryParams = `q=${searchQuery}&from=${from}&to=${to}&pageSize=100`;

    const url = queryParams;

    return this._fetch(url);
  }
}

const newsApiClient = new NewsClientApi({
  baseUrl: 'https://newsapi.org/v2/everything?',
  token: process.env.TOKEN_API,
});

module.exports = newsApiClient;
