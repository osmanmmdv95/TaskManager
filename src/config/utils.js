export const getInitials = (name = '') => name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const removeFromLocalStorage = (key) => {
    return localStorage.removeItem(key)
}

export const getLastId = (data) => {
    return data[data.length - 1].id + 1
}

export const isNumber = (number) => {
    return number.replace(/[^0-9]/g, "");
}