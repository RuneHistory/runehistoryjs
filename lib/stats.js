Client = require('./client')

class Stats {
    /**
     * @param client {Client}
     */
    constructor(client) {
        this.client = client
    }

    count_accounts() {
        return this.client.request('GET', 'stats/accounts/count', {}, {})
    }

    count_highscores() {
        return this.client.request('GET', 'stats/highscores/count', {}, {})
    }
}

module.exports = Stats