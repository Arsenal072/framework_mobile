/*货币格式化*/
export const formatMoney = (number = 0, places = 2, symbol = '￥', thousand = ',', decimal = '.') => {
    let negative, i, j

    negative = number < 0 ? '-' : ''
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
    j = (j = i.length) > 3 ? j % 3 : 0
    return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}

/*时间戳*/
export const formatDate = (value, format) => {
    if (value) {
        let date = new Date(value)
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let secondes = date.getSeconds();

        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        hour = hour < 10 ? '0' + hour : hour
        minute = minute < 10 ? '0' + minute : minute
        secondes = secondes < 10 ? '0' + secondes : secondes
        if (format == 'YYYY-MM-DD') {
            return `${year}-${month}-${day}`
        }

        return `${year}-${month}-${day}  ${hour}:${minute}:${secondes}`
    }
}
