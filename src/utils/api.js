import { apiSettings } from "./utils";

class Api {
  constructor(url) {
    this._url = url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getBurgerList(category) {
    return fetch(`${this._url}items/${category}`).then(this._getResponseData);
  }

  getSortList(category) {
    return fetch(`${this._url}items?sortBy=${category}`);
  }
}

const api = new Api(apiSettings);
export default api;
