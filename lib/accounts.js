Client = require('./client')

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
}

module.exports = Accounts