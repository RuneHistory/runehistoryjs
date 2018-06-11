Client = require('./client')

class HighScores {
    /**
     * @param client {Client}
     */
    constructor(client, slug) {
        this.client = client
        this.slug = slug
    }

    getHighScores(createdAfter, createdBefore, skills) {
        return this.client.request('GET', `accounts/${this.slug}/highscores`, {
            created_after: createdAfter,
            created_before: createdBefore,
            skills: skills,
        }, {})
    }
}

module.exports = HighScores