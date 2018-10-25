const formatter = {
    methods: {
        getTimestampFormatted (oDate) {
            var sDay = oDate.getDate()
            var iMonthIndex = oDate.getMonth()
            var sYear = oDate.getFullYear()

            return sDay + '.' + (iMonthIndex + 1) + '.' + sYear
        }
    }
}

export default formatter
