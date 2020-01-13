import cuid from 'cuid'

export const getRandom = (min?: number, max?: number): string => {
    if (!min && !max) {
        return cuid()
    }
    return String(Math.round(Math.random() * (max - min) + min))
}

export const log = (data, msg = '打印') => {
    console.log(
        `%c ${msg} %c \n`,
        'background-color: #82ae46; color: #fff;padding:3px;box-sizing: border-box;border-radius: 3px;',
        '',
        data
    )
}

export const getPidList = (_arr, _pid) => {
    const arr = _arr.concat()
    let pid = _pid
    const pidList = []
    while (pid) {
        arr.forEach(item => {
            if (item._mid === pid) {
                pidList.push(item._mid)
                pid = item._pid
            }
        })
    }
    return pidList
}
