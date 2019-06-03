const moment = require('moment');

module.exports = {
    set(res, token) {
        res.cookie('authorization', token, {
            httpOnly: true,
            signed: true,
            expires: oneWeekLater()
        })
    },

    clear(res) {
        res.clearCookie('authorization')
    }
};

function oneWeekLater() {
    return moment().add(1, 'week').toDate();
}
