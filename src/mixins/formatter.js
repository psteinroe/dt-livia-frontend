const formatter = {
    methods: {
        getTimestampFormatted (note) {
            const oDate = note.timestamp.toDate()
            const aMonthNames = [
                'January', 'February', 'March',
                'April', 'May', 'June', 'July',
                'August', 'September', 'October',
                'November', 'December'
            ]

            var sDay = oDate.getDate()
            var iMonthIndex = oDate.getMonth()
            var sYear = oDate.getFullYear()

            return sDay + ' ' + aMonthNames[iMonthIndex] + ' ' + sYear
        }
    }
}

export default formatter
