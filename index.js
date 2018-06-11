const Client = require('./lib/client')

Date.prototype.getUTCTime = function(){
    return new Date(
        this.getUTCFullYear(),
        this.getUTCMonth(),
        this.getUTCDate(),
        this.getUTCHours(),
        this.getUTCMinutes(),
        this.getUTCSeconds()
    ).getTime() / 1000;
}

module.exports = Client