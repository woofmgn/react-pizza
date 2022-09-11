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

  getBurgerList() {
    return fetch(`${this._url}items/`).then(this._getResponseData);
  }
}

const api = new Api(apiSettings);
export default api;
