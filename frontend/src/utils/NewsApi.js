export class NewsApi {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }
    
    async _fetch(url, options) {
      const fullUrl = `${this._baseUrl}${url}`;
     
      const headers = {
        "Content-Type": "application/json",
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
  
    getSearchNews(keyword) {
        return this._fetch(`/news/search?keyword=${keyword}`, { method: "GET" });
      }
  }

  export default new NewsApi({
    baseUrl: process.env.REACT_APP_BASE_URL_MAIN_API,
  });
  
 
  