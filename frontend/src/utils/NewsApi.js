export class NewsApi {
    constructor({ baseUrl, tokenApi }) {
      this._baseUrl = baseUrl;
      this.tokenApi = tokenApi;
    }
    
  
    _fetch(url, options) {
      const fullUrl = `${this._baseUrl}${url}`;
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.tokenApi}`,
      };
  
      const mergedOptions = { headers, ...options };
      return fetch(fullUrl, mergedOptions)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(`Error: ${res.status}`);
          }
        })
        .catch((err) => {
          console.log(`Falha na solicitação com status ${err.status}`);
        });
    }
  
    getNews(searchQuery) {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      const from = sevenDaysAgo.toISOString().split('T')[0];
      const to = today.toISOString().split('T')[0];
  
      const url = `q=${searchQuery}&from=${from}&to=${to}&pageSize=100`;
      
      return this._fetch(url, {method: "GET"});
    }  
  
  }
  
  export default new NewsApi({
    baseUrl: process.env.REACT_APP_BASE_URL_API,
    tokenApi: process.env.REACT_APP_TOKEN_API,
  });
  