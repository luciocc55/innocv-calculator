
/**
 * This function removes all unwanted characters from the calculation string
 * @param {string} calculation - a string to parse
 */
export function filterCalculation(calculation: string) {
    return calculation.replace(/[^-+/*.\d]/g, '');
}