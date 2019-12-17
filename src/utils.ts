import cuid from 'cuid'

export const getRandom = (min?: number, max?: number): string => {
    if (!min && !max) {
        return cuid()
    }
    return String(Math.round(Math.random() * (max - min) + min))
}
