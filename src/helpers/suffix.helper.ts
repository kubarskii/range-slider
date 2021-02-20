export const removeSuffix = (value, suffix) => {
    const position = value.indexOf(suffix, value.length - suffix.length);
    if (position !== -1) {
        const start = value.substring(0, position);
        value = start + value.substring(start.length + suffix.length - 1, value.length - 1);
    }
    return value;
}
