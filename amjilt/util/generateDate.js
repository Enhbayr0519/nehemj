exports.generateDate = (date) => {
    if (date) {

        return new Date(date).toLocaleDateString(
            'mn', {
            timeZone: 'Asia/Ulaanbaatar'
        }
        )
    }

    return new Date().toLocaleDateString(
        'mn', {
        timeZone: 'Asia/Ulaanbaatar'
    }
    )
};
exports.generateHour = (date) => {
    if (date) {
        return new Date(date).toLocaleTimeString(
            'mn', {
            timeZone: 'Asia/Ulaanbaatar'
        }
        )
    }

    return new Date().toLocaleTimeString(
        'mn', {
        timeZone: 'Asia/Ulaanbaatar'
    }
    )
};