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
        let skillsStr = ''
        if (skills) {
            skillsStr = skills.join(',')
        }
        return this.client.request('GET', `accounts/${this.slug}/highscores`, {
            created_after: createdAfter,
            created_before: createdBefore,
            skills: skillsStr,
        }, {})
    }

    getLatestHighScore(createdAfter, createdBefore, skills) {
        let skillsStr = ''
        if (skills) {
            skillsStr = skills.join(',')
        }
        return this.client.request('GET', `accounts/${this.slug}/highscores/latest`, {
            created_after: createdAfter,
            created_before: createdBefore,
            skills: skillsStr,
        }, {})
    }

    getHighScore(id) {
        return this.client.request('GET', `accounts/${this.slug}/highscores/${id}`, {}, {})
    }

    createHighScore(skills) {
        return this.client.request('POST', `accounts/${this.slug}/highscores`, {}, {
            skills: skills,
        })
    }
}

module.exports = HighScores