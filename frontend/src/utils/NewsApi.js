export class NewsApi {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }
    
    async _fetch(url, options) {
      console.log(url)
      const fullUrl = `${this._baseUrl}${url}`;
      console.log(fullUrl)
     
      const headers = {
        "Content-Type": "application/json",
      };
  
      const mergedOptions = { headers, ...options };
      return fetch(fullUrl, mergedOptions)
        .then((res) => {
          if (res.ok) {
            console.log('chegou aqui a news:', res.json())
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
    baseUrl: import.meta.env.VITE_BASE_URL_MAIN_API,
  });
  
 
  