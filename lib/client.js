const axios = require('axios')
const Auth = require('./auth')
const Accounts = require('./accounts')
const Stats = require('./stats')

class Client {
    constructor(username, password, secret, host = 'https://api.runehistory.com', version = 1) {
        this.host = host
        this.version = version
        this.auth = new Auth(this, username, password, secret)
    }

    hostname() {
        return `${this.host}/v${this.version}`
    }

    request(method, url, params, data, auth = 'jwt') {
        const endpoint = `${this.hostname()}/${url}`
        const options = {
            url: endpoint,
            method: method,
            params: params,
            data: data,
            headers: {}
        }
        return this.auth.apply(auth, options).then(options => {
            return axios.request(options)
        }).then(response => {
            return response.data
        })
    }

    accounts() {
        return new Accounts(this)
    }

    stats() {
        return new Stats(this)
    }
}

module.exports = Client