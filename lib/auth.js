const jwt = require('jsonwebtoken')

class Auth {
    constructor(client, username, password = null) {
        this.client = client
        this.username = username
        this.password = password
        this.jwt = null
        this._token = null
    }

    validateJwt() {
        if (!this.jwt) {
            return false
        }
        const now = Math.floor(Date.now() / 1000)
        if ('nbf' in this.jwt && now < this.jwt.nbf) {
            return false
        }
        if ('exp' in this.jwt && now >= this.jwt.exp) {
            return false
        }
        return true
    }

    token() {
        if (!this.validateJwt()) {
            return this.refresh()
        }
        return Promise.resolve(this._token)
    }

    refresh() {
        return this.client.request(
            'GET',
            'auth/token',
            {},
            {},
            'basic'
        ).then(data => {
            this._token = data.token
            this.jwt = jwt.decode(data.token)
            return this._token
        })
    }

    apply(auth_type, options) {
        if (auth_type === 'basic') {
            options.auth = {
                username: this.username,
                password: this.password,
            }
            return Promise.resolve(options)
        }
        if (auth_type === 'jwt') {
            return this.token().then(token => {
                options.headers['Authorization'] = `Bearer ${token}`
                return options;
            })
        }
    }
}

module.exports = Auth