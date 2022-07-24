class ApiAuth {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }
    
    _handleResponseOfServer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }
    
    setHeaders(headers) {
        this._headers = {
            ...this._headers,
            ...headers
        };
    }

    loginUser(data) {
        return fetch(`${this._url}/signin`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify(data),
        }).then(this._handleResponseOfServer);
    }
    
    registerUser(data) {
        return fetch(`${this._url}/signup`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify(data),
        }).then(this._handleResponseOfServer);
      }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
          method: "GET",
          headers: this._headers,
        }).then(this._handleResponseOfServer);
      }
}

const token = localStorage.getItem('token');

export const apiAuth = new ApiAuth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : token? `Bearer ${token}` : ''
    }
});