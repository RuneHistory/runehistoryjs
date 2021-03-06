Client = require('./client')
HighScores = require('./highscores')

class Accounts {
    /**
     * @param client {Client}
     */
    constructor(client) {
        this.client = client
    }

    getAccounts(runsUnchangedMin, runsUnchangedMax, lastRanBefore, prioritise = true) {
        return this.client.request('GET', 'accounts', {
            runs_unchanged_min: runsUnchangedMin,
            runs_unchanged_max: runsUnchangedMax,
            last_ran_before: lastRanBefore,
            prioritise: prioritise,
        }, {})
    }

    getAccount(slug) {
        return this.client.request('GET', `accounts/${slug}`, {}, {})
    }

    createAccount(nickname) {
        return this.client.request('POST', 'accounts', {}, {
            nickname: nickname
        })
    }

    updateAccount(slug, nickname) {
        return this.client.request('PUT', `accounts/${slug}`, {}, {
            nickname: nickname
        })
    }

    highScores(slug) {
        return new HighScores(this.client, slug)
    }
}

module.exports = Accounts