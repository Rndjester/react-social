

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Максимум ${maxLength} символов`
    return null
}


export const required = value => {
    if (value) return null
    return 'Обязательное поле'
}
