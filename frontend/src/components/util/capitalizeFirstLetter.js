export function capitalizeFirstLetter(string) {
    if (!string || typeof string !== 'string' || string.length === 0) {
        return ''; // return an empty string if string is undefined, not a string, or empty
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}
