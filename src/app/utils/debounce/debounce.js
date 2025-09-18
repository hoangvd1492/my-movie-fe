export const debounce = (func, delay) => {
    let timeoutId = null
    return (...args) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
};

