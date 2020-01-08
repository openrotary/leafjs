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
